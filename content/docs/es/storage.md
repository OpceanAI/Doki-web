---
title: Almacenamiento
description: 5 drivers de almacenamiento, capas, volúmenes, cuotas
category: Referencia
---

# Almacenamiento

Doki soporta 5 drivers de almacenamiento, auto-detectados por `DetectBestDriver()`. El driver elegido depende de tu kernel, sistema de archivos y si tienes root.

## Comparación de Drivers

| Driver | Caso de uso | Requiere root | Rendimiento | Estado |
|:-------|:------------|:--------------|:------------|:-------|
| `overlay2` | Servidores Linux con overlay del kernel | Sí | Mejor (kernel nativo) | Probado |
| `fuse-overlayfs` | Rootless, Termux, Android | No | ~90% de overlay2 | Probado |
| `btrfs` | Sistemas con raíz btrfs | No | Mejor (con snapshots) | No probado |
| `zfs` | Sistemas con pools ZFS | No | Mejor (con snapshots) | No probado |
| `vfs` | Fallback, pruebas | No | Más lento | Probado |

## Auto-detección

```go
// pkg/storage/driver.go
func DetectBestDriver(root string) string {
    if canUseOverlay2() {
        return DriverOverlay2
    }
    if isBtrfs(root) {
        return "btrfs"
    }
    if _, err := exec.LookPath("zfs"); err == nil {
        return "zfs"
    }
    return "fuse-overlayfs"
}
```

## Almacén Content-Addressable

Todas las capas se almacenan por hash SHA256 en un almacén content-addressable:

```
~/.doki/
  data/
    layers/sha256:.../
    merged/
    diff/
    work/
    images/
    containers/<id>/
      state.json
      rootfs/
      logs/
    volumes/
```

Las capas descargadas se deduplican automáticamente.

## Extracción de Capas

Cuando se ejecuta `doki pull alpine`:

1. **Obtener manifiesto** — `pkg/registry` llama a `GET /v2/alpine/manifests/latest`
2. **Analizar configuración** — extraer lista de capas y configuración de imagen
3. **Descargar capas en paralelo** — 4 descargas concurrentes
4. **Verificar checksums** — SHA256 cada blob después de descargar
5. **Almacenar en CAS** — cada capa va a `data/layers/sha256:<digest>/`
6. **Extraer bajo demanda** — las capas se apilan en `data/containers/<id>/rootfs/`

La extracción es nativa en Go (sin necesidad de `tar`):
- Detecta compresión: gzip, bzip2, xz, zstd
- Protección path traversal
- Validación de symlinks
- Restricciones de hardlinks
- Manejo de whiteout
- Extracción paralela con rollback en error

## Detalles de Drivers

### overlay2

El driver más rápido. Usa la llamada al sistema `overlayfs` del kernel Linux.

### fuse-overlayfs

La alternativa rootless. Overlay en espacio de usuario mediante FUSE.

### btrfs

Usa subvolúmenes y snapshots de Btrfs.

### zfs

Usa datasets y snapshots de ZFS.

### vfs

Copia simple de directorio. Sin overlay, sin snapshots.

## Volúmenes

Los volúmenes con nombre se almacenan separados del rootfs del contenedor.

### Drivers de Volumen

| Driver | Respaldo |
|:-------|:---------|
| `local` | Directorio local en `data/volumes/<name>/` |
| `tmpfs` | Respaldo en RAM (solo Linux) |
| `nfs` | Montaje NFS |

## Caché de Imágenes

Doki almacena en caché las imágenes descargadas en el almacén content-addressable:

```bash
# Mostrar uso de disco
$ doki system df
# Purgar no utilizadas
$ doki image prune -a
$ doki system prune -a --volumes
```

## Caché de Build

`doki build` usa un caché de capas claveado por instrucciones Dokifile.

## Cuotas

Cuotas de disco por contenedor con el sistema de archivos adecuado:

```bash
doki run -d --storage-opt size=10G my-image:latest
```

## Respaldo y Migración

```bash
# Exportar imagen
doki save -o myapp.tar myapp:1.0
doki load -i myapp.tar

# Exportar sistema de archivos del contenedor
doki export web > web.tar
doki import web.tar
```

## Fuente

- `pkg/storage/driver.go` — entrada principal, detección de driver
- `pkg/storage/drivers.go` — implementaciones btrfs, zfs, vfs
- `pkg/storage/overlay.go` — overlay2
- `pkg/storage/fuse.go` — fuse-overlayfs
- `pkg/storage/layer.go` — extracción de capas, CAS
- `pkg/storage/volume.go` — gestión de volúmenes
- `pkg/storage/cache.go` — caché de imágenes y build
