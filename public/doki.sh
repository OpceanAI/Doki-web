#!/bin/sh
set -e

# ──────────────────────────────────────────────────────
#  Colors
# ──────────────────────────────────────────────────────
CYAN='\033[0;36m'
MAGENTA='\033[0;35m'
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
WHITE='\033[0;37m'
BOLD='\033[1m'
DIM='\033[2m'
RESET='\033[0m'

# ──────────────────────────────────────────────────────
#  ASCII Art
# ──────────────────────────────────────────────────────
print_logo() {
  printf "${CYAN}"
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
  printf "${RESET}"
}

print_cat() {
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
  printf "${RESET}"
}

# ──────────────────────────────────────────────────────
#  Config
# ──────────────────────────────────────────────────────
PREFIX="${PREFIX:-/data/data/com.termux/files/usr}"
ARCH="$(uname -m)"
VERSION="v0.9.1"
BASE="https://github.com/OpceanAI/Doki/releases/download/${VERSION}"

# ──────────────────────────────────────────────────────
#  Header
# ──────────────────────────────────────────────────────
clear
print_logo
printf "\n"
print_cat

printf "\n${BOLD}${WHITE}  ━━━ ${CYAN}Doki${WHITE} ${DIM}The Universal Container Engine${RESET}${BOLD}${WHITE} ━━━${RESET}\n\n"
printf "  ${DIM}Version:${RESET} ${GREEN}${VERSION}${RESET}    ${DIM}Arch:${RESET} ${YELLOW}${ARCH}${RESET}\n"
printf "  ${DIM}Prefix:${RESET}  ${BLUE}${PREFIX}${RESET}\n\n"
printf "  ${DIM}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n\n"

# ──────────────────────────────────────────────────────
#  Detect Architecture
# ──────────────────────────────────────────────────────
case "$ARCH" in
  aarch64|arm64)
    SUFFIX="android-arm64"
    printf "  ${GREEN}✔${RESET} ${WHITE}Architecture detected:${RESET} ${CYAN}ARM64 (Android/Termux)${RESET}\n\n"
    ;;
  armv7l|armv8l)
    SUFFIX="linux-armv7"
    printf "  ${GREEN}✔${RESET} ${WHITE}Architecture detected:${RESET} ${CYAN}ARMv7 (Android/Termux)${RESET}\n\n"
    ;;
  *)
    printf "  ${RED}✘${RESET} ${WHITE}Unsupported architecture:${RESET} ${RED}${ARCH}${RESET}\n\n"
    printf "  ${DIM}Supported: ARM64 (aarch64/arm64), ARMv7 (armv7l/armv8l)${RESET}\n\n"
    exit 1
    ;;
esac

# ──────────────────────────────────────────────────────
#  Download
# ──────────────────────────────────────────────────────
printf "  ${BOLD}${WHITE}Downloading binaries...${RESET}\n\n"

download() {
  local name="$1"
  local url="$2"
  local dest="$3"
  printf "  ${DIM}▸${RESET} ${WHITE}%-20s${RESET}" "$name"
  if curl -sL "$url" -o "$dest" 2>/dev/null; then
    printf "${GREEN}✔${RESET}  ${DIM}$(du -h "$dest" 2>/dev/null | cut -f1)${RESET}\n"
  else
    printf "${RED}✘${RESET}\n"
    printf "\n  ${RED}Failed to download $name${RESET}\n\n"
    exit 1
  fi
}

BIN_DIR="${PREFIX}/bin"

download "doki"         "${BASE}/doki-${SUFFIX}"           "${BIN_DIR}/doki"
download "dokid"        "${BASE}/dokid-${SUFFIX}"          "${BIN_DIR}/dokid"
download "doki-compose" "${BASE}/doki-compose-${SUFFIX}"   "${BIN_DIR}/doki-compose"
download "doki-init"    "${BASE}/doki-init-${SUFFIX}"      "${BIN_DIR}/doki-init"
download "doki-proot"   "${BASE}/doki-proot-${SUFFIX}"     "${BIN_DIR}/doki-proot"
download "proot"        "${BASE}/proot-${SUFFIX}"          "${BIN_DIR}/proot"

# ──────────────────────────────────────────────────────
#  Permissions
# ──────────────────────────────────────────────────────
printf "\n  ${BOLD}${WHITE}Setting permissions...${RESET}\n"
chmod +x "${BIN_DIR}/doki"*
chmod +x "${BIN_DIR}/proot"
printf "  ${GREEN}✔${RESET} ${DIM}All binaries are executable${RESET}\n"

# ──────────────────────────────────────────────────────
#  Done
# ──────────────────────────────────────────────────────
printf "\n  ${DIM}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n\n"
printf "  ${BOLD}${GREEN}🎉 Doki ${VERSION} installed successfully!${RESET}\n\n"
printf "  ${WHITE}Start the daemon:${RESET}\n"
printf "    ${CYAN}dokid &${RESET}\n\n"
printf "  ${WHITE}Verify it's alive:${RESET}\n"
printf "    ${CYAN}doki ping${RESET}\n\n"
printf "  ${WHITE}Run your first container:${RESET}\n"
printf "    ${CYAN}doki run alpine echo \"Hello from Doki\"${RESET}\n\n"
printf "  ${DIM}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${RESET}\n\n"
printf "  ${DIM}Docs: ${BLUE}https://github.com/OpceanAI/Doki${RESET}\n"
printf "  ${DIM}Web:  ${BLUE}https://doki.opceanai.com${RESET}\n\n"
