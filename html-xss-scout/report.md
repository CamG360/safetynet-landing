# Review Report

## Summary
- No Content-Security-Policy meta tag is present on any reviewed page, including the primary entry point `index.html`; combined with inline `<script>` blocks and one inline `onerror` handler, this is the most significant defense gap found.
- External CDN loading is generally well-handled: the Tailwind CDN scripts in `placement-recommendations.html`, `visual-mockups.html`, and `sri-browser-test.html` all carry `integrity` + `crossorigin="anonymous"`. However, the Google Fonts stylesheet is loaded on four pages without SRI, and `sri-browser-test.html` uses an inline `innerHTML` assignment (DOM-XSS pattern, though fed only by hardcoded strings).
- No `<iframe>`, no `<form>`/`action`, no `<base href>`, no non-HTTPS hosts, no leaked credentials in comments. `data-*` attributes carry only static values and are consumed by the local module scripts referenced in `index.html` (`modal-loader.js`, `faq-renderer.js`, `story-loader.js`, `reactions-marquee.js`, `main.js`).

## Findings

### Finding: No Content-Security-Policy header or meta tag on any reviewed page
Evidence: Searched all reviewed files for `http-equiv="Content-Security-Policy"` — zero matches. `index.html:3-13` (head) contains only `charset`, `viewport`, `description`, `title`, `icon`, `preload`, `stylesheet`, and `script` tags; no CSP meta. Same absence in `privacy.html:3-11`, `terms.html:3-11`, `placement-recommendations.html:3-14`, `visual-mockups.html:3-14`, `sri-browser-test.html:3-7`.
Impact: Without CSP, the browser enforces no script-source allowlist, so any future injected inline script (e.g. via a compromised dependency or a stored/reflected payload) would execute unrestricted. It also forces reliance on the absence of XSS sinks rather than a defense-in-depth boundary.
Fix: Add a restrictive `<meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data:; connect-src 'self'; base-uri 'none'; form-action 'self'">` to `index.html` at minimum (and ideally ship CSP via Vercel response headers, which is stronger than meta). Note the inline `lucide.createIcons()` blocks and the `onerror` handler on the founder photo require either moving to external scripts or adding a nonce/'unsafe-inline' for script-src.
Priority: P2
Confidence: high

### Finding: Inline `onerror` event handler on founder photo in index.html
Evidence: `index.html:952` — `onerror="console.error('Image failed to load:', this.src)"` on the `<img>` for Campbell McCord.
Impact: Inline event handlers force CSP `script-src` to include `'unsafe-inline'` (or a nonce per element), which materially weakens any CSP deployed later. The handler itself only logs the (attacker-uncontrollable) `src` attribute to the console — no XSS sink here — but the pattern blocks a strict CSP.
Fix: Remove the inline `onerror` and attach the handler from `js/main.js` via `addEventListener('error', ...)`, or drop it entirely (broken-image handling can be done in CSS).
Priority: P3
Confidence: high

### Finding: Inline `<script>` blocks require unsafe-inline CSP
Evidence: `privacy.html:92-96`, `terms.html:106-110`, `placement-recommendations.html:477-481`, `visual-mockups.html:379-383` all contain:
```
<script>
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
</script>
```
`sri-browser-test.html:133-329` contains a larger inline module with test logic. `index.html` itself has no inline script but loads five local `<script type="module">` files (`index.html:1373-1377`).
Impact: Each inline block forces CSP `script-src 'unsafe-inline'` (or per-element nonces), which degrades CSP's anti-XSS value. No sink for attacker data exists in the privacy/terms/placement/mockups blocks; the `sri-browser-test.html` block writes to `innerHTML` (see next finding).
Fix: Move the `lucide.createIcons()` call into the existing local module scripts (or a tiny `icons-init.js`) so CSP can drop `'unsafe-inline'` entirely.
Priority: P3
Confidence: high

### Finding: innerHTML assignment fed by template literal in sri-browser-test.html
Evidence: `sri-browser-test.html:144-154`:
```
resultsContainer.innerHTML = tests.map(test => `
    <div class="test-result ${test.status}">
        <div class="icon">
            ${test.status === 'success' ? '✅' : test.status === 'error' ? '❌' : '⏳'}
        </div>
        <div>
            <div class="test-name">${test.name}</div>
            <div class="test-details">${test.details}</div>
        </div>
    </div>
`).join('');
```
`test.name` / `test.status` / `test.details` are all hardcoded string literals within the same file (e.g. `addTest('Tailwind CSS SRI Attributes', 'success', \`integrity="${tailwindScript.integrity}", crossorigin="${tailwindScript.crossOrigin}"\`)` at line 165-169). `tailwindScript.integrity` and `tailwindScript.crossOrigin` are read from the page's own `<script>` element attributes.
Impact: This is a DOM-based XSS *pattern* but not an exploitable sink today: every value inserted is authored in-file, none is user- or URL-controlled. If a future maintainer ever feeds user input into `addTest(...)`, it would become exploitable.
Fix: Replace `innerHTML` assignment with `textContent` / `createElement` construction, or sanitize via a small DOMPurify call. Keep the pattern safe-by-default.
Priority: P3
Confidence: high

### Finding: Google Fonts stylesheet loaded without SRI on four pages
Evidence: `privacy.html:9`, `terms.html:9`, `placement-recommendations.html:13`, `visual-mockups.html:13` — all contain:
```
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
```
with no `integrity` or `crossorigin` attribute. (Note: `index.html` correctly self-hosts its font via `fonts/inter-latin-300-700.woff2` at `index.html:9`, avoiding this issue.)
Impact: A compromise of `fonts.googleapis.com` (or a CDN-level injection) could serve a malicious stylesheet that exfiltrates content via CSS `background-url` or overrides styling for phishing. No integrity check would block it.
Fix: Either self-host the Inter font (preferred, matching `index.html`'s approach) or add `integrity="sha384-..."` and `crossorigin="anonymous"` to the `<link>`. SRI on cross-origin stylesheets requires the CDN to send CORS headers — Google Fonts does, so this is straightforward.
Priority: P3
Confidence: high

### Finding: Local lucide.min.js loaded without SRI on all pages
Evidence: `index.html:11`, `privacy.html:8`, `terms.html:8`, `placement-recommendations.html:12`, `visual-mockups.html:12`, `sri-browser-test.html:131` — all load `<script src="js/vendor/lucide.min.js">` (some with `defer` or `id`) without `integrity`/`crossorigin`.
Impact: Same-origin assets are not protectable by SRI in the same way, and the file is served from the site's own origin, so the practical risk is low. The `sri-browser-test.html` page explicitly documents this as an intentional choice ("no SRI required for same-origin assets", line 119). The residual risk is that a compromised build pipeline could silently alter the vendored file.
Fix: Optional — pin a build-time hash of `lucide.min.js` in CI and/or add `integrity` (SRI works for same-origin too, though browsers treat it as a defense against tampering rather than CORS). At minimum, ensure the Vercel deploy serves these with immutable cache headers and the build is reproducible.
Priority: P3
Confidence: medium

### Finding: HTML comments disclose internal line-number references
Evidence: `placement-recommendations.html:119` — `<p class="text-slate-600 mt-2">Location: Our Story section (line 886-920)</p>`; `placement-recommendations.html:206` — `Location: Concept section (line 246-291)`; `placement-recommendations.html:282` — `Location: Hero section after headline (line 58-176)`; `placement-recommendations.html:347` — `Location: Use Cases intro (line 500-506)`. Also `index.html:98` — `<!-- DO NOT change this button's id/classes — it is the waitlist conversion trigger -->`.
Impact: These are displayed in rendered text (the placement-recommendations page is a design-strategy doc), leaking internal source layout. No tokens, credentials, or internal URLs are exposed. This is informational only.
Fix: Strip the `(line ...)` references before deploying `placement-recommendations.html` to production, or noindex/gate the page.
Priority: P3
Confidence: high

### Finding: Tailwind CDN script SRI hash is reused across three pages — verify it is current
Evidence: `placement-recommendations.html:7-11`, `visual-mockups.html:7-11`, `sri-browser-test.html:125-130` all use:
```
integrity="sha384-VK3iZSOy03XNa6Ba48af6ubHywenceWJjdXhhrvfhdaDgDGHRCt47O6A6d8fjdVu"
crossorigin="anonymous"
```
for `https://cdn.tailwindcss.com/3.4.10`.
Impact: SRI is correctly applied, which is good. The only residual concern is that `cdn.tailwindcss.com/3.4.10` is the Tailwind Play CDN, which Tailwind themselves discourage for production. If the CDN endpoint is ever retired, the SRI-locked version would still load (good) but the page would have no CSS if the URL is removed (the hash would prevent silent swap). Not exploitable, but a maintainability note.
Fix: For production pages, replace the Tailwind Play CDN with a compiled, self-hosted `tailwind.css` (as `index.html` already does at `index.html:10`). Reserve the Play CDN for mockup/preview pages only.
Priority: P3
Confidence: medium

## Clean
- Inline event handlers (other than the one `onerror` on index.html:952): no `onclick`, `onmouseover`, `onfocus`, `onsubmit`, `onload`, `onchange`, `oninput`, `onkeydown`, or `javascript:` URIs were found in any reviewed file.
- No `<iframe>` elements in any reviewed file (so no sandbox/allowlist concerns).
- No `<form>` elements or `action` attributes — the waitlist conversion is driven by `<button class="open-registration-modal">` elements and modal logic in `js/modal-loader.js`; no unvalidated redirect targets.
- No `<base href>` tag in any reviewed file.
- No non-HTTPS external hosts: all external `src`/`href` use `https://` (cloudflare.com, ico.org.uk, fonts.googleapis.com, cdn.tailwindcss.com). No `http://` external loads.
- HTML comments: reviewed for tokens/credentials/internal URLs — none found. The only comment "leak" is internal line-number references (see Findings) and a non-sensitive build note.
- `data-*` attributes: all carry static, author-controlled values (`data-lucide`, `data-step`, `data-hiw-panel`, `data-hiw-active`, `data-category`, `data-faq-id`, `data-contact-email`, `data-email="hello@safetynetbeta.com"`, `data-modal-content`, `data-container-class`, etc.). Consumed by the local module scripts referenced at `index.html:1373-1377` (`js/modal-loader.js`, `js/faq-renderer.js`, `js/story-loader.js`, `js/reactions-marquee.js`, `js/main.js`) — these JS files are out of scope for this review and were not opened, but no `data-*` value is URL- or user-derived, so no injection vector is present at the HTML surface.
- External link hygiene: `target="_blank"` links in `privacy.html:55`, `privacy.html:63`, `modals/privacy-policy.html:77`, `:84`, `:112` all correctly carry `rel="noopener noreferrer"`.

## Assumptions
- All ten files in the hunt list were present and fully read. `index.html` was read in two passes (lines 1-774 and 775-1379) to capture the full 1379-line file.
- The five JS modules referenced in `index.html:1373-1377` (`js/modal-loader.js`, `js/faq-renderer.js`, `js/story-loader.js`, `js/reactions-marquee.js`, `js/main.js`) and `js/vendor/lucide.min.js` are NOT in the assigned file list and were intentionally not opened; conclusions about `data-*` consumption are inferred from the script `src` tags and the attribute names only. If any of those modules assemble `innerHTML` from `data-*` values, that would be a separate (out-of-scope) sink to review.
- The `modals/alert-demo.html`, `modals/privacy-policy.html`, `modals/terms-of-service.html`, and `content/our-story-extended.html` files are HTML fragments (no `<head>`), loaded into modals/sections by `js/modal-loader.js` / `js/story-loader.js`; they inherit the CSP/headers of their host page (`index.html`) at render time.
- Vercel-level HTTP response headers (CSP, HSTS, X-Content-Type-Options, etc.) were not inspectable from the repo's HTML; this review only covers what is enforceable via `<meta>`. A header-level check on the deployed site is recommended as follow-up.
