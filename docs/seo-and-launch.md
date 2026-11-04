# Search, analytics, and launch setup

Status checked on 4 November 2026.

## Accounts

- Google Search Console: existing verified domain property `sc-domain:vextor.co`. Successfully submitted the deployed canonical sitemap, `https://vextor.co/sitemap.xml`. The previous www submission had 10 discovered pages.
- Google Analytics: created the Vextor account and Vextor Website GA4 property under the Vextor business account. Account ID `414740379`, property ID `562374593`, web stream ID `16271019826`, measurement ID `G-9KQ25RK5N4`. The tag is deployed on every production page. Realtime data collection has not been independently confirmed in the Analytics dashboard.
- GA4 enhanced measurement: browser-history pageviews are disabled. The React metadata hook sends pageviews after updating each page title. Duplicate StrictMode pageviews are suppressed; query strings and URL fragments are excluded from page locations.
- Bing Webmaster Tools: Vextor is verified. Submitted `https://vextor.co/sitemap.xml`; Bing reports it as Processing.
- Product Hunt: [Vextor](https://www.producthunt.com/products/vextor?launch=vextor) is scheduled for 5 November 2026 at 12:01 AM Pacific / 1:31 PM India time. The pre-launch dashboard confirms Scheduled. Post ID: `1304293`.

## Website configuration

- `src/content/page-metadata.json` supplies the titles and descriptions for both React navigation and the generated HTML pages. All 10 sitemap pages have unique metadata.
- Canonical URLs, social previews, structured data, sitemap, crawler documentation, and the contact-form return URL use `https://vextor.co`.
- `public/robots.txt` allows crawling of every route and references the non-www sitemap. No page is blocked by robots.txt.
- Vercel and Netlify redirect rules send www traffic to the same path on the non-www domain. Vercel explicitly serves each generated route's HTML before the SPA fallback.
- `src/content/site-badges.json` contains the official Product Hunt embed URLs and a dated mobile Lighthouse performance score of 92/100. The score links to the measured PageSpeed report; it is a snapshot, not a continuously updated measurement.

## Production hosting

The production project for `jayyymin18/vextor-site` belongs to Vercel team `jaimins-projects-f56b0c69`, project `vextor-site`. Pushing to the repository's `main` branch deploys production.

Removed the old GoDaddy apex-to-www forwarding after owner approval and SMS verification. Connected the apex to Production in Vercel, and changed its GoDaddy A record to `216.198.79.1`, the address specified by this Vercel project. Authoritative DNS confirms the new address. The existing www CNAME remains `edd364dc0340f942.vercel-dns-017.com`.

Vercel confirmed successful deployment of code commit `c07412e86d8fa135f71664661cd55f0750c2661f`: `https://vextor-site-6g8espaj1-jaimins-projects-f56b0c69.vercel.app`. Public verification confirms `https://www.vextor.co/services` returns HTTP 308 to `https://vextor.co/services`, which returns HTTP 200.

## Validation completed

- `npm run build` passes.
- No `noindex` or `nofollow` matches in source, public files, build scripts, or output.
- All 10 sitemap routes exist under `dist`, with matching canonical URLs, unique titles and descriptions, matching social metadata, parseable JSON-LD, and the GA4 tag.
- Public and built sitemap URLs match.
- Local services page renders one H1 and the expected title, description, and canonical URL.
- Analytics checks pass for first load, duplicate suppression, route navigation, back navigation, and referrer query removal.
- All 10 live sitemap URLs return HTTP 200 with their expected unique metadata, canonical URLs, GA4 tag, and no indexing restrictions in HTML or response headers.
- Live robots.txt allows all routes and references the non-www sitemap.
