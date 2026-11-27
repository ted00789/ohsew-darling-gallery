# Ohsew Darling Gallery

Implement exactly the screenshot and nothing else

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://ohsew-darling-gallery.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4ffad449-ce18-4eec-b637-524157b90b9e).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

## Static build and GitHub Pages

Use Node.js 22.12 or newer, then run `npm install` and `npm run build`.
The deployable static folder is **`dist/client/`**, containing `index.html`,
JavaScript/CSS, the existing images, `CNAME`, and `.nojekyll`.
Upload only this folder; `dist/server/` is temporary build tooling for generating
the SPA shell and is not used by the hosted site. Nitro and Cloudflare are disabled.

The asset base is `/`, for a custom domain hosted at its root. Each existing route
has a copy of the same SPA shell at `<route>/index.html`, so direct visits and
refreshes work on a plain static server without rewrites. `404.html` provides
GitHub Pages' fallback. The included Pages workflow uploads `dist/client/`.

To check locally without a server runtime:

```sh
python3 -m http.server 4173 --directory dist/client
```

Open `/`, `/gallery`, `/pricing`, `/how-it-works`, and `/contact`.
A static server may add a trailing slash to directory URLs; the client router
still renders the same existing routes.

The build downloads the existing image assets, so it requires network access
to their current Lovable host. After building, the images are served locally
from the static folder and do not require Lovable's asset proxy.

Contact submissions are browser-only JSON POSTs. Replace `YOUR_FORM_ID` in
`FORM_ENDPOINT` at the top of `src/routes/contact.tsx` before accepting real
requests. The form's success/error messages and appearance are unchanged.
Client-side page metadata remains, but static HTML only contains the shared
shell metadata until JavaScript runs; non-JavaScript crawlers do not receive
each page's rendered content.
