---
title: Referencia CLI
description: Los 108 comandos en 8 categorías
category: Referencia
---

# Referencia CLI

Doki v0.11.1 incluye **108 comandos** en 8 categorías. Esta página es la referencia canónica; [Inicio Rápido](Quick-Start) recorre los más comunes.

## Flags Globales

| Flag | Descripción |
|:-----|:------------|
| `--host string` | Socket del demonio |
| `--config string` | Ruta a `config.json` |
| `-D, --debug` | Habilita logging de depuración |
| `--tls` | Usa TLS para conectar al demonio |
| `--tlscert string` | Ruta al certificado TLS |
| `--tlskey string` | Ruta a la clave TLS |
| `--tlsverify` | Verifica el cert TLS remoto |
| `-H, --human` | Salida legible para humanos |
| `--format string` | Formato de salida: `text` o `json` |
| `--quiet` | Suprime salida no esencial |

## Gestión de Contenedores (17 comandos)

### `doki run [OPTIONS] IMAGEN [COMMAND] [ARG...]`

Crea e inicia un contenedor. ~80 flags:

| Flag | Descripción |
|:-----|:------------|
| `--name string` | Nombre del contenedor |
| `-d, --detach` | Ejecutar en segundo plano |
| `-it` | TTY interactivo |
| `--rm` | Eliminar contenedor al salir |
| `-e, --env list` | Variables de entorno |
| `--env-file list` | Leer vars de entorno de archivos |
| `-p, --publish list` | Mapeo de puertos |
| `-P, --publish-all` | Publicar todos los puertos EXPOSE |
| `-v, --volume list` | Montaje bind |
| `--mount mount` | Especificación de montaje |
| `-w, --workdir string` | Directorio de trabajo |
| `-u, --user string` | Usuario |
| `--entrypoint string` | Sobrescribir entrypoint |
| `--network network` | Red a conectar |
| `--hostname string` | Hostname del contenedor |
| `--restart string` | Política de reinicio |
| `--runtime string` | Modo de aislamiento |
| `--memory string` | Límite de memoria |
| `--cpus string` | Límite de CPU |
| `--read-only` | Montar rootfs como solo lectura |
| `--cap-add list` | Agregar capacidades Linux |
| `--cap-drop list` | Eliminar capacidades Linux |
| `--security-opt list` | Opciones de seguridad |
| `--platform string` | Forzar plataforma |

### `doki ps [OPTIONS]`

Listar contenedores.

### `doki logs [OPTIONS] CONTENEDOR`

Obtener logs del contenedor.

### `doki exec [OPTIONS] CONTENEDOR COMMAND [ARG...]`

Ejecutar comando en contenedor en ejecución.

### `doki inspect [OPTIONS] NOMBRE|ID`

Información JSON detallada.

### `doki stats [OPTIONS] [CONTENEDOR...]`

Estadísticas de uso de recursos en vivo.

## Gestión de Imágenes (8 comandos)

`doki pull`, `doki push`, `doki images`, `doki rmi`, `doki tag`, `doki login`, `doki logout`, `doki search`.

## Gestión de Redes (7 comandos)

`doki network ls`, `create`, `rm`, `inspect`, `connect`, `disconnect`, `prune`.

## Gestión de Volúmenes (4 comandos)

`doki volume ls`, `create`, `rm`, `inspect`.

## Sistema (8 comandos)

`doki info`, `version`, `system df`, `system prune`, `system events`, `ping`, `container prune`, `image prune`.

## Compatibilidad Podman (15 comandos)

`doki pod create`, `pod ls`, `pod rm`, `pod start`, `pod stop`, `pod inspect`, `pod ps`, `generate kube`, `play kube`, `auto-update`, `unshare`, `untag`, `mount`, `unmount`, `healthcheck`.

## Kubernetes (4 comandos)

`doki kube play`, `kube down`, `kube generate`, `apply -f`.

## Compose (`doki-compose`, ~30 subcomandos)

`doki-compose up`, `down`, `ps`, `logs`, `exec`, `run`, `start/stop/restart`, `pull`, `build`, `config`, `ls`, `scale`, `top`, `pause/unpause`, `kill`, `rm`, `port`, `images`, `version`.

## Formatos de Salida

La mayoría de comandos `ls`/`ps`/`images`/`volume` soportan `--format` con una plantilla Go:

```bash
doki ps --format '{{.ID}}: {{.Image}} -> {{.Status}}'
doki ps --format json
```

## Códigos de Salida

| Código | Significado |
|:------:|:-----------|
| 0 | Éxito |
| 1 | Error general |
| 125 | Error del demonio |
| 126 | Comando del contenedor no ejecutable |
| 127 | Comando del contenedor no encontrado |
| 130 | Contenedor recibió SIGINT |
| 137 | Contenedor recibió SIGKILL |
| 143 | Contenedor recibió SIGTERM |

## Fuente

- CLI: `cmd/doki/main.go` (cobra)
- Comandos: `cmd/doki/*.go`
- Flags compartidos: `pkg/cli/flags.go`
- API del demonio: `pkg/api/*.go`
