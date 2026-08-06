# @varunteja007006/webp-icons

Tiny zero-dependency npm package that renders icons from a set of `.webp`
images. The images are embedded as **base64 data URIs** at build time, so the
published package is fully self-contained and works in browsers, Node, and
bundlers with no asset loading or path setup.

> Note: scoped package (belongs to your npm user). Publishing it needed a
> granular token granted write access to the `@varunteja007006` scope.

## Install

```bash
npm install @varunteja007006/webp-icons
```

## Usage

```js
import { iconNames, iconSrc, renderIcon } from '@varunteja007006/webp-icons';

console.log(iconNames); // ['1', '2', '5']

// A ready-to-inject <img> HTML string
const html = renderIcon('1', { size: 48, alt: 'first icon' });
// => <img src="data:image/webp;base64,..." alt="first icon" style="width:48px;height:48px;object-fit:contain"/>

// Or just the data URI, if you want your own element
const src = iconSrc('2');
```

### API

| Function     | Description                                              |
| ------------ | -------------------------------------------------------- |
| `iconNames`  | Array of available icon names (from the `.webp` filenames) |
| `iconSrc(name)` | Returns the base64 data URI for an icon. Throws on unknown names. |
| `renderIcon(name, opts)` | Returns an `<img>` HTML string. `opts`: `{ size, alt, className }` |
| default export | The whole name -> data URI map |

## Adding an icon

Drop a new `.webp` file into `assets/` and rebuild:

```bash
npm run build   # regenerates dist/ with the new icon embedded
```

## Scripts

- `npm run build` — read `assets/*.webp`, embed as base64, write `dist/`
- `npm test` — smoke-test the public API
- `npm pack` — build a local `.tgz` to inspect exactly what gets published

---

# Deploying this package to npm

This is the core "how to deploy" guide. Do it once, then it's automatic.

## 1. One-time: create an npm account and log in

```bash
npm login          # enter username, password, and OTP
npm whoami         # should print your username
```

## 2. Make sure the name/version are correct

- `package.json` `name` must be unique on the registry (check with `npm view @varunteja007006/webp-icons`).
- Bump `version` on every release (`npm version patch` for bug fixes,
  `npm version minor` for features). Version numbers can't be reused.

## 3. Preview what will be published (dry run)

```bash
npm pack --dry-run
```

`files` in `package.json` already limits the tarball to `dist/`, `README.md`,
and `LICENSE` — so `src/`, `assets/`, `scripts/`, and `test/` stay out. Always
check that the tarball contents look right and tiny.

## 4. Publish

```bash
npm publish
```

Your package is now live. Anyone can `npm install @varunteja007006/webp-icons`.

## 5. Release a new version later

```bash
npm version patch   # 0.1.0 -> 0.1.1
npm publish
```

## Fully-automated releases (optional)

Swap your explicit `npm version` + `npm publish` for GitHub Actions. Add a
workflow that runs on a `v*` tag:

```yaml:.github/workflows/publish.yml
name: Publish to npm
on:
  push:
    tags: ['v*']
jobs:
  publish:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      id-token: write          # required for provenance
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          registry-url: https://registry.npmjs.org/
      - run: npm ci
      - run: npm test
      - run: npm publish --provenance --access public
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

Then add an `NPM_TOKEN` secret in your repo settings (Settings →
Secrets and variables → Actions) and tag a release:

```bash
npm version patch
git push --follow-tags
```

## Key facts to remember

- **`files` whitelist keeps your package small and secure** — only ship what
  users need.
- **`--dry-run` before every publish** — it's free and catches mistakes.
- **Versions are immutable** — never re-publish the same version.
- **`prepublishOnly` runs your build and tests automatically** before publish.
- **Provenance (`--provenance`)** tells users the package was built from a
  specific commit — nice for trust, easy to enable on GitHub workflows.
- **Scope/access**: public packages use `--access public`; private packages
  require a paid npm account.

## License

MIT