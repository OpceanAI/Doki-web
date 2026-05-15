#!/bin/sh
set -eu

VERSION="v0.9.1"
PREFIX="${DOKI_PREFIX:-/data/data/com.termux/files/usr}"
BIN_DIR="${PREFIX}/bin"

CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BLUE='\033[0;34m'
RED='\033[0;31m'
WHITE='\033[0;37m'
BOLD='\033[1m'
DIM='\033[2m'
RESET='\033[0m'

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

# ── ASCII Art ──────────────────────────────────────────
printf "\n${CYAN}"
cat << 'ART'
....                            ..         .    
   .xH888888Hx.                  < .z@8"`        @88>  
 .H8888888888888:           u.    !@88E          %8P   
 888*"""?""*88888X    ...ue888b   '888E   u       .    
'f     d8x.   ^%88k   888R Y888r   888E u@8NL   .@88u  
'>    <88888X   '?8   888R I888>   888E`"88*"  ''888E` 
 `:..:`888888>    8>  888R I888>   888E .dN.     888E  
        `"*88     X   888R I888>   888E~8888     888E  
   .xHHhx.."      !  u8888cJ888    888E '888&    888E  
  X88888888hx. ..!    "*888*P"     888E  9888.   888&  
 !   "*888888888"       'Y"      '"888*" 4888"   R888" 
        ^"***"`                     ""    ""      ""
ART
printf "${RESET}\n"

printf "${MAGENTA}"
cat << 'CAT'
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⣖⡀⢢⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠛⠃⢨⠃⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⠊⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡠⠊⢀⣀⣀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⢎⡰⠊⠉⠀⠉⠑⡆⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢠⡞⡉⠑⡆⠀⡎⡌⠀⠀⢰⡾⠂⠀⡄⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠘⠿⠇⢠⣏⡐⠓⢇⠀⡀⠈⡓⠒⠊⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡠⠼⣸⠀⠀⢸⠊⠀⠀⠰⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⡠⠔⠒⢎⠀⠀⡘⠆⣁⡇⢆⣡⠴⠥⢄⡀⠀⠀
⠀⢀⡀⠀⡀⠀⠀⠀⢠⠎⠀⣀⠤⣾⠷⠦⢼⢿⣉⡳⣋⡤⠀⠀⢀⡇⠀⠀
⢠⡎⠀⣠⢈⡆⠀⠀⡆⡠⠊⠀⢰⠁⠀⠈⡰⢺⠉⡏⠂⠉⢲⠖⠛⠲⢄⡀
⠘⢇⡀⠙⠋⠀⢀⡠⢏⠁⢴⣆⠈⠒⠶⢲⠁⠈⢀⣇⠀⠀⣸⢃⡴⠆⢀⡇
⠀⠈⠙⠒⠶⠖⠋⠁⠈⠐⠚⠁⠀⠀⠀⠘⠦⠤⠊⠀⠉⠉⠁⠀⠑⠒⠊⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⠀⢀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
CAT
printf "${RESET}\n"

printf "\n${BOLD}${WHITE}  Doki -- The Universal Container Engine${RESET}\n"
printf "  ${DIM}https://github.com/OpceanAI/Doki${RESET}\n\n"

# ── Detect Platform ────────────────────────────────────
case "$(uname -m)" in
  aarch64 | arm64)
    arch="android-arm64"
    arch_init="rust-android-arm64"
    platform_label="Android/Termux (ARM64)"
    ;;
  armv7l | armv8l)
    arch="linux-armv7"
    arch_init="linux-armv7"
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

# ── Download ───────────────────────────────────────────
step "Downloading binaries"

download_file "${BASE}/doki-${arch}"           "${BIN_DIR}/doki"
download_file "${BASE}/dokid-${arch}"          "${BIN_DIR}/dokid"
download_file "${BASE}/doki-compose-${arch}"   "${BIN_DIR}/doki-compose"
download_file "${BASE}/doki-init-${arch_init}" "${BIN_DIR}/doki-init"
download_file "${BASE}/doki-proot-${arch}"     "${BIN_DIR}/doki-proot"
download_file "${BASE}/proot-${arch}"          "${BIN_DIR}/proot"

# ── Permissions ────────────────────────────────────────
chmod 0755 "${BIN_DIR}/doki"
chmod 0755 "${BIN_DIR}/dokid"
chmod 0755 "${BIN_DIR}/doki-compose"
chmod 0755 "${BIN_DIR}/doki-init"
chmod 0755 "${BIN_DIR}/doki-proot"
chmod 0755 "${BIN_DIR}/proot"

# ── Done ───────────────────────────────────────────────
printf "\n${GREEN}${BOLD}Doki %s installed successfully.${RESET}\n\n" "${VERSION}"
step "Start the daemon: dokid &"
step "Verify: doki ping"
printf "\n"
