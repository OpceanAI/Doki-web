---
title: Instalación
description: Instala Doki en Termux, Linux, macOS y más
category: Primeros Pasos
---

# Instalación

Doki viene como 4 binarios (`doki`, `dokid`, `doki-compose`, `doki-init`) para 4 combinaciones de plataforma/arquitectura. Elige tu plataforma a continuación.

## Instalación Rápida (Linux/macOS/Android via Termux)

```bash
curl -sL https://dok1.xyz | sh
```

Esto descarga el binario correcto para tu plataforma en `~/.local/bin/`. Agrégalo a tu `$PATH` si no lo está.

## Termux (Android)

Termux es el entorno Android compatible principal. Doki funciona sin root en Termux, no se requiere root.

### Desde F-Droid (recomendado)

1. Instala [Termux desde F-Droid](https://f-droid.org/packages/com.termux/) (NO Google Play — la versión de Play está desactualizada)
2. Abre Termux y ejecuta:

```bash
pkg update && pkg upgrade
pkg install proot curl
curl -sL https://dok1.xyz | sh
```

### Desde GitHub Releases

```bash
pkg install proot curl
mkdir -p $PREFIX/bin
curl -L -o $PREFIX/bin/doki https://github.com/OpceanAI/Doki/releases/latest/download/doki-android-arm64
curl -L -o $PREFIX/bin/dokid https://github.com/OpceanAI/Doki/releases/latest/download/dokid-android-arm64
curl -L -o $PREFIX/bin/doki-compose https://github.com/OpceanAI/Doki/releases/latest/download/doki-compose-android-arm64
curl -L -o $PREFIX/bin/doki-init https://github.com/OpceanAI/Doki/releases/latest/download/doki-init-android-arm64
chmod +x $PREFIX/bin/doki*
```

### Verificación

```bash
$ doki version
Client: Doki
 Version:    0.11.1
 API version: 1.54
 GitCommit:  907ae45
 Built:      2026-06-04

$ doki run --rm alpine echo "hello from doki"
hello from doki
```

### Notas específicas de Termux

- `LD_PRELOAD` y `LD_LIBRARY_PATH` se eliminan del entorno de proot automáticamente
- DNS escucha en `127.0.0.11:8053` (el puerto 53 está bloqueado por SELinux sin root)
- El runtime predeterminado es proot; sobrescribe con `doki run --runtime native`
- Driver de almacenamiento: `fuse-overlayfs` (no necesita root)

## Linux

### Debian / Ubuntu

```bash
sudo apt update
sudo apt install -y curl fuse-overlayfs iptables
curl -L -o /tmp/doki.tar.gz https://github.com/OpceanAI/Doki/releases/latest/download/doki-linux-arm64.tar.gz
sudo tar -xzf /tmp/doki.tar.gz -C /usr/local/bin/
```

### Fedora / RHEL / Rocky

```bash
sudo dnf install -y curl fuse-overlayfs iptables
curl -L -o /tmp/doki.tar.gz https://github.com/OpceanAI/Doki/releases/latest/download/doki-linux-arm64.tar.gz
sudo tar -xzf /tmp/doki.tar.gz -C /usr/local/bin/
```

### Arch / Manjaro

```bash
sudo pacman -Syu curl fuse-overlayfs iptables
curl -L -o /tmp/doki.tar.gz https://github.com/OpceanAI/Doki/releases/latest/download/doki-linux-arm64.tar.gz
sudo tar -xzf /tmp/doki.tar.gz -C /usr/local/bin/
```

### Alpine

```bash
sudo apk add curl fuse-overlayfs iptables
curl -L -o /tmp/doki.tar.gz https://github.com/OpceanAI/Doki/releases/latest/download/doki-linux-arm64.tar.gz
sudo tar -xzf /tmp/doki.tar.gz -C /usr/local/bin/
```

### Gentoo

```bash
sudo emerge -av sys-fs/fuse-overlayfs net-firewall/iptables net-misc/curl
curl -L -o /tmp/doki.tar.gz https://github.com/OpceanAI/Doki/releases/latest/download/doki-linux-arm64.tar.gz
sudo tar -xzf /tmp/doki.tar.gz -C /usr/local/bin/
```

### Notas específicas de Linux

- El modo root requiere `iptables` y `kmod` (para `modprobe overlay`)
- El modo rootless usa `fuse-overlayfs` (instálalo desde tu gestor de paquetes) y `pasta` (descarga desde [passt](https://passt.top/) o usa el binario incluido de Doki)
- El binario `doki-init` es el PID 1 para invitados microVM; no lo necesitas para contenedores normales
- Para dispositivos ARMv7 (ARM de 32 bits), usa los binarios `linux-armv7`

## macOS

Doki incluye un binario CLI `doki` para macOS Apple Silicon (arm64). El demonio y otros binarios son solo Linux porque dependen de `internal/namespaces` y montajes overlayfs que no existen en Darwin.

### Homebrew (planeado)

Una fórmula Homebrew está en desarrollo. Por ahora, instala manualmente.

### Instalación manual

```bash
curl -L -o /usr/local/bin/doki https://github.com/OpceanAI/Doki/releases/latest/download/doki-darwin-arm64
chmod +x /usr/local/bin/doki
```

### Notas específicas de macOS

- La CLI se ejecuta solo en `ModeNative` — sin aislamiento, sin red bridge
- Para usar el demonio, ejecuta `dokid` en un servidor Linux y apunta tu `doki` local a él mediante `DOKI_HOST=tcp://server:2375`
- macOS no es un objetivo de compilación para `dokid`/`doki-compose`/`doki-init` — esos fallarán al compilar con darwin GOOS

## Windows / WSL2

Windows nativo no es compatible. Usa WSL2 con las instrucciones de instalación de Ubuntu anteriores.

```powershell
wsl --install
wsl --set-default-version 2
# Luego sigue los pasos de instalación Debian/Ubuntu dentro de WSL
```

## Chromebook (Contenedor Linux ChromeOS)

El contenedor Linux (Beta) de ChromeOS es esencialmente una VM Debian. La CLI de Doki se ejecuta dentro; para escenarios de contenedor dentro de contenedor usa el runtime `proot`.

```bash
sudo apt update
sudo apt install -y curl fuse-overlayfs proot
curl -L -o /tmp/doki.tar.gz https://github.com/OpceanAI/Doki/releases/latest/download/doki-linux-arm64.tar.gz
sudo tar -xzf /tmp/doki.tar.gz -C /usr/local/bin/
```

Para aislamiento pKVM en Chromebooks con el firmware adecuado, Doki lo detectará y usará automáticamente (nivel 11 en la página [Niveles de Aislamiento](Isolation-Levels)).

## Raspberry Pi / Placas ARM

Usa el binario `linux-armv7` (Raspbian 32 bits) o `linux-arm64` (Raspberry Pi OS 64 bits, Ubuntu ARM64).

```bash
# Detecta tu arquitectura
uname -m
# aarch64 -> arm64, armv7l -> armv7

# Para Pi OS 64 bits
curl -L -o /usr/local/bin/doki https://github.com/OpceanAI/Doki/releases/latest/download/doki-linux-arm64
chmod +x /usr/local/bin/doki

# Para Raspbian 32 bits
curl -L -o /usr/local/bin/doki https://github.com/OpceanAI/Doki/releases/latest/download/doki-linux-armv7
chmod +x /usr/local/bin/doki
```

Habilita cgroups v2 en `/boot/firmware/cmdline.txt` agregando:

```
cgroup_memory=1 cgroup_enable=memory
```

Luego reinicia.

## postmarketOS / PinePhone / Librem

Distribuciones Linux móviles basadas en Alpine o Arch. Usa los pasos de instalación de Alpine o Arch. Proot es el runtime predeterminado.

## Compilar desde Fuente

Consulta [Compilar desde fuente](#compilar-desde-fuente) abajo o la sección [Building](../README.md#building) del README.

## Verificar Descargas

Cada binario tiene un archivo `.sha256`:

```bash
$ curl -L -O https://github.com/OpceanAI/Doki/releases/latest/download/doki-linux-arm64.sha256
$ sha256sum -c doki-linux-arm64.sha256
doki-linux-arm64: OK
```

## Solución de Problemas

| Síntoma | Solución |
|:--------|:---------|
| `command not found: doki` | Agrega `$PREFIX/bin` (Termux) o `/usr/local/bin` (Linux) a `$PATH` |
| `execve: Function not implemented` (Termux) | Actualiza a la última versión |
| `port 53: permission denied` (Termux) | Esto es esperado; Doki usa el puerto 8053 por defecto en Android |
| `iptables: Unknown option` | Actualiza a la última versión; el bug de DNAT fue corregido |
| `cannot find proot` | `apt install proot` (Debian/Ubuntu) o `pkg install proot` (Termux) |

## Próximos Pasos

- Continúa a [Inicio Rápido](Quick-Start) para un tutorial de 5 minutos
- Lee [Arquitectura](Architecture) para entender el demonio
- Elige el [Nivel de Aislamiento](Isolation-Levels) adecuado para tu carga de trabajo
