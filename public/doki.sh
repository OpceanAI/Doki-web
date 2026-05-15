#!/bin/sh
set -eu

VERSION="v0.9.1"
PREFIX="${DOKI_PREFIX:-/data/data/com.termux/files/usr}"
BIN_DIR="${PREFIX}/bin"

step() {
  printf '==> %s\n' "$1"
}

warn() {
  printf 'WARNING: %s\n' "$1" >&2
}

download_file() {
  url="$1"
  output="$2"

  if command -v curl >/dev/null 2>&1; then
    curl -fsSL "$url" -o "$output"
    return
  fi

  if command -v wget >/dev/null 2>&1; then
    wget -q -O "$output" "$url"
    return
  fi

  echo "curl or wget is required to install Doki." >&2
  exit 1
}

require_command() {
  if ! command -v "$1" >/dev/null 2>&1; then
    echo "$1 is required to install Doki." >&2
    exit 1
  fi
}

case "$(uname -m)" in
  aarch64 | arm64)
    arch="android-arm64"
    platform_label="Android/Termux (ARM64)"
    ;;
  armv7l | armv8l)
    arch="linux-armv7"
    platform_label="Android/Termux (ARMv7)"
    ;;
  *)
    echo "Unsupported architecture: $(uname -m)" >&2
    exit 1
    ;;
esac

BASE="https://github.com/OpceanAI/Doki/releases/download/${VERSION}"

step "Installing Doki CLI"
step "Detected platform: ${platform_label}"
step "Version: ${VERSION}"
step "Prefix: ${PREFIX}"

require_command mkdir

mkdir -p "${BIN_DIR}"

download_file "${BASE}/doki-${arch}"           "${BIN_DIR}/doki"
download_file "${BASE}/dokid-${arch}"          "${BIN_DIR}/dokid"
download_file "${BASE}/doki-compose-${arch}"   "${BIN_DIR}/doki-compose"
download_file "${BASE}/doki-init-${arch}"      "${BIN_DIR}/doki-init"
download_file "${BASE}/doki-proot-${arch}"     "${BIN_DIR}/doki-proot"
download_file "${BASE}/proot-${arch}"          "${BIN_DIR}/proot"

chmod 0755 "${BIN_DIR}/doki"
chmod 0755 "${BIN_DIR}/dokid"
chmod 0755 "${BIN_DIR}/doki-compose"
chmod 0755 "${BIN_DIR}/doki-init"
chmod 0755 "${BIN_DIR}/doki-proot"
chmod 0755 "${BIN_DIR}/proot"

printf 'Doki %s installed successfully.\n' "${VERSION}"
step "Start the daemon: dokid &"
step "Verify: doki ping"
