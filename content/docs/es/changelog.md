# Registro de Cambios

## v0.11.1 (2026-06-15)

### Nuevos binarios
- `doki-kube` — lanzador de Kubernetes en Doki
- `doki-kubectl` — kubectl incluido para `doki-kube`

### Expansión de plataformas
- 5 plataformas soportadas: linux/amd64, linux/arm64, darwin/amd64, darwin/arm64, android/arm64
- 30+ binarios de lanzamiento
- Backend nativo darwin VZ en Apple Silicon

### Seguridad
- Aplicación de mTLS con comparación en tiempo constante
- Perfil seccomp actualizado para kernels modernos (io_uring, landlock, pidfd)
- Proceso de divulgación de GitHub Security Advisories

### Correcciones de errores
- Construcción DNAT de iptables (casos extremos)
- Eliminación de veth al remover contenedores
- Eliminación de `LD_PRELOAD` en Termux
- Fallback de `execve` de proot en Android

### Deprecaciones
- El formato de configuración v0.10.x aún se acepta con advertencia; se eliminará en v0.12.0.

## v0.10.0 (2026-04-01)

- Soporte FUSE overlayfs (Linux)
- Backend Apple Virtualization (VZ) (macOS)
- Comando `doki init` para scaffolding de proyectos
- Binario incluido Proot v5.4.0
- Red bridge mejorada con reenvío DNS
- Imágenes slim basadas en Alpine

## v0.9.2 (2026-02-10)

- Primer lanzamiento compatible con Termux
- Aislamiento basado en Proot en Android
- 12 niveles de aislamiento desde WASM hasta microVM
- Red bridge con iptables DNAT
- Mapeo de puertos y gestión veth
- 108 comandos CLI en 8 categorías
- Servidor DNS (puerto 8053 en Android)
- Logging: drivers file, journald, local
