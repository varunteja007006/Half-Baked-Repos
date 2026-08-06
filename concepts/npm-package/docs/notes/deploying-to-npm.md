# Publishing an npm package — Post-mortem

A captured reference of what actually happens when deploying a scoped npm
package, the errors you hit, their root causes, and the fixes. Designed to be
generic — swap in `<your-username>` / `<your-package>` below.

## Result

- Package: **`@<your-username>/<your-package>`**
- Live and installable: `npm install @<your-username>/<your-package>`
- Page: `https://www.npmjs.com/package/@<your-username>/<your-package>`

## TL;DR

The **code was never the problem.** Every failed attempt was an **auth /
permission** problem with the granular npm access token. npm deliberately
returns misleading status codes (403 vs 404) to avoid leaking which package
names exist — which makes debugging confusing.

---

## The error gauntlet (in order)

| # | Error | What it actually meant |
|---|-------|------------------------|
| 1 | `E403 … Two-factor authentication or granular access token with bypass 2fa enabled is required` | Token lacked `bypass_2fa` (or no token). npm requires this to publish. |
| 2 | `E404 … could not be found or you do not have permission` | Token authenticated (read identity) but was **granted package write to nothing** — `scopes: [{ name: null, type: "package" }]`. npm shows 404 for missing publish permission on purpose. |
| 3 | `E403 … You may not perform that action with these credentials.` | Token had a write grant, but it was scoped to the **username scope** (`@<your-username>`), not to the unscoped package name. So it could only publish `@<your-username>/*`. |
| 4 | Publish printed `+ @<your-username>/<your-package>@0.1.0`, but local `npm view`/`install` returned 404 | Stale **Cloudflare edge cache** at one CDN pop cached the pre-publish 404/. The package was actually live — a fresh install from another edge worked fine. |

## Gotchas

- npm returns **404** (not 401/403) for "you are not permitted to publish this
  package" so users can't probe which names are in use. There is no friendly
  "no access" message for package writes.
- `npm whoami` succeeding only proves the token can **read your identity**, not
  that it can **write** anything.
- After the *first* publish, the local CDN may briefly serve a negative-cached
  404. Re-check from another path / clear cache before assuming it failed.

---

## Token rules (check before you publish)

- `npm whoami` — returns your username → the token reads identity, that's it.
- Registry API to see the token's real grant:
  ```bash
  TOKEN="$(\npm config get //registry.npmjs.org/:_authToken)"
  curl -s -H "Authorization: Bearer $TOKEN" https://registry.npmjs.org/-/npm/v1/tokens
  ```
  Inspect `scopes[].name` and `bypass_2fa`.

When creating a **Granular access token** on npmjs.com:
- Grant the **exact package name OR the scope** you'll publish — do not grant
  nothing.
- If you choose a username scope, you can publish only `@<your-username>/*`.
- Permission: **Read and write**.
- Keep **"Bypass two-factor authentication"** checked, or publish is rejected.
- If you want an **unscoped** name (e.g. `webp-icons`), the token must grant
  that *exact package name*, not your scope.

---

## What made the publish finally work

1. **Scoped package name** `@<your-username>/<your-package>` (instead of an
   unscoped name). A token already granted for the `<your-username>` scope can
   publish this immediately — no new token required.
2. Add `"publishConfig": { "access": "public" }` to `package.json` — scoped
   packages default to **private**, so this forces them public.
3. `npm publish` — build + tests auto-run first via `prepublishOnly`.

---

## How to publish — step by step

Run from the package repo root.

### 1. Bump the version (versions can't be reused)

```bash
npm version patch   # x.y.z -> x.y.z+1 (bug fix)
# npm version minor # small feature
# npm version major # breaking change
```

`npm version` also creates a git tag (e.g. `v0.1.1`).

### 2. Preview the tarball

```bash
npm pack --dry-run
```

`Tarball Contents` should include only what's in the `files` array (e.g.
`dist/`, `README.md`, `LICENSE`, `package.json`). If extra dirs appear, fix
`files` before publishing.

### 3. Check auth

```bash
npm whoami                  # your username
npm config get registry     # https://registry.npmjs.org/
```

The token in `~/.npmrc` must have write access to the target package and
`bypass_2fa: true`.

### 4. Publish

```bash
npm publish
```

Expect:
```
+ @<your-username>/<your-package>@0.1.1
```

### 5. Verify from a clean consumer

```bash
npm view @<your-username>/<your-package> version    # -> 0.1.1
npm install @<your-username>/<your-package>@latest  # in another project
```

If `npm view` 404s right after publishing, wait ~a minute and retry — the write
may have succeeded while the CDN edge was behind.

### 6. Push the tag

```bash
git push --tags   # once the repo has a remote
```

### Cheat sheet

```bash
npm version patch && npm publish   # cut a fix
npm pack --dry-run                  # sanity-check the tarball
npm publish --otp <code>            # if interactive 2FA is on
```

> Public vs private: public package needs `publishConfig.access: "public"`.
> Private packages require a paid npm account.

---

## Command reference

```bash
npm whoami                       # who am I / is auth configured
npm profile get                  # email verified? 2fa mode?
npm config get registry          # confirm npmjs.org
npm view @<user>/<pkg>           # already taken / live?
npm pack --dry-run               # preview tarball
npm publish --otp <code>         # publish (passing 2FA OTP)
npm version patch && npm publish # next release
```

---

## 2026 context (auth is shifting)

npm is **retiring "classic" tokens** and restricting **bypass-2FA** tokens:

- 2025-09: classic tokens revoked/disabled on npmjs.com.
- 2026-07: bypass-2FA tokens lose sensitive account/package **management**;
  those need an interactive 2FA challenge.
- Targeted **Jan 2027**: bypass-2FA tokens lose **direct publish**; publishing
  will move to **Trusted Publishing (OIDC)** or **staged publishing**.

Long-term, prefer **Trusted Publishing (OIDC)** via GitHub Actions with
`--provenance` rather than a long-lived token.

---

## Consumer smoke test (proof it works)

```bash
rm -rf /tmp/consumer && mkdir -p /tmp/consumer && cd /tmp/consumer
npm init -y
npm install @user/package@latest
node -e "import('@user/package').then(m=>console.log(m.iconNames))"
```