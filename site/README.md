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

Published from the `gh-pages` branch (contents of this folder).
Live: [adya6714.github.io/reasoning-reliability](https://adya6714.github.io/reasoning-reliability/).

To republish after site edits:
```sh
# from repo root, after committing site/ on main
rm -rf /tmp/rr-pages && mkdir /tmp/rr-pages && cp -R site/* /tmp/rr-pages/
cd /tmp/rr-pages && git init && git checkout -b gh-pages
git add -A && git commit -m "Update Pages site"
git remote add origin https://github.com/Adya6714/reasoning-reliability.git
git push -f origin gh-pages
```

An Actions workflow file may be added later once the GitHub token has `workflow` scope.

Demo numbers are illustrative. Design truth lives in `docs/`.
