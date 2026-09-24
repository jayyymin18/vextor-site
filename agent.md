# AGENTS.md

## Project Overview
This is the Vextor marketing website. Vextor is a Salesforce consulting company based in Ahmedabad, India, serving construction and project-based businesses worldwide.

## Voice And Positioning
- Write for business owners and operations leaders, not only Salesforce admins or developers.
- Prefer plain language: "set up Salesforce", "fix Salesforce", "connect your tools", "we stay and look after it".
- Avoid unnecessary jargon such as org, architecture, implementation, automation layer, Apex, and LWC in buyer-facing copy unless the page is intentionally technical.
- Primary positioning: Salesforce experts for project-based businesses, with BuilderTek support as a specialization.

## SEO Rules
- Every indexable page needs one H1, a unique meta title, a unique meta description, a canonical URL, and useful internal links.
- Do not add `noindex` or `nofollow` tags unless the site owner explicitly asks for a page to be hidden from search.
- Keep `public/sitemap.xml`, `public/robots.txt`, `public/llms.txt`, and `scripts/generate-seo-pages.mjs` aligned when routes change.
- Use descriptive alt text for meaningful images. Decorative icons can rely on accessible button labels or hidden text instead.
- Keep URLs short, lowercase, and hyphenated. Current public slugs are `/`, `/services`, `/industries`, `/work`, `/success-stories`, `/about`, `/contact`, and `/thank-you`.
- Preserve schema markup for Organization, WebSite, ProfessionalService, page-level schema, FAQPage, ItemList, Service, and ContactPage where relevant.

## Build And Verification
- Run `npm run build` after code or SEO changes.
- Check for accidental `noindex` with `rg -n "noindex|nofollow" src index.html public scripts dist`.
- Check broken local references after a build by confirming sitemap routes exist under `dist`.
- Do not edit generated `dist` files directly; change `src`, `public`, or `scripts/generate-seo-pages.mjs`, then rebuild.

## Performance Guidance
- Keep images compressed and appropriately sized before adding them to `public/images`.
- Prefer SVG for simple illustrations and WebP/JPG for photographic assets.
- Use lazy loading for below-the-fold images and eager loading only for critical above-the-fold assets such as the logo.
- Avoid adding large libraries unless they support an important user-facing feature.
