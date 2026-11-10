HOSPRO / ENTITY — private JV prospectus, multi-page site (v4)
=============================================================
STRUCTURE
  entity/index.html          gate (code 3132) + home + contents
  entity/pages/*.html        37 pages, one per section
  entity/assets/site.v4.css  shared styles
  entity/assets/site.v4.js   shared behaviour (gate, chips, tools, form)
  entity/img/                photos, logo, HosDESK screenshots
  entity/HosPRO-JV-Prospectus.pdf  earlier print edition

UPLOAD (github.com/orngroup/hospro-website)
  1. DELETE the existing "entity" folder in the repo first (so no old
     single-page index.html is left behind).
  2. Upload this whole "entity" FOLDER into the repo root
     -> path must be entity/index.html, entity/pages/..., entity/assets/...
  3. Wait for the Pages build (Actions tab, green tick), then open
     https://hospro.co.uk/entity/   and hard-refresh (Cmd+Shift+R).
     Asset files are versioned (site.v4.*) so old caches cannot apply.

NOTES
  - Access code: const CODE in assets/site.v4.js. Client-side only.
  - Discussion form emails CONTACT_EMAIL in assets/site.v4.js.
  - noindex/nofollow; not linked from the public site.
