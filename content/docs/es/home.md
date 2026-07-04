---
title: Visión General
description: Bienvenido a la documentación de Doki
category: Primeros Pasos
---

# Wiki de Doki

Bienvenido a la documentación de Doki (Motor de Contenedores Universal). Este wiki es el acompañante detallado del [README](../../README.md) — comienza allí para una descripción general, luego ven aquí para los detalles.

> **Idioma**: Este wiki está disponible en inglés (`Page.md`) y español (`Page.es.md`). Si una versión en español no existe para una página, por favor abre un issue.

## Última Versión

**v0.11.1** (Junio 2026) — Emulación Multi-Arquitectura, UX Termux, Refactorización Runner

- [Notas de versión](https://github.com/OpceanAI/Doki/releases/tag/v0.11.1)
- [Descargar binarios](https://github.com/OpceanAI/Doki/releases/latest)

## Tabla de Contenidos

### Primeros Pasos

| Página | Qué cubre |
|:-------|:----------|
| [Instalación](Installation) | Instalación por plataforma: Termux, Linux (apt/dnf/pacman/portage), macOS, Android NDK, WSL2, Chromebook, Raspberry Pi, postmarketOS |
| [Inicio Rápido](Quick-Start) | Tutorial de 5 minutos: instalar → demonio → pull → ejecutar → compose → logs → limpiar |

### Conceptos

| Página | Qué cubre |
|:-------|:----------|
| [Arquitectura](Architecture) | Internos del demonio, pipeline, cumplimiento OCI, cliente de registro, caché de capas de imagen |
| [Niveles de Aislamiento](Isolation-Levels) | Cobertura detallada de los 12 modos: WASM, pKVM, microVM, sysbox, namespaces, gVisor, FEX, QEMU, proot, legacy32, chroot, nativo |
| [Seguridad](Security) | Perfil Seccomp, AppArmor, capacidades, namespaces de usuario, TLS, modelo de amenazas |

### Referencia

| Página | Qué cubre |
|:-------|:----------|
| [Referencia CLI](CLI-Reference) | Los 108 comandos con tablas de flags, ejemplos, muestras de salida |
| [Configuración](Configuration) | Esquema de `config.json`, variables de entorno, rutas de socket por SO, DNS, registros, niveles de log |
| [Redes](Networking) | Bridge, plugins CNI, mapeo de puertos, DNS, iptables (DNAT/SNAT), rootless (pasta), IPv6 |
| [Almacenamiento](Storage) | 5 drivers, VFS, requisitos de kernel overlay2, btrfs/zfs, FUSE rootless, almacén content-addressable |

## Estructura del Repositorio

El wiki refleja el árbol de fuentes en `pkg/`, `internal/` y `cmd/`. Si quieres entender el código, lee [Arquitectura](Architecture) primero, luego profundiza en paquetes específicos.

## Contribuir al Wiki

El código fuente del wiki está almacenado en `.wiki/` en la raíz del repositorio. Para agregar una página:

1. Crea `Tu-Pagina.md` en `.wiki/`
2. Opcionalmente agrega `Tu-Pagina.es.md` para la versión en español
3. Agrega un enlace desde la tabla de contenidos de [Home.md](Home)
4. Haz commit + push a `main`
5. El flujo de trabajo CI `.github/workflows/wiki-sync.yml` sube la página a GitHub Wiki, GitLab Wiki branch y Codeberg Wiki

Las páginas del wiki usan [Markdown GitHub Flavored](https://github.github.com/gfm/) con anclas en kebab-case (`#niveles-de-aislamiento`). Los bloques de código deben estar etiquetados (` ```bash `, ` ```yaml `, ` ```dockerfile `). Tablas para contenido comparativo; bloques [Mermaid](https://mermaid.js.org/) para diagramas (renderizados nativamente en GitHub, GitLab y Codeberg).

## Espejos

Este wiki está sincronizado a tres forjas. Todas las ediciones deben ir a GitHub (`OpceanAI/Doki`), que es la fuente de verdad:

- **GitHub**: [OpceanAI/Doki/wiki](https://github.com/OpceanAI/Doki/wiki) (principal)
- **GitLab**: [aguitauwu/doki/-/wikis](https://gitlab.com/aguitauwu/doki/-/wikis/home) (espejo, rama `wiki`)
- **Codeberg**: [aguitauwu/Doki/wiki](https://codeberg.org/aguitauwu/Doki/wiki) (espejo, repositorio separado)

Si encuentras una divergencia entre los espejos, abre un issue en GitHub.
