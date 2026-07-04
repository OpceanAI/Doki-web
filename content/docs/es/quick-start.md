---
title: Inicio Rápido
description: Tutorial de 5 minutos: instalar, demonio, pull, ejecutar, compose
category: Primeros Pasos
---

# Inicio Rápido

Este tutorial toma ~5 minutos y te guía a través de: instalar → iniciar demonio → descargar imagen → ejecutar contenedor → logs → pila compose → limpiar.

## 0. Prerrequisitos

- Doki instalado (ver [Instalación](Installation))
- ~100 MB de espacio libre en disco para la primera imagen

## 1. Verificar la Instalación

```bash
$ doki version
Client: Doki
 Version:    0.11.1
 API version: 1.54
 GitCommit:  1a2b3c4
 Built:      2026-06-25
```

Si ves el banner de versión, estás listo. Si `dokid` también está instalado, el mismo comando muestra información del demonio.

## 2. Iniciar el Demonio

El demonio `dokid` escucha en un socket Unix y expone la API Docker Engine v1.54 + API Podman v5.

### Primer plano (ver logs)

```bash
$ dokid
INFO  daemon starting  root=/home/user/.doki  socket=/var/run/doki.sock
INFO  storage driver: fuse-overlayfs
INFO  dns server: 127.0.0.11:53
INFO  daemon ready
```

### Segundo plano (producción / CI)

```bash
$ dokid > /tmp/dokid.log 2>&1 &
$ echo $! > /tmp/dokid.pid
```

### Con compatibilidad Docker CLI

```bash
$ export DOCKER_HOST=unix:///var/run/doki.sock
$ docker ps
CONTAINER ID    IMAGE    COMMAND    CREATED    STATUS    PORTS    NAMES
```

La CLI y SDKs de Docker funcionan contra Doki sin modificación.

## 3. Descargar una Imagen

```bash
$ doki pull alpine
INFO  resolving alpine:latest for linux/arm64
INFO  downloading layer sha256:abcd... 4.0 MB / 4.0 MB [====] 1.2s
INFO  downloaded 3 layers, total 4.0 MB
INFO  pulled alpine:latest
```

Por defecto, Doki resuelve automáticamente el manifiesto para tu arquitectura. Para descargar para otra arquitectura:

```bash
$ doki pull --platform linux/amd64 alpine
```

## 4. Listar Imágenes

```bash
$ doki images
REPOSITORY    TAG       IMAGE ID       CREATED        SIZE
alpine        latest    sha256:abc...  2 minutes ago  4.0 MB
```

## 5. Ejecutar un Contenedor

El clásico hello-world:

```bash
$ doki run --rm alpine echo "Hello from Doki"
Hello from Doki
```

Ejecuta un shell interactivo:

```bash
$ doki run -it --rm alpine sh
/ # ls
bin    dev    etc    home   lib    media  mnt    opt    proc   root   run    sbin   srv    sys    tmp    usr    var
/ # exit
```

Ejecuta un contenedor de larga duración en segundo plano:

```bash
$ doki run -d --name webserver -p 8080:80 nginx:alpine
abc123def456
$ doki ps
CONTAINER ID    IMAGE           COMMAND                 CREATED         STATUS         PORTS                  NAMES
abc123def456    nginx:alpine    "/docker-entrypoint..." 5 seconds ago   Up 4 seconds   0.0.0.0:8080->80/tcp   webserver
```

Pruébalo:

```bash
$ curl -s http://localhost:8080 | head -5
<!DOCTYPE html>
<html>
<head>
<title>Welcome to nginx!</title>
...
```

## 6. Ver Logs

```bash
$ doki logs webserver
/docker-entrypoint.sh: /docker-entrypoint.d/20-envsubst-on-templates.sh: No such file or directory
/docker-entrypoint.sh: Launching /docker-entrypoint.d/30-tune-worker-processes.sh
...
```

Sigue los logs (como `tail -f`):

```bash
$ doki logs -f webserver
```

## 7. Detener y Eliminar

```bash
$ doki stop webserver
webserver

$ doki rm webserver
webserver

$ doki ps -a
CONTAINER ID    IMAGE    COMMAND    CREATED    STATUS    PORTS    NAMES
```

## 8. Múltiples Contenedores con Compose

Crea `doki-compose.yml` (o `docker-compose.yml` — mismo formato):

```yaml
name: quickstart

services:
  web:
    image: nginx:alpine
    ports: ["8080:80"]
    depends_on:
      api:
        condition: service_started

  api:
    image: python:3-alpine
    command: python -m http.server 8000
    expose: ["8000"]
```

Inícialo:

```bash
$ doki-compose up -d
[+] Running 2/2
 ✔ Container quickstart-api-1  Started
 ✔ Container quickstart-web-1  Started
```

Verifica el estado:

```bash
$ doki-compose ps
NAME                    COMMAND                  SERVICE    STATUS    PORTS
quickstart-api-1        "python -m http.serv..."  api        running   8000/tcp
quickstart-web-1        "/docker-entrypoint..."   web        running   0.0.0.0:8080->80/tcp
```

Deténlo:

```bash
$ doki-compose down
[+] Running 2/2
 ✔ Container quickstart-web-1  Removed
 ✔ Container quickstart-api-1  Removed
 ✔ Network quickstart_default   Removed
```

## 9. Inspeccionar un Contenedor

```bash
$ doki inspect webserver | jq '.[0].State'
{
  "Status": "running",
  "Running": true,
  "Paused": false,
  "Restarting": false,
  "OOMKilled": false,
  "Dead": false,
  "Pid": 12345,
  "ExitCode": 0,
  "StartedAt": "2026-06-04T20:00:00Z",
  "FinishedAt": "0001-01-01T00:00:00Z"
}
```

## 10. Limpiar

```bash
$ doki system prune -a
INFO  removing 3 stopped containers
INFO  removing 2 unused images
INFO  total reclaimed: 145.3 MB
```

## ¿Qué Acaba de Pasar?

Has recorrido el ciclo de vida completo de Doki:

| Paso | Subsistema | Código fuente |
|:-----|:-----------|:--------------|
| Pull | `pkg/registry` + `pkg/image` | Cliente OCI Distribution Spec v2 |
| Run | `pkg/runtime` + `pkg/storage` | Ejecutor OCI Runtime Spec |
| Mapa de puertos | `pkg/network` | Bridge + iptables DNAT |
| Logs | `pkg/runtime` | Flujo multiplexado sobre HTTP |
| Compose | `pkg/compose` | Motor Compose spec |
| Inspect | `pkg/api` | Docker Engine API v1.48 |

Continúa a [Arquitectura](Architecture) para entender cada subsistema en profundidad.

## Errores Comunes

| Problema | Solución |
|:---------|:---------|
| `doki: command not found` | Agrega `$PREFIX/bin` (Termux) o `/usr/local/bin` (Linux) a `$PATH` |
| `dokid: cannot connect to socket` | Ejecuta `dokid &` primero |
| `permission denied` en `/var/run/doki.sock` | Agrega tu usuario al grupo `docker`, o configura `DOKI_HOST` a una ruta que poseas |
| El contenedor sale inmediatamente | Revisa `doki logs <name>`; usualmente falta un `CMD` o entrypoint incorrecto |
| Pull es lento | Agrega un mirror de registro en `config.json` |
| `port 53: permission denied` (Android) | Esperado — Doki usa 8053 en Android, no se requiere acción |

## Próximos Pasos

- [Instalación](Installation) — instalación por plataforma
- [Arquitectura](Architecture) — cómo funciona Doki internamente
- [Niveles de Aislamiento](Isolation-Levels) — elige el runtime adecuado para tu carga de trabajo
- [Referencia CLI](CLI-Reference) — los 108 comandos
- [Configuración](Configuration) — `config.json` y variables de entorno
