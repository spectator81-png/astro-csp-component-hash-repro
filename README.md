# Astro CSP: `Astro.csp.insertScriptHash()` from a component inside `<body>` is silently dropped

`InlineScript.astro` renders an inline script and registers its hash with `Astro.csp?.insertScriptHash()` in its own frontmatter. The component is used in the page body, inside a layout.

- `src/pages/index.astro` uses `Layout.astro`, which has a named slot (`<slot name="head" />`) inside `<head>`.
- `src/pages/plain.astro` uses `LayoutPlain.astro`, which has no slot in `<head>`.

```sh
npm install
npm run build
npm run check-csp
```

| Astro | with named slot in head | without slot in head |
|---|---|---|
| 7.3.2 | component hash present | component hash MISSING |
| 7.3.3 to 7.4.2 | component hash MISSING | component hash MISSING |

The layout's own hash is always present. When the component hash is missing, the browser blocks the component's inline script. There is no build warning.
