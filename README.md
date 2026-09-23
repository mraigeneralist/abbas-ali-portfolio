# Abbas Ali — Portfolio

Personal portfolio site for **Abbas Ali**, full-stack web developer (Hyderabad, India).

Built on the **Zombie Design** system: flat colour bands, thick black outlines, hard zero-blur
offset shadows, Montserrat 900 display type and Nunito body type.

## Stack

Zero build step. Static HTML, CSS and vanilla JavaScript — no framework, no bundler, no dependencies.

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and all section shells |
| `data.js` | **All content** — profile, skills, projects, timeline, certs, awards, testimonials, hobbies, socials |
| `site.css` | Layout and component styling |
| `anims.css` / `anims.js` | Motion: intro loader, reveals, marquee, per-skill animations |
| `app.js` | Rendering, filters, project modal, contact-form validation |
| `styles.css` + `tokens/` | Zombie Design tokens (colour, type, spacing, effects) |

## Editing content

Change `data.js` only. Layout lives in `index.html` + `site.css`, motion in `anims.js` / `app.js`.

To wire up the resume button, drop a PDF in the repo and set the path:

```js
resume: 'assets/abbas-ali-resume.pdf'
```

## Running locally

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Live

**https://abbas-ali-portfolio.vercel.app**

## Deploying

Deployed on Vercel as a static site, linked to this repo — pushes to `main` deploy automatically.

### Using a custom domain

`index.html` (canonical, `og:url`, `og:image`, JSON-LD `url`), `robots.txt` and `sitemap.xml`
currently point at the `.vercel.app` URL. If you add a custom domain such as `abbasali.dev`,
add it in the Vercel project settings and replace that URL in those three files.

## Note on the contact form

The form validates input and shows a success state, but **does not send anything** — there is no
backend. To make it live, point it at a form service (Formspree, Web3Forms) or a Vercel serverless
function, in the `form.addEventListener('submit', ...)` handler in `app.js`.
