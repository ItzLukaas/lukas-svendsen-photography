/**
 * Lightweight SEO / crawl sanity checks for CI or local runs.
 * Usage: node scripts/seo-check.mjs
 * Optional: BASE_URL=https://www.lukassvendsen.dk node scripts/seo-check.mjs
 */

const BASE = process.env.BASE_URL ?? "http://127.0.0.1:3000";

const ROUTES = [
  "/",
  "/en",
  "/arbejde",
  "/en/work",
  "/om",
  "/en/about",
  "/kontakt",
  "/en/contact",
  "/booking",
  "/en/booking",
  "/arbejde/varde-open-air",
  "/en/work/varde-open-air",
  "/robots.txt",
  "/sitemap.xml",
];

function fail(message) {
  console.error(`FAIL  ${message}`);
  process.exitCode = 1;
}

function ok(message) {
  console.log(`OK    ${message}`);
}

async function check(path) {
  const url = `${BASE}${path}`;
  const res = await fetch(url, { redirect: "manual" });
  if (res.status >= 400) {
    fail(`${path} → HTTP ${res.status}`);
    return null;
  }
  if (res.status >= 300) {
    fail(`${path} → unexpected redirect ${res.status}`);
    return null;
  }
  const contentType = res.headers.get("content-type") ?? "";
  const text = await res.text();
  ok(`${path} → ${res.status}`);
  return { path, contentType, text };
}

async function main() {
  console.log(`SEO check against ${BASE}\n`);

  const titles = new Map();
  const descriptions = new Map();

  for (const path of ROUTES) {
    const result = await check(path);
    if (!result) continue;

    if (path === "/robots.txt") {
      if (!/Sitemap:/i.test(result.text)) fail("robots.txt missing Sitemap");
      if (/Disallow:\s*\/$/im.test(result.text))
        fail("robots.txt blocks entire site");
      if (/Disallow:\s*\/en/im.test(result.text))
        fail("robots.txt blocks /en");
      continue;
    }

    if (path === "/sitemap.xml") {
      if (!result.text.includes("<urlset")) fail("sitemap missing urlset");
      if (!result.text.includes("/arbejde"))
        fail("sitemap missing /arbejde");
      if (!result.text.includes("/en")) fail("sitemap missing /en");
      if (!result.text.includes("/en/work"))
        fail("sitemap missing /en/work");
      continue;
    }

    const htmlLang = result.text.match(/<html[^>]*lang=["']([^"']*)["']/i)?.[1];
    const expectedLang = path === "/en" || path.startsWith("/en/") ? "en" : "da";
    if (htmlLang !== expectedLang) {
      fail(`${path} html lang="${htmlLang ?? ""}" expected "${expectedLang}"`);
    }

    const title = result.text.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim();
    const description = result.text
      .match(
        /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i
      )?.[1]
      ?.trim();
    const canonical = result.text.match(
      /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']*)["']/i
    )?.[1];
    const h1 = result.text.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1]
      ?.replace(/<[^>]+>/g, "")
      ?.trim();

    if (canonical && path.startsWith("/en") && /\/(om|arbejde|kontakt|booking)(\/|$)/.test(canonical) && !canonical.includes("/en")) {
      fail(`${path} canonical points to a Danish URL: ${canonical}`);
    }

    const hasDaHreflang = /hreflang=["']da["']/i.test(result.text);
    const hasEnHreflang = /hreflang=["']en["']/i.test(result.text);
    const hasDefault = /hreflang=["']x-default["']/i.test(result.text);
    if (!hasDaHreflang || !hasEnHreflang || !hasDefault) {
      fail(`${path} missing reciprocal hreflang (da/en/x-default)`);
    }

    if (!title) fail(`${path} missing <title>`);
    if (!description) fail(`${path} missing meta description`);
    if (!canonical) fail(`${path} missing canonical`);
    if (!h1) fail(`${path} missing H1`);

    if (title) {
      if (titles.has(title))
        fail(`duplicate title "${title}" on ${path} and ${titles.get(title)}`);
      else titles.set(title, path);
    }
    if (description) {
      if (descriptions.has(description))
        fail(
          `duplicate description on ${path} and ${descriptions.get(description)}`
        );
      else descriptions.set(description, path);
    }

    if (!result.text.includes("application/ld+json")) {
      fail(`${path} missing JSON-LD`);
    }
  }

  if (!process.exitCode) console.log("\nAll SEO checks passed.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
