# Changelog

## v0.11.1 (2026-06-15)

### New binaries
- `doki-kube` — Kubernetes-in-Doki launcher
- `doki-kubectl` — bundled kubectl for `doki-kube`

### Platform expansion
- 5 supported platforms: linux/amd64, linux/arm64, darwin/amd64, darwin/arm64, android/arm64
- 30+ release binaries
- Native darwin VZ backend on Apple Silicon

### Security
- mTLS enforcement with constant-time comparison
- Updated seccomp profile for modern kernels (io_uring, landlock, pidfd)
- GitHub Security Advisories disclosure process

### Bug fixes
- iptables DNAT construction (edge cases)
- veth teardown on container removal
- Termux `LD_PRELOAD` stripping
- proot `execve` fallback on Android

### Deprecations
- v0.10.x config format still accepted with deprecation warning; will be removed in v0.12.0.

## v0.10.0 (2026-04-01)

- FUSE overlayfs support (Linux)
- Apple Virtualization (VZ) backend (macOS)
- `doki init` command for project scaffolding
- Proot v5.4.0 bundled binary
- Improved bridge networking with DNS forwarding
- Alpine-based slim images

## v0.9.2 (2026-02-10)

- First Termux-compatible release
- Proot-based isolation on Android
- 12 isolation levels from WASM to microVM
- Bridge networking with iptables DNAT
- Port mapping and veth management
- 108 CLI commands across 8 categories
- DNS server (port 8053 on Android)
- Logging: file, journald, local drivers
