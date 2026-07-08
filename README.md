# The Quarantine Post

The Quarantine Post is a Blog documenting my adventures as an RX postman. It's powered by an interactive JS command line, and a JSON file containing blog posts.

## Running it

There's no build step — it's plain HTML, CSS, and JavaScript. Serve the folder over HTTP (the blog content loads via `fetch`, so opening `index.html` directly from disk won't work):

```bash
python3 -m http.server 8000
```

Then visit http://localhost:8000 and type `>>HELP`.

## Deploying

Upload everything except `assets/` (design sources) to the webserver. The included `.htaccess` redirects HTTP to HTTPS on Apache — delete it if the server has no SSL certificate.

## Structure

- `index.html` — the page shell
- `js/main.js` — the terminal: command parsing, easter eggs, the works
- `js/blog.json` — the blog posts (add new entries here)
- `js/poems.json`, `js/bees.json` — additional content served by commands
- `css/master.css` — all styling, including the CRT effects (edit directly)
- `images/` — logos and post artwork
- `assets/` — design source files, not needed on the server

## The true ending (spoilers)

Act 1 has a hidden ending, and you can lock yourself out of it. Every *unique* command you run feeds the Information Overload counter — at 20, the terminal locks up and stops taking normal commands. The trick is to collect the password **before** that happens:

1. Roll all six dice first: `>>DICE`, then `>>D4`, `>>D6`, `>>D8`, `>>D10`, `>>D12`, `>>D20`. Write down each result, in that order — together they're the password.
2. Keep exploring until you've used 20 unique commands and the terminal overloads.
3. Ride out the monologue — keep entering anything until you're asked for the PASSWORD.
4. Enter your dice results concatenated in roll order (e.g. rolls of 1, 1, 1, 9, 5, 14 make `1119514`).

Get it right and you'll open some doors. If you overloaded without rolling all six dice, that's the END of ACT 1 — you missed your chance.

## License

[MIT](https://choosealicense.com/licenses/mit/)
