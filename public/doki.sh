#!/usr/bin/env bash
set -Eeuo pipefail

# Doki v0.11.0 Interactive Installer
# https://github.com/OpceanAI/Doki
# https://dok1.xyz

VERSION="v0.11.0"
PREFIX="${DOKI_PREFIX:-/data/data/com.termux/files/usr}"
BINDIR="${PREFIX}/bin"
BASE_URL="${DOKI_BASE_URL:-https://github.com/OpceanAI/Doki/releases/download/${VERSION}}"
DATA_DIR="${PREFIX}/var/lib/doki"

AUTO_YES=0
UNINSTALL=0
NO_COLOR_FLAG=0

setup_colors() {
    if [ -n "${NO_COLOR:-}" ] || [ "${TERM:-}" = "dumb" ] || ! [ -t 1 ]; then
        BOLD="" RESET="" RED="" GREEN="" YELLOW="" BLUE="" CYAN="" MAGENTA="" WHITE="" DIM=""
    else
        BOLD='\033[1m'    RESET='\033[0m'
        RED='\033[31m'    GREEN='\033[32m'
        YELLOW='\033[33m' BLUE='\033[34m'
        CYAN='\033[36m'   MAGENTA='\033[35m'
        WHITE='\033[37m'  DIM='\033[2m'
    fi
}

step()    { printf "${CYAN}==>${RESET} %s\n" "$1"; }
info()    { printf "${BLUE} *${RESET} %s\n" "$1"; }
warn()    { printf "${YELLOW}WARNING:${RESET} %s\n" "$1" >&2; }
error()   { printf "${RED}ERROR:${RESET} %s\n" "$1" >&2; }
success() { printf "${GREEN}OK${RESET} %s\n" "$1"; }

confirm_yes() {
    local prompt="$1"
    if [ "$AUTO_YES" -eq 1 ]; then
        info "${prompt} [Y/n] Y (auto)"
        return 0
    fi
    local reply
    read -rp "$(printf "${BOLD}%s [Y/n]: ${RESET}" "$prompt")" reply
    [ -z "$reply" ] || [[ "$reply" =~ ^[Yy]([Ee][Ss])?$ ]]
}

confirm_no() {
    local prompt="$1"
    if [ "$AUTO_YES" -eq 1 ]; then
        info "${prompt} [y/N] N (auto)"
        return 1
    fi
    local reply
    read -rp "$(printf "${BOLD}%s [y/N]: ${RESET}" "$prompt")" reply
    [[ "$reply" =~ ^[Yy]([Ee][Ss])?$ ]]
}

download_file() {
    local url="$1" output="$2"
    if command -v curl >/dev/null 2>&1; then
        curl -L --retry 3 --retry-delay 5 -# -o "$output" "$url"
    elif command -v wget >/dev/null 2>&1; then
        wget -q --show-progress -O "$output" "$url"
    else
        error "curl or wget is required to install Doki."
        exit 1
    fi
}

require_command() {
    if ! command -v "$1" >/dev/null 2>&1; then
        error "$1 is required but not found."
        exit 1
    fi
}

WORK_DIR=""
cleanup() {
    local exit_code=$?
    if [ -n "$WORK_DIR" ] && [ -d "$WORK_DIR" ]; then
        rm -rf "$WORK_DIR"
    fi
    exit "$exit_code"
}
trap cleanup EXIT INT TERM

show_awa() {
    printf "\n${YELLOW}"
    cat << 'AWA'
:::.  .::    .   .::::::.              ...     .        :    .,-:::::/
  ;;`;; ';;,  ;;  ;;;' ;;`;;          .;;;;;;;.  ;;,.    ;;; ,;;-'````'
 ,[[ '[[,'[[, [[, [[' ,[[ '[[,       ,[[     \[[,[[[[, ,[[[[,[[[   [[[[[[/
c$$$cc$$$c Y$c$$$c$P c$$$cc$$$c cccc $$$,     $$$$$$$$$$$"$$$"$$c.    "$$
 888   888, "88"888   888   888,     "888,_ _,88P888 Y88" 888o`Y8bo,,,o88o
 YMM   ""`   "M "M"   YMM   ""`        "YMMMMMP" MMM  M'  "MMM  `'YMUP"YMM
AWA
    printf "${RESET}\n"

    printf "${MAGENTA}"
    cat << 'CAT'
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⡷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⡿⠋⠈⠻⣮⣳⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣾⡿⠋⠀⠀⠀⠀⠙⣿⣿⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⣿⡿⠟⠛⠉⠀⠀⠀⠀⠀⠀⠀⠈⠛⠛⠿⠿⣿⣷⣶⣤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣾⡿⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠻⠿⣿⣶⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣀⣠⣤⣤⣀⡀⠀⠀⣀⣴⣿⡿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠿⣿⣷⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⣄⠀⠀
⢀⣤⣾⡿⠟⠛⠛⢿⣿⣶⣾⣿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠿⣿⣷⣦⣀⣀⣤⣶⣿⡿⠿⢿⣿⡀⠀
⣿⣿⠏⠀⢰⡆⠀⠀⠉⢿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⢿⡿⠟⠋⠁⠀⠀⢸⣿⠇⠀
⣿⡟⠀⣀⠈⣀⡀⠒⠃⠀⠙⣿⡆⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠇⠀
⣿⡇⠀⠛⢠⡋⢙⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀
⣿⣧⠀⠀⠀⠓⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠛⠋⠀⠀⢸⣧⣤⣤⣶⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⡿⠀⠀
⣿⣿⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠻⣷⣶⣶⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⠁⠀⠀
⠈⠛⠻⠿⢿⣿⣷⣶⣦⣤⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⡏⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠉⠙⠛⠻⠿⢿⣿⣷⣶⣦⣤⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠿⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⡄⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠛⠻⠿⢿⣿⣷⣶⣦⣤⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⡄⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠛⠿⠿⣿⣷⣶⣶⣤⣤⣀⡀⠀⠀⠀⢀⣴⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡿⣄
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠛⠿⠿⣿⣷⣶⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣹
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⠀⠀⠀⠀⠀⠀⢸⣧
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣆⠀⠀⠀⠀⠀⠀⢀⣀⣠⣤⣶⣾⣿⣿⣿⣿⣤⣄⣀⡀⠀⠀⠀⣿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⢿⣻⣷⣶⣾⣿⣿⡿⢯⣛⣛⡋⠁⠀⠀⠉⠙⠛⠛⠿⣿⣿⡷⣶⣿
CAT
    printf "${RESET}\n"
}

usage() {
    cat << EOF
Doki ${VERSION} Installer

Usage: curl -sL dok1.xyz | bash
   or: doki.sh [OPTIONS]

Options:
  -y, --yes         Non-interactive mode (accept all defaults)
  --uninstall       Remove Doki binaries and optionally data
  --prefix=PATH     Override install prefix (default: ${PREFIX})
  --no-color        Disable colored output
  --help            Show this help message
  --awa             Show credits

Environment:
  DOKI_PREFIX       Override install prefix
  DOKI_BASE_URL     Override download base URL

Website: https://dok1.xyz
EOF
}

for arg in "$@"; do
    case "$arg" in
        -y|--yes)       AUTO_YES=1 ;;
        --uninstall)    UNINSTALL=1 ;;
        --no-color)     NO_COLOR_FLAG=1 ;;
        --prefix=*)     PREFIX="${arg#*=}"; BINDIR="${PREFIX}/bin" ;;
        --help)         setup_colors; usage; exit 0 ;;
        --awa)          setup_colors; show_awa; exit 0 ;;
        *)              setup_colors; error "Unknown option: $arg"; usage; exit 1 ;;
    esac
done

if [ "$NO_COLOR_FLAG" -eq 1 ]; then
    NO_COLOR=1
fi

setup_colors

show_awa

printf "\n${BOLD}${WHITE}  Doki -- The Universal Container Engine${RESET}\n"
printf "  ${DIM}https://github.com/OpceanAI/Doki${RESET}\n"
printf "  ${DIM}https://dok1.xyz${RESET}\n\n"

#  Uninstall Mode
if [ "$UNINSTALL" -eq 1 ]; then
    step "Uninstalling Doki ${VERSION}..."

    for bin in doki dokid doki-compose doki-init; do
        if [ -f "${BINDIR}/${bin}" ]; then
            rm -f "${BINDIR}/${bin}"
            info "  Removed ${BINDIR}/${bin}"
        fi
    done

    if confirm_no "Remove data directory ${DATA_DIR}?"; then
        rm -rf "${DATA_DIR}"
        info "  Removed ${DATA_DIR}"
    fi

    if confirm_no "Remove proot (if installed via pkg)?"; then
        if command -v pkg >/dev/null 2>&1; then
            pkg uninstall -y proot 2>/dev/null || true
            info "  proot removed"
        fi
    fi

    success "Doki uninstalled."
    exit 0
fi

#  Platform Detection
step "Detecting platform..."

OS_TYPE=""
ARCH_LABEL=""
PLATFORM_LABEL=""
IS_ANDROID=0
IS_TERMUX=0

case "$(uname -s)" in
    Linux)  OS_TYPE="linux" ;;
    Darwin) OS_TYPE="darwin" ;;
    *)
        error "Unsupported OS: $(uname -s)"
        exit 1
        ;;
esac

case "$(uname -m)" in
    aarch64|arm64)
        if [ "$OS_TYPE" = "darwin" ]; then
            ARCH_LABEL="darwin-arm64"
            PLATFORM_LABEL="macOS (Apple Silicon)"
        else
            ARCH_LABEL="android-arm64"
            PLATFORM_LABEL="Android/Termux (ARM64)"
        fi
        ;;
    armv7*|armv8l)
        ARCH_LABEL="linux-armv7"
        PLATFORM_LABEL="Linux (ARMv7)"
        ;;
    x86_64|amd64)
        if [ "$OS_TYPE" = "darwin" ]; then
            ARCH_LABEL="darwin-arm64"
            PLATFORM_LABEL="macOS (Apple Silicon)"
        else
            ARCH_LABEL="linux-arm64"
            PLATFORM_LABEL="Linux (x86_64)"
        fi
        ;;
    *)
        error "Unsupported architecture: $(uname -m)"
        error "Supported: aarch64, armv7l, x86_64"
        exit 1
        ;;
esac

if [ -d "/data/data/com.termux" ]; then
    IS_ANDROID=1
    IS_TERMUX=1
    PLATFORM_LABEL="Android/Termux"
    # Force android arch for Termux
    case "$(uname -m)" in
        aarch64|arm64) ARCH_LABEL="android-arm64" ;;
        armv7*|armv8l)  ARCH_LABEL="linux-armv7" ;;
    esac
elif [ -f "/system/build.prop" ]; then
    IS_ANDROID=1
fi

ANDROID_VERSION=""
DEVICE_MODEL=""
if [ "$IS_ANDROID" -eq 1 ]; then
    if command -v getprop >/dev/null 2>&1; then
        ANDROID_VERSION=$(getprop ro.build.version.release 2>/dev/null || echo "")
        DEVICE_MODEL=$(getprop ro.product.model 2>/dev/null || echo "")
    fi
fi

PROOT_AVAILABLE=0
PROOT_VERSION=""
if command -v proot >/dev/null 2>&1; then
    PROOT_AVAILABLE=1
    PROOT_VERSION=$(proot --version 2>&1 | head -1 || echo "unknown")
fi

EXISTING_VERSION=""
EXISTING_PATH=""
if command -v doki >/dev/null 2>&1; then
    EXISTING_PATH=$(command -v doki)
    EXISTING_VERSION=$("${EXISTING_PATH}" version 2>/dev/null | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' | head -1 || echo "")
fi

ENV_WARNINGS=0
if [ -n "${LD_PRELOAD:-}" ]; then
    ENV_WARNINGS=1
fi
if [ -n "${LD_LIBRARY_PATH:-}" ]; then
    ENV_WARNINGS=1
fi

PATH_NEEDS_FIX=0
case ":${PATH}:" in
    *":${BINDIR}:"*) ;;
    *) PATH_NEEDS_FIX=1 ;;
esac

#  Show Detected Info
printf "\n"
info "Platform:   ${BOLD}${PLATFORM_LABEL}${RESET}"
info "Arch:       ${ARCH_LABEL}"
if [ -n "$ANDROID_VERSION" ]; then
    info "Android:    ${ANDROID_VERSION}"
fi
if [ -n "$DEVICE_MODEL" ]; then
    info "Device:     ${DEVICE_MODEL}"
fi
info "Kernel:     $(uname -r)"
if [ "$PROOT_AVAILABLE" -eq 1 ]; then
    info "Proot:      ${GREEN}installed${RESET} (${PROOT_VERSION})"
else
    info "Proot:      ${YELLOW}not installed${RESET}"
fi
if [ -n "$EXISTING_VERSION" ]; then
    info "Existing:   ${YELLOW}${EXISTING_VERSION}${RESET} at ${EXISTING_PATH}"
else
    info "Existing:   none"
fi
if [ "$ENV_WARNINGS" -eq 1 ]; then
    printf "\n"
    warn "Environment issues detected:"
    if [ -n "${LD_PRELOAD:-}" ]; then
        warn "  LD_PRELOAD=${LD_PRELOAD}"
        warn "  This may interfere with proot. Unset with: unset LD_PRELOAD"
    fi
    if [ -n "${LD_LIBRARY_PATH:-}" ]; then
        warn "  LD_LIBRARY_PATH=${LD_LIBRARY_PATH}"
    fi
fi
printf "\n"

#  Interactive Prompts
DO_INSTALL_PROOT=0
DO_INSTALL_GO=0
DO_PULL_ALPINE=0
DO_START_DAEMON=0
DO_FIX_PATH=0
DO_UPGRADE=0

if [ -n "$EXISTING_VERSION" ]; then
    if confirm_yes "Upgrade from ${EXISTING_VERSION} to ${VERSION}?"; then
        DO_UPGRADE=1
    else
        info "Keeping existing version."
        exit 0
    fi
fi

if [ "$IS_TERMUX" -eq 1 ] && [ "$PROOT_AVAILABLE" -eq 0 ]; then
    printf "\n"
    info "proot is required for container isolation on Termux."
    info "It provides root-like filesystem access without root."
    if confirm_yes "Install proot via pkg?"; then
        DO_INSTALL_PROOT=1
    fi
fi

if ! command -v go >/dev/null 2>&1; then
    printf "\n"
    info "Go (golang) is useful for building custom tools and plugins."
    if confirm_no "Install Go via pkg?"; then
        DO_INSTALL_GO=1
    fi
fi

printf "\n"
info "alpine:latest is a minimal Linux image (~4MB)."
info "Recommended as a base for testing and development."
if confirm_yes "Pull alpine:latest as base image?"; then
    DO_PULL_ALPINE=1
fi

printf "\n"
info "The dokid daemon provides the Docker-compatible REST API."
info "It runs in the background and listens on a Unix socket."
if confirm_yes "Start dokid daemon now?"; then
    DO_START_DAEMON=1
fi

if [ "$PATH_NEEDS_FIX" -eq 1 ] && [ -n "${HOME:-}" ]; then
    printf "\n"
    warn "${BINDIR} is not in your PATH."
    if confirm_yes "Add ${BINDIR} to PATH in ~/.bashrc?"; then
        DO_FIX_PATH=1
    fi
fi

#  Installation
printf "\n"
step "Installing Doki ${VERSION}..."

WORK_DIR=$(mktemp -d)
info "Working directory: ${WORK_DIR}"

step "Downloading doki-${ARCH_LABEL}..."
DOWNLOAD_FILE="${WORK_DIR}/doki-${ARCH_LABEL}"
download_file "${BASE_URL}/doki-${ARCH_LABEL}" "$DOWNLOAD_FILE"

if [ ! -f "$DOWNLOAD_FILE" ]; then
    error "Download failed. Check your internet connection."
    exit 1
fi

step "Verifying download..."
file_type=$(file -b "$DOWNLOAD_FILE")
if echo "$file_type" | grep -q "gzip compressed"; then
    step "Extracting..."
    tar -xzf "$DOWNLOAD_FILE" -C "$WORK_DIR" --strip-components=1
    BINARY_DIR="$WORK_DIR"
elif echo "$file_type" | grep -q "ELF\|executable"; then
    step "Binary downloaded..."
    BINARY_DIR=""
    cp "$DOWNLOAD_FILE" "${WORK_DIR}/doki"
    chmod +x "${WORK_DIR}/doki"
else
    error "Unknown file format: $file_type"
    exit 1
fi

step "Installing binaries to ${BINDIR}..."
mkdir -p "${BINDIR}"

INSTALLED_BINS=()
SEARCH_DIR="${BINARY_DIR:-$WORK_DIR}"

for bin in doki dokid doki-compose doki-init doki-kube doki-kubectl; do
    if [ -f "${SEARCH_DIR}/${bin}" ]; then
        install -m 0755 "${SEARCH_DIR}/${bin}" "${BINDIR}/${bin}"
        INSTALLED_BINS+=("$bin")
        info "  ${bin}"
    fi
done

if [ ${#INSTALLED_BINS[@]} -eq 0 ]; then
    error "No binaries found in archive. Download may be corrupted."
    exit 1
fi

step "Verifying installation..."
if "${BINDIR}/doki" version >/dev/null 2>&1; then
    INSTALLED_VER=$("${BINDIR}/doki" version 2>/dev/null | head -1 || echo "unknown")
    success "doki ${INSTALLED_VER}"
else
    warn "Could not verify doki version"
fi

#  Post-Install: proot
if [ "$DO_INSTALL_PROOT" -eq 1 ]; then
    printf "\n"
    step "Installing proot..."
    if command -v pkg >/dev/null 2>&1; then
        pkg install -y proot
        success "proot installed"
    elif command -v apt >/dev/null 2>&1; then
        apt install -y proot
        success "proot installed"
    else
        warn "Could not find pkg or apt. Install proot manually."
    fi
fi

#  Post-Install: Go
if [ "$DO_INSTALL_GO" -eq 1 ]; then
    printf "\n"
    step "Installing Go..."
    if command -v pkg >/dev/null 2>&1; then
        pkg install -y golang

        # Set up GOPATH
        GOPATH_LINE='export GOPATH="$HOME/go"'
        PATH_LINE='export PATH="$PATH:$GOPATH/bin"'
        if ! grep -qF "GOPATH" "$HOME/.bashrc" 2>/dev/null; then
            printf "\n# Go environment\n%s\n%s\n" "$GOPATH_LINE" "$PATH_LINE" >> "$HOME/.bashrc"
            info "Added GOPATH to ~/.bashrc"
        fi

        export GOPATH="${HOME}/go"
        export PATH="${PATH}:${GOPATH}/bin"
        success "Go installed: $(go version 2>/dev/null || echo 'restart shell')"
    else
        warn "pkg not found. Install Go manually."
    fi
fi

#  Post-Install: Pull Alpine
DAEMON_STARTED_BY_US=0

if [ "$DO_PULL_ALPINE" -eq 1 ]; then
    printf "\n"
    step "Pulling alpine:latest..."

    # Start daemon temporarily if not running
    if ! "${BINDIR}/doki" ping >/dev/null 2>&1; then
        info "Starting daemon temporarily..."
        "${BINDIR}/dokid" >/dev/null 2>&1 &
        DAEMON_PID=$!
        DAEMON_STARTED_BY_US=1
        sleep 3
    fi

    if "${BINDIR}/doki" pull alpine:latest; then
        success "alpine:latest pulled"
    else
        warn "Failed to pull alpine. Try later: doki pull alpine:latest"
    fi
fi

#  Post-Install: Start Daemon
if [ "$DO_START_DAEMON" -eq 1 ]; then
    printf "\n"

    # Kill temporary daemon if we started it for alpine pull
    if [ "$DAEMON_STARTED_BY_US" -eq 1 ]; then
        kill "$DAEMON_PID" 2>/dev/null || true
        wait "$DAEMON_PID" 2>/dev/null || true
        DAEMON_STARTED_BY_US=0
        sleep 1
    fi

    step "Starting dokid daemon..."
    nohup "${BINDIR}/dokid" >/dev/null 2>&1 &
    disown
    sleep 3

    if "${BINDIR}/doki" ping >/dev/null 2>&1; then
        success "Daemon running (doki ping: OK)"
    else
        warn "Daemon may need a moment to start. Check: doki ping"
    fi
else
    # Kill temporary daemon if we started it for alpine pull
    if [ "$DAEMON_STARTED_BY_US" -eq 1 ]; then
        kill "$DAEMON_PID" 2>/dev/null || true
        wait "$DAEMON_PID" 2>/dev/null || true
    fi
fi

#  Post-Install: Fix PATH
if [ "$DO_FIX_PATH" -eq 1 ] && [ -n "${HOME:-}" ]; then
    printf "\n"
    step "Updating PATH..."

    SHELL_RC=""
    if [ -f "$HOME/.bashrc" ]; then
        SHELL_RC="$HOME/.bashrc"
    elif [ -f "$HOME/.zshrc" ]; then
        SHELL_RC="$HOME/.zshrc"
    elif [ -f "$HOME/.profile" ]; then
        SHELL_RC="$HOME/.profile"
    fi

    if [ -n "$SHELL_RC" ]; then
        PATH_LINE="export PATH=\"${BINDIR}:\$PATH\""
        if ! grep -qF "${BINDIR}" "$SHELL_RC" 2>/dev/null; then
            printf "\n# Doki\n%s\n" "$PATH_LINE" >> "$SHELL_RC"
            info "Added ${BINDIR} to ${SHELL_RC}"
            info "Run 'source ${SHELL_RC}' or restart your shell."
        fi
    else
        warn "No shell rc found. Add ${BINDIR} to your PATH manually."
    fi
fi

#  Summary
printf "\n"
printf "${GREEN}${BOLD}Doki %s installed successfully!${RESET}\n\n" "${VERSION}"

step "Installed binaries:"
for bin in "${INSTALLED_BINS[@]}"; do
    info "  ${BINDIR}/${bin}"
done

if [ "$DO_START_DAEMON" -eq 1 ]; then
    printf "\n"
    step "Daemon status:"
    "${BINDIR}/doki" ping 2>/dev/null && info "  Running" || info "  Not running"
fi

printf "\n"
printf "${BOLD}Quick start:${RESET}\n"
info "  dokid &                    Start the daemon"
info "  doki pull alpine           Pull a base image"
info "  doki run alpine sh         Run a shell"
info "  doki ps                    List containers"
info "  doki images                List images"
info "  doki mesh status           Show mesh identity"
info "  doki link add <peer>       Add a mesh peer"
info "  doki-kube version          Show Kubernetes version"
info "  doki-kubectl get pods      List Kubernetes pods"
printf "\n"
info "  ${DIM}https://github.com/OpceanAI/Doki${RESET}"
info "  ${DIM}https://dok1.xyz${RESET}"
printf "\n"

#  Credits
printf "${YELLOW}"
cat << 'AWA'
:::.  .::    .   .::::::.              ...     .        :    .,-:::::/
  ;;`;; ';;,  ;;  ;;;' ;;`;;          .;;;;;;;.  ;;,.    ;;; ,;;-'````'
 ,[[ '[[,'[[, [[, [[' ,[[ '[[,       ,[[     \[[,[[[[, ,[[[[,[[[   [[[[[[/
c$$$cc$$$c Y$c$$$c$P c$$$cc$$$c cccc $$$,     $$$$$$$$$$$"$$$"$$c.    "$$
 888   888, "88"888   888   888,     "888,_ _,88P888 Y88" 888o`Y8bo,,,o88o
 YMM   ""`   "M "M"   YMM   ""`        "YMMMMMP" MMM  M'  "MMM  `'YMUP"YMM
AWA
printf "${RESET}\n"

printf "${MAGENTA}"
cat << 'CAT'
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⣿⡷⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣴⣿⡿⠋⠈⠻⣮⣳⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣠⣴⣾⡿⠋⠀⠀⠀⠀⠙⣿⣿⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣤⣶⣿⡿⠟⠛⠉⠀⠀⠀⠀⠀⠀⠀⠈⠛⠛⠿⠿⣿⣷⣶⣤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣴⣾⡿⠟⠋⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠛⠻⠿⣿⣶⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⣀⣠⣤⣤⣀⡀⠀⠀⣀⣴⣿⡿⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠿⣿⣷⣦⣄⡀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣤⣄⠀⠀
⢀⣤⣾⡿⠟⠛⠛⢿⣿⣶⣾⣿⠟⠉⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠛⠿⣿⣷⣦⣀⣀⣤⣶⣿⡿⠿⢿⣿⡀⠀
⣿⣿⠏⠀⢰⡆⠀⠀⠉⢿⣿⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠻⢿⡿⠟⠋⠁⠀⠀⢸⣿⠇⠀
⣿⡟⠀⣀⠈⣀⡀⠒⠃⠀⠙⣿⡆⠀⠀⠀⠀⠀⠀⠀⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢸⣿⠇⠀
⣿⡇⠀⠛⢠⡋⢙⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⣿⠄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠀⠀
⣿⣧⠀⠀⠀⠓⠛⠁⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠛⠋⠀⠀⢸⣧⣤⣤⣶⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢰⣿⡿⠀⠀
⣿⣿⣤⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠉⠻⣷⣶⣶⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣿⣿⠁⠀⠀
⠈⠛⠻⠿⢿⣿⣷⣶⣦⣤⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣴⣿⣷⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣾⣿⡏⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠉⠙⠛⠻⠿⢿⣿⣷⣶⣦⣤⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⠿⠛⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⢿⣿⡄⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠛⠻⠿⢿⣿⣷⣶⣦⣤⣄⣀⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⣿⡄⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠛⠿⠿⣿⣷⣶⣶⣤⣤⣀⡀⠀⠀⠀⢀⣴⡆⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢿⡿⣄
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠛⠛⠿⠿⣿⣷⣶⡿⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⣿⣹
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⠀⠀⠀⠀⠀⠀⢸⣧
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣆⠀⠀⠀⠀⠀⠀⢀⣀⣠⣤⣶⣾⣿⣿⣿⣿⣤⣄⣀⡀⠀⠀⠀⣿
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⢿⣻⣷⣶⣾⣿⣿⡿⢯⣛⣛⡋⠁⠀⠀⠉⠙⠛⠛⠿⣿⣿⡷⣶⣿
CAT
printf "${RESET}\n"

printf "  ${DIM}github.com/awa-omg${RESET}\n\n"
