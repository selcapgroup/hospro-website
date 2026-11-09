HOSPRO / ENTITY — private JV prospectus mini-site
=================================================
Upload the whole "entity" folder (index.html, img/, the PDF, this file) into the
root of the hospro-website repo so it sits beside index.html, shared.css etc.
It will then be live at:  https://hospro.co.uk/entity/

- Access code: 3132 (set in index.html, search for const CODE). The check is
  client-side only — it keeps casual visitors out, it is not security.
  Anyone who views the page source can read the content. Do not put anything
  on this page you would not send by email.
- The page is self-contained (one index.html + img/). It does not link to or
  from the public site, and carries noindex/nofollow so search engines ignore it.
- Tabs are bookmarkable: /entity/#ai, /entity/#partnership, etc.
- To change the code, text or images: edit index.html directly, or ask for a
  rebuild from the brochure source.
