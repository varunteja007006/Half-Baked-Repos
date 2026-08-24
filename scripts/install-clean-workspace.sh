#!/usr/bin/env bash

set -euo pipefail

RAW_URL="https://raw.githubusercontent.com/varunteja007006/Half-Baked-Repos/main/scripts/clean-workspace.mjs"
SCRIPT_DIR="$(dirname "${BASH_SOURCE[0]:-.}")"
LOCAL_SOURCE="$SCRIPT_DIR/clean-workspace.mjs"
TARGET_DIR="${1:-.}"

if [[ ! -d "$TARGET_DIR" ]]; then
	echo "Error: directory not found: $TARGET_DIR" >&2
	exit 1
fi

TARGET_DIR="$(cd "$TARGET_DIR" && pwd)"

if [[ ! -f "$TARGET_DIR/package.json" ]]; then
	echo "Error: no package.json found in $TARGET_DIR" >&2
	echo "Run this script from the root of a Node project." >&2
	exit 1
fi

mkdir -p "$TARGET_DIR/scripts"
DEST="$TARGET_DIR/scripts/clean-workspace.mjs"

fetch() {
	local url="$1"
	local out="$2"
	if command -v curl >/dev/null 2>&1; then
		curl -fsSL "$url" -o "$out"
	elif command -v wget >/dev/null 2>&1; then
		wget -qO "$out" "$url"
	else
		return 1
	fi
}

if [[ -f "$LOCAL_SOURCE" ]]; then
	cp -f "$LOCAL_SOURCE" "$DEST"
	SOURCE_LABEL="local copy"
else
	if ! fetch "$RAW_URL" "$DEST" || [[ ! -s "$DEST" ]]; then
		rm -f "$DEST"
		echo "Error: could not download clean-workspace.mjs from GitHub" >&2
		echo "Check your internet connection or clone the repo instead." >&2
		exit 1
	fi
	SOURCE_LABEL="downloaded from Half-Baked-Repos"
fi

echo ""
echo "Installed clean-workspace.mjs ($SOURCE_LABEL) -> $DEST"
echo ""
echo "Add these entries inside the \"scripts\" object of your package.json:"
echo ""
cat <<'EOF'
  "clean": "node scripts/clean-workspace.mjs",
  "clean:cache": "node scripts/clean-workspace.mjs --mode cache",
  "clean:deps": "node scripts/clean-workspace.mjs --mode deps",
  "clean:dry": "node scripts/clean-workspace.mjs --dry-run"
EOF
echo ""
