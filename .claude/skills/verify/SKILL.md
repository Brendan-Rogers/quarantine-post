---
name: verify
description: Build/launch/drive recipe for verifying The Quarantine Post locally
---

# Verifying The Quarantine Post

Static site — no build step. The terminal UI lives in `js/main.js`; content comes from `js/blog.json`, `js/poems.json`, `js/bees.json` via relative `fetch()` (so it must be served over HTTP, not file://).

## Launch

```bash
python3 -m http.server 8471 --bind 127.0.0.1   # from repo root
```

## Drive

Commands are typed into `#command` and submitted on Enter (`keyup` listener on `document` checks `e.key === "Enter"`). Output appends to `#output`.

For headless verification, write a temporary same-origin harness page in the repo root that loads `index.html` in an iframe, sets the input value, and dispatches `new KeyboardEvent("keyup", { key: "Enter" })` on the iframe document, then run:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new \
  --user-data-dir=<scratch>/chrome-profile --virtual-time-budget=20000 \
  --dump-dom http://127.0.0.1:8471/__verify_harness.html > out.html
```

Delete the harness file afterward.

## Flows worth driving

- `HELP`, `WEBLOG` (post count), `START`, `NEXT`/`PREVIOUS` past the ends, a number command out of range (`99`)
- `POETRY` + `LEAVES.TXT` (poems.json fetch), `BEES` (bees.json fetch)
- Unknown command → error message; `EXIT` → "browser does not allow" message
- Repeated distinct commands trip the "Information Overload" easter egg at 5/10/15 unique commands and lock the terminal at 20 (`overload` mode) — expected, not a bug
- Full endgame: roll `D4 D6 D8 D10 D12 D20` first, hit 20 unique overload-counted commands, then any 7 commands walk `overclock` to the password prompt (the 8th+ are password attempts). The password is the concatenated dice results in roll order (parse "Dn RESULT : x" from the output). Correct entry prints "THE QUARANTINE POST ACT 2 - OLDFACTORY".
- Up/down arrows navigate a real command history (`commandHistory` in main.js).

## Gotchas

- `.htaccess` is Apache-only; the python server ignores it. Apache behavior (HTTPS redirect) can't be verified locally.
- The logo swaps `logo.svg` → `logo.png` on an 8s timer; `--virtual-time-budget` fast-forwards it.
