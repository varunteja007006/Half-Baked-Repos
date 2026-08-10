# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Building & installing the APK

### Build

Run `build-apk.sh` from the project root, choosing an environment:

```bash
./build-apk.sh dev    # uses .env.local  → eggsy.dev.apk
./build-apk.sh prod   # uses .env.production → eggsy.prod.apk
```

Notes:
- `prod` builds **deploy the Convex backend first** (`npx convex deploy` to the production deployment), so the APK ships with the latest functions/schema. Dev builds skip this — they talk to the local dev server.
- The env file is baked into the JS bundle (`EXPO_PUBLIC_CONVEX_URL`, ...), so a rebuild is required to switch environments.
- The `gradlew` daemon is stopped before building so the new env vars aren't frozen out by a stale daemon.
- Output APK lands in the repo root as `eggsy.<mode>.apk`.

### Install

Plug in your phone with USB debugging enabled ([enable it in Developer Options](https://developer.android.com/studio/run/device#developer-device-options)), then:

```bash
adb devices          # confirm the phone is listed (not "unauthorized")
adb install eggsy.prod.apk
```

Useful flags:
- `-r` reinstall and keep app data: `adb install -r eggsy.prod.apk`
- `-d` allow downgrade (pair with `-r`): `adb install -rd eggsy.prod.apk`
- `-g` grant all runtime permissions at install time

If `adb devices` shows `unauthorized`, accept the RSA debug prompt on your phone.

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

### Other setup steps

- To set up ESLint for linting, run `npx expo lint`, or follow our guide on ["Using ESLint and Prettier"](https://docs.expo.dev/guides/using-eslint/)
- If you'd like to set up unit testing, follow our guide on ["Unit Testing with Jest"](https://docs.expo.dev/develop/unit-testing/)
- Learn more about the TypeScript setup in this template in our guide on ["Using TypeScript"](https://docs.expo.dev/guides/typescript/)

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.
