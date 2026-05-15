#!/bin/sh
set -e

PREFIX="${PREFIX:-/data/data/com.termux/files/usr}"
ARCH="$(uname -m)"
VERSION="v0.9.1"
BASE="https://github.com/OpceanAI/Doki/releases/download/${VERSION}"

echo "Installing Doki ${VERSION} for ${ARCH}..."

case "$ARCH" in
  aarch64|arm64)
    curl -L "${BASE}/doki-android-arm64"           -o "${PREFIX}/bin/doki"
    curl -L "${BASE}/dokid-android-arm64"          -o "${PREFIX}/bin/dokid"
    curl -L "${BASE}/doki-compose-android-arm64"   -o "${PREFIX}/bin/doki-compose"
    curl -L "${BASE}/doki-init-rust-android-arm64" -o "${PREFIX}/bin/doki-init"
    curl -L "${BASE}/doki-proot-android-arm64"     -o "${PREFIX}/bin/doki-proot"
    curl -L "${BASE}/proot-android-arm64"          -o "${PREFIX}/bin/proot"
    ;;
  armv7l|armv8l)
    curl -L "${BASE}/doki-linux-armv7"           -o "${PREFIX}/bin/doki"
    curl -L "${BASE}/dokid-linux-armv7"          -o "${PREFIX}/bin/dokid"
    curl -L "${BASE}/doki-compose-linux-armv7"   -o "${PREFIX}/bin/doki-compose"
    curl -L "${BASE}/doki-init-linux-armv7"      -o "${PREFIX}/bin/doki-init"
    curl -L "${BASE}/doki-proot-android-armv7"   -o "${PREFIX}/bin/doki-proot"
    curl -L "${BASE}/proot-android-armv7"        -o "${PREFIX}/bin/proot"
    ;;
  *)
    echo "Unsupported architecture: $ARCH"
    exit 1
    ;;
esac

chmod +x "${PREFIX}/bin/doki"*
chmod +x "${PREFIX}/bin/proot"

echo "Doki ${VERSION} installed successfully."
echo "Run: dokid &"
echo "Then: doki ping"
