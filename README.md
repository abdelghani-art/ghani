# Ghani — Portfolio website

A fast, dependency-free portfolio site (plain HTML + CSS + vanilla JS, **no build step**).
Dark, bold layout inspired by a Behance portfolio: outlined "PORTFOLIO" hero, orange accents,
numbered table of contents, case studies, a filterable gallery and a lightbox.

```
index.html            ← the whole page (edit text here)
404.html              ← "page not found" page
_headers              ← cache + security headers (used by Cloudflare Pages)
.nojekyll             ← tells GitHub Pages to serve files as-is
assets/css/style.css  ← all styles (colours at the top in :root)
assets/js/main.js     ← menu, gallery filters, lightbox, scroll animations
assets/img/full/      ← optimised artwork (WebP, max 1800 px)
assets/img/thumb/     ← thumbnails used in the grids (WebP, 700 px)
assets/img/og-image.jpg, favicon.*  ← link preview image and icons
```

All paths are relative, so the site works at a domain root **or** in a sub-folder (e.g. `username.github.io/portfolio/`).

---

## 1. Put the code on GitHub

1. Create a new repository on GitHub (e.g. `portfolio`), leave it empty (no README).
2. In this folder run:
   ```bash
   git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
   git branch -M main
   git push -u origin main
   ```
   (Or use GitHub Desktop / "uploading an existing file" on github.com and drag all files in.)

## 2. Host it on Cloudflare Pages (recommended)

Every push to `main` will redeploy automatically.

1. Log in to <https://dash.cloudflare.com> (free account is fine).
2. **Workers & Pages → Create → Pages → Connect to Git**.
3. Authorise GitHub and pick the `portfolio` repository → **Begin setup**.
4. Build settings:
   - **Framework preset:** `None`
   - **Build command:** *(leave empty)*
   - **Build output directory:** `/`
5. **Save and Deploy**. After ~30 s the site is live at `https://<project-name>.pages.dev`.

### Custom domain (optional)
1. In the Pages project: **Custom domains → Set up a custom domain**.
2. Enter your domain (e.g. `ghani.design` or `www.ghani.design`).
3. If the domain is already on Cloudflare, the DNS record is added for you. Otherwise Cloudflare shows a
   `CNAME` record (`www` → `<project-name>.pages.dev`) to add at your registrar. HTTPS is automatic.

### Alternative: direct upload (no GitHub needed)
**Workers & Pages → Create → Pages → Upload assets** → name the project → drag this whole folder
(or the zip) into the page → **Deploy**. To update later, upload a new version in the same project.

## 3. Or host it on GitHub Pages

1. On GitHub: **Settings → Pages**.
2. **Source:** *Deploy from a branch* → Branch `main`, folder `/ (root)` → **Save**.
3. Live in a minute at `https://YOUR-USERNAME.github.io/portfolio/`.
   (Name the repo `YOUR-USERNAME.github.io` to get the root URL.)

## 4. Preview locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

---

## Editing

- **Text:** open `index.html` and search for `TODO` — every place that needs real info is marked.
- **Colours / fonts:** top of `assets/css/style.css` (`--orange`, `--black`, `--paper`, …).
- **Add an image to the gallery:**
  1. Export a WebP (≈1800 px long side) to `assets/img/full/my-piece.webp` and a ≈700 px version to `assets/img/thumb/my-piece.webp`.
     (Free tool: <https://squoosh.app>.)
  2. Copy one `<figure data-cat="…">…</figure>` block inside `<div class="masonry">`, change the file names,
     `width`/`height`, title, client and `data-cat` (`manipulation`, `branding`, `social`, `posters`, `thumbnails`).
  3. Update the count in the matching filter button (`<sup>`), the service card and the hero stats.
- **Contact form:** a Formspree form is ready (commented out) in the Contact section.

## TODO checklist (things the site still needs from you)

- [ ] Full name / surname (title, meta tags, footer)
- [ ] Your own bio in the About section
- [ ] A portrait photo for About (currently uses "The Rider" artwork)
- [ ] Software / tools you use (Services section)
- [ ] Experience & education (section is ready but commented out)
- [ ] Real email address (`TODO-your-email@example.com`, 1 link in Contact)
- [ ] Instagram / Behance / LinkedIn / WhatsApp links (commented out in Contact)
- [ ] Once live: absolute URL for `canonical` and `og:image` in `<head>`
- [ ] Check that every client name / project title is correct and that you are OK showing each piece
- [ ] Optional: "years of experience" stat in the hero (real number only)

The artwork belongs to its respective clients and is shown for portfolio purposes.
