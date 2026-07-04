---
title: Configuración
description: Esquema de configuración, variables de entorno, valores predeterminados
category: Referencia
---

# Configuración

Doki se configura mediante un archivo JSON en `~/.doki/config.json` y variables de entorno. El demonio (`dokid`) lee la configuración al iniciar; la CLI (`doki`) la lee al establecer la conexión.

## Ubicación del Archivo de Configuración

| Plataforma | Ruta predeterminada |
|:-----------|:--------------------|
| Linux | `~/.doki/config.json` |
| macOS | `~/.doki/config.json` |
| Termux (Android) | `$PREFIX/etc/doki/config.json` o `~/.doki/config.json` |

Sobrescribe con el flag `--config RUTA` o la variable de entorno `DOKI_CONFIG`.

## Esquema Completo

```json
{
  "root": "/home/user/.doki/data",
  "socket_path": "/var/run/doki.sock",
  "pidfile": "/var/run/dokid.pid",
  "storage_driver": "fuse-overlayfs",
  "default_network": "bridge",
  "default_runtime": "auto",
  "rootless": true,
  "debug": false,
  "log_level": "info",
  "log_format": "auto",
  "log_driver": "json-file",
  "log_opts": {
    "max-size": "10m",
    "max-file": "3"
  },
  "dns": ["8.8.8.8", "8.8.4.4"],
  "dns_listen": "127.0.0.11:53",
  "dns_search": [],
  "dns_opts": ["ndots:0"],
  "registry_mirrors": [],
  "insecure_registries": [],
  "experimental": false,
  "rate_limit": {
    "rps": 100,
    "burst": 200
  },
  "tls": {
    "cert": "/etc/doki/cert.pem",
    "key": "/etc/doki/key.pem",
    "client_ca": "/etc/doki/ca.pem",
    "verify": true
  },
  "network": {
    "bridge": "doki0",
    "default_subnet": "10.0.0.0/24",
    "mtu": 1500,
    "ipv6": false
  },
  "cgroup": {
    "version": "v2",
    "memory_limit": "0",
    "cpu_shares": 1024
  },
  "seccomp": {
    "profile": "default",
    "allow": [],
    "deny": []
  },
  "image": {
    "pull_policy": "missing",
    "default_platform": "auto"
  }
}
```

## Variables de Entorno

Todos los campos de configuración pueden ser sobrescritos por variables de entorno. Convención de nomenclatura: `DOKI_<MAYUSCULAS_SUBRAYADO>`.

| Var de entorno | Campo de configuración | Ejemplo |
|:---------------|:-----------------------|:--------|
| `DOKI_HOST` | (socket del demonio) | `unix:///var/run/doki.sock` |
| `DOKI_CONFIG` | (ruta del archivo config) | `/etc/doki/config.json` |
| `DOKI_DATA_DIR` | `root` | `/var/lib/doki` |
| `DOKI_STORAGE_DRIVER` | `storage_driver` | `overlay2` |
| `DOKI_ROOTLESS` | `rootless` | `1` |
| `DOKI_DEBUG` | `debug` | `1` |
| `DOKI_LOG_LEVEL` | `log_level` | `debug`, `info`, `warn`, `error` |
| `DOKI_DNS` | `dns` | `8.8.8.8,1.1.1.1` |
| `DOKI_DNS_LISTEN` | `dns_listen` | `127.0.0.11:8053` |
| `DOKI_TLS` | habilita TLS | `1` |
| `DOKI_TLS_CERT` | `tls.cert` | `/etc/doki/cert.pem` |
| `DOKI_TLS_KEY` | `tls.key` | `/etc/doki/key.pem` |

## Valores Predeterminados por Plataforma

| Campo | Linux | Termux | macOS |
|:------|:------|:-------|:------|
| `root` | `~/.doki/data` | `$PREFIX/var/lib/doki` | `~/.doki/data` |
| `socket_path` | `/var/run/doki.sock` | `$PREFIX/var/run/doki.sock` | `~/.doki/doki.sock` |
| `storage_driver` | `overlay2` | `fuse-overlayfs` | `vfs` |
| `dns_listen` | `127.0.0.11:53` | `127.0.0.11:8053` | (ninguno) |
| `default_runtime` | `namespaces` | `proot` | `native` |

## Migrar desde Docker

| Docker | Doki |
|:-------|:-----|
| `DOCKER_HOST` | `DOKI_HOST` |
| `DOCKER_CONFIG` | `DOKI_CONFIG` |
| `DOCKER_TLS_VERIFY` | `DOKI_TLS_VERIFY` |
| `DOCKER_CERT_PATH` | directorio `DOKI_TLS_CA` |

`doki` recurre a las variables de entorno de Docker si las de Doki no están configuradas.

## Fuente

- `pkg/common/config.go` — esquema + cargador
- `pkg/common/defaults.go` — valores predeterminados por plataforma
- `cmd/dokid/main.go` — mapeo de vars de entorno a configuración
