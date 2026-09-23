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

## Deploying

Deployed on Vercel as a static site. Pushes to `main` deploy automatically.

## Note on the contact form

The form validates input and shows a success state, but **does not send anything** — there is no
backend. To make it live, point it at a form service (Formspree, Web3Forms) or a Vercel serverless
function, in the `form.addEventListener('submit', ...)` handler in `app.js`.
