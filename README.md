# Reasoning Reliability site

Static research site in the same visual language as
[retrieval-vs-computation](https://adya6714.github.io/retrieval-vs-computation/).

## Local

```sh
cd site
python3 -m http.server 5173
```

Open http://127.0.0.1:5173/

## Deploy (GitHub Pages)

Pushes to `main` that touch `site/` run `.github/workflows/pages.yml` and publish
this folder to [adya6714.github.io/reasoning-reliability](https://adya6714.github.io/reasoning-reliability/).

Manual redeploy: Actions → Deploy site to GitHub Pages → Run workflow.

Demo numbers are illustrative. Design truth lives in `docs/`.
