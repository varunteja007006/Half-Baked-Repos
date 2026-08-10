#!/usr/bin/env bash
# Build a standalone APK and drop it in the repo root.
# Usage: ./build-apk.sh dev|prod
set -euo pipefail

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"

MODE="${1:?usage: $0 dev|prod}"

case "$MODE" in
  dev)  ENV_FILE=".env.local" ;;
  prod) ENV_FILE=".env.production" ;;
  *)    echo "unknown mode: $MODE (use dev or prod)" >&2; exit 1 ;;
esac

# Bake the right env (EXPO_PUBLIC_CONVEX_URL, ...) into the JS bundle.
set -a; . "./$ENV_FILE"; set +a

# Prod builds ship with the production backend: deploy Convex first so the APK
# points at the latest functions/schema. (dev builds keep the local dev server.)
if [ "$MODE" = "prod" ]; then
  echo ">> Deploying Convex backend to $CONVEX_DEPLOYMENT ..."
  npx convex deploy
fi

if [ ! -d android ]; then
  echo "Native project missing — running prebuild..."
  npx expo prebuild -p android --no-install
fi

# The Gradle daemon freezes its environment when it starts. If it's already
# running (spawned with different/no EXPO_PUBLIC_* vars), the bundle task
# would bake in undefined. Kill it so a fresh daemon inherits our env.
(cd android && ./gradlew --stop >/dev/null 2>&1 || true)

echo ">> Building release APK with $ENV_FILE ..."
# Remove the previous JS bundle so Gradle re-bundles with OUR env instead of
# marking the task up-to-date and reusing a bundle baked with a different env.
rm -f android/app/build/generated/assets/react/release/index.android.bundle
(cd android && ./gradlew :app:assembleRelease)

cp android/app/build/outputs/apk/release/app-release.apk "eggsy.$MODE.apk"
echo "Done: $DIR/eggsy.$MODE.apk"