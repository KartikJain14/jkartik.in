# Search visibility and publishing

Reviewed 13 November 2026. This is a portfolio and firsthand engineering publication.
The implementation targets relevant features, rather than adding unrelated schema types.

## Implemented

- Static HTML, crawlable internal links, canonical URLs and real HTTP 404s.
- WebSite and Person identity, a homepage ProfilePage, BlogPosting articles and breadcrumbs.
- Article WebPage nodes link to their author, article and breadcrumb entities.
- Original publication dates and explicit revision dates agree in visible text, Open Graph,
  JSON-LD and sitemap lastmod. Unchanged content does not receive a new date on each build.
- Representative article social images are at least 1200 pixels wide. Small original cover
  photos stay in the article; socialImage can select a larger existing article illustration.
- Large image previews, RSS, related writing, section navigation and a publishing/contact page.
- A local build audit runs during Docker builds. Run `npm run build && npm run check:seo` locally.
- An IndexNow proof file and submission tool are available for participating engines.

## What each feature means

| Surface | What the site provides | What remains outside the code |
| --- | --- | --- |
| Standard search and AI answers | Readable HTML, clear titles, original evidence, author identity and structured data | Crawling, indexing, ranking and citation selection |
| Article appearance | BlogPosting with author, image, publication and modification dates | Search engines choose presentation |
| Discover | Indexable articles, representative large images and large-preview permission | No application or special Discover schema; selection is automatic |
| Google News / Top stories | Authorship, transparent dates, contact details and crawlable articles | Relevant original reporting and editorial quality; inclusion is automatic, never guaranteed |
| Profile and site identity | Person, ProfilePage and WebSite with consistent identifiers | Knowledge panels and sitelinks are algorithmic |
| Bing and participating IndexNow engines | XML sitemap and an optional URL-notification tool | Deploy first; submissions do not guarantee indexing |
| DuckDuckGo | Crawlable pages and Bing discovery improvements | DuckDuckGo largely sources traditional links from Bing and also runs its own crawler |

Technical tutorials remain BlogPosting. Do not relabel old posts as NewsArticle, change
their publication dates to look fresh, or add fake reviews, JobPosting, Event, Dataset,
Product or video markup to obtain an appearance the visible content does not qualify for.
A hiring availability page is not a job vacancy. A blog about an event is not an event listing.
FAQ content can help readers without promising a Google FAQ rich result.

A News sitemap is for news published in the last two days. The current engineering archive
does not justify one, and a static build would need frequent regeneration to expire entries.
There is no need to add an empty news sitemap to the present site.

## Maintaining articles

Keep `date` as the true original publication date. Set `updated: YYYY-MM-DD` only after a
substantial edit. Optional `socialImage: /blog/example.png` should point to a real, relevant
image visible in the article, not an unrelated logo. The audit checks dimensions and file
existence; an editor still needs to judge whether an image represents the content well.

## After deployment

1. Verify the domain in Google Search Console and Bing Webmaster Tools using DNS verification.
   No account access or verification tokens were supplied during this change.
2. Submit `https://jkartik.in/sitemap.xml` in both tools. Inspect the homepage, hire page,
   publishing page and a few article URLs. Check rendered HTML, indexing and canonical selection.
3. Run Google's Rich Results Test and Schema.org Validator against the deployed pages. The
   local audit detects regressions; it is not an official rich-result eligibility validator.
4. Run `npm run indexnow` to inspect the payload without network requests. Once this version
   and `/indexnow-key.txt` are live, run `npm run indexnow -- --submit`. The key is public proof
   of site control, not a secret. The tool verifies the deployed proof before submitting.
5. Submit only after meaningful changes, rather than every unchanged build. This small-site
   tool submits the current sitemap; deleted URLs can be reported through webmaster tools.
6. Check Core Web Vitals field data and Search Console reports as traffic accumulates. A local
   build cannot establish real-user performance or a search engine's indexing decisions.
7. For editorial exposure, publish timely original research with checkable sources and a clear
   explanation of what is new. Share the relevant article with communities, maintainers or
   journalists yourself; no external outreach or paid placement was performed here.

## Primary references

- [Google Search documentation](https://developers.google.com/search/docs)
- [SEO starter guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)
- [Supported structured data](https://developers.google.com/search/docs/appearance/structured-data/search-gallery)
- [Structured data policies](https://developers.google.com/search/docs/appearance/structured-data/sd-policies)
- [Article](https://developers.google.com/search/docs/appearance/structured-data/article)
- [ProfilePage](https://developers.google.com/search/docs/appearance/structured-data/profile-page)
- [Breadcrumbs](https://developers.google.com/search/docs/appearance/structured-data/breadcrumb)
- [Site names](https://developers.google.com/search/docs/appearance/site-names)
- [Titles](https://developers.google.com/search/docs/appearance/title-link)
- [Publication dates](https://developers.google.com/search/docs/appearance/publication-dates)
- [Sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Discover](https://developers.google.com/search/docs/appearance/google-discover)
- [News sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap)
- [News policies](https://support.google.com/news/publisher-center/answer/6204050)
- [AI features](https://developers.google.com/search/docs/appearance/ai-features)
- [Page experience](https://developers.google.com/search/docs/appearance/page-experience)
- [Favicons](https://developers.google.com/search/docs/appearance/favicon-in-search)
- [Bing guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)
- [IndexNow protocol](https://www.indexnow.org/documentation)
- [DuckDuckGo sources](https://duckduckgo.com/duckduckgo-help-pages/results/sources)

This review covers the documentation relevant to this site, not every Google Search article
(many describe unrelated products, content types and specialized publisher integrations).
