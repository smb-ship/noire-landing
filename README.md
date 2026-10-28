# NOIRÉ — dark-luxury perfume landing page

A cinematic, fully responsive landing page for a **fictional** fragrance house, built with
Next.js, React, TypeScript, React Three Fiber (Three.js + Drei), Motion for React and hand-written CSS.

> **Demo only.** NOIRÉ is not a real brand. The newsletter form, the "Reserve" buttons and the "Bag"
> are placeholders: nothing is sent, stored, reserved or sold, and each one says so on screen.

## What is inside

| Section | What it does |
| --- | --- |
| Hero | Full-screen 3D perfume bottle (smoky glass body, gold cap, engraved label), floating animation, mouse-reactive tilt, animated headline "A SCENT THAT STAYS." |
| Collection | Three signature perfumes with notes, prices and hover animations |
| Story | A pinned, scroll-driven "fragrance in three acts" while the bottle turns with your scroll |
| Craft | Ingredients and a four-step process |
| Closing | Call to action, demo newsletter form, footer |

**The 3D bottle is modelled in code** (`src/components/BottleScene.tsx`) from rounded boxes and cylinders, lit
by procedural softboxes and a reflective floor. There is no `.glb` file to lose or download, and no Blender
step. If a device has no WebGL, or the 3D scene fails, an illustrated SVG bottle is shown instead.

## Run it on your computer (first time)

1. Install **Node.js 20.9 or newer** (the "LTS" version) from <https://nodejs.org>.
2. Unzip this project and open a terminal **inside the folder** (the one that contains `package.json`).
   - Windows: open the folder, click the address bar, type `cmd`, press Enter.
   - Mac: right-click the folder, choose "New Terminal at Folder".
3. Install everything the project needs (takes about a minute):
   ```bash
   npm install
   ```
4. Start the site:
   ```bash
   npm run dev
   ```
5. Open <http://localhost:3000> in your browser. Press `Ctrl + C` in the terminal to stop it.

To test the production version exactly as Vercel will serve it:

```bash
npm run build
npm start
```

## Deploy to Vercel

### Option A: GitHub (recommended, free)

1. Create a free account at <https://github.com> and a new empty repository.
2. Upload the project files to it. Do **not** upload `node_modules` or `.next` (the included `.gitignore` already
   excludes them if you use `git`). With git installed:
   ```bash
   git init
   git add .
   git commit -m "NOIRÉ landing page"
   git branch -M main
   git remote add origin https://github.com/YOUR-NAME/noire.git
   git push -u origin main
   ```
3. Go to <https://vercel.com>, sign in with GitHub and click **Add New → Project**.
4. Pick your repository and click **Deploy**. Vercel detects Next.js on its own: no settings to change and no
   environment variables to add.
5. After about a minute you get a live link. Every future `git push` redeploys automatically.

### Option B: Vercel CLI (no GitHub)

```bash
npm install -g vercel
vercel          # follow the prompts, accept the defaults
vercel --prod   # publish to your production link
```

## Change the content

| I want to change… | Edit this file |
| --- | --- |
| Perfume names, notes, prices | `src/lib/data.ts` |
| Story chapters, ingredients, process steps | `src/lib/data.ts` |
| Headline and hero text | `src/components/Hero.tsx` |
| Colours, fonts, spacing | top of `src/app/globals.css` (the `:root { … }` block) |
| Bottle shape, glass, gold, lighting | `src/components/BottleScene.tsx` |
| Page title and description (SEO) | `src/app/layout.tsx` |

## Project structure

```
src/
  app/            layout.tsx, page.tsx, globals.css
  components/     Nav, Hero, Collection, Story, Craft, Closing, Footer,
                  BottleStage (scroll logic), BottleScene (3D), BottleFallback (no-WebGL), Demo (demo notices)
  lib/            data.ts (all copy), stageState.ts (scroll → 3D bridge)
public/           favicon.svg
```

## Accessibility and performance notes

- Keyboard: skip link, visible focus rings, mobile menu closes with `Esc`.
- `prefers-reduced-motion`: the floating, mouse tilt, sparkles, headline reveal and scroll-spin are toned down or removed.
- The 3D layer is only rendered while the bottle is on screen (hero and story). It is paused in between.
- On phones and weaker GPUs the scene automatically switches to a lighter glass material and a smaller reflection.
- Fonts (Bodoni Moda, Jost) are installed from npm, so the site works offline and never calls Google Fonts.

## Troubleshooting

- **`npm` is not recognised:** Node.js is not installed, or you need to reopen the terminal after installing.
- **Port 3000 is busy:** run `npm run dev -- -p 3001` and open <http://localhost:3001>.
- **The bottle looks flat or is replaced by a drawing:** your browser has hardware acceleration turned off. Turn it on in the browser settings.
- **Vercel build fails:** make sure `package-lock.json` was uploaded and the Node version in Vercel's project settings is 20 or higher.

## Before a real launch

This is a design and front-end demo. To go live you would still need to: connect the newsletter form
(`src/components/Closing.tsx`, marked `DEMO ONLY`) to an email service, add a real checkout for the Reserve
buttons, replace the placeholder copy and prices, and add privacy and legal pages.
