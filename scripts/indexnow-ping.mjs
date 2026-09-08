// IndexNow ping — pushes URLs to Bing (which feeds Copilot + ChatGPT web
// search) and Yandex/Naver/Seznam. Run manually after publishing new content:
//
//   npm run indexnow                    # push all URLs from live sitemap
//   npm run indexnow -- <url> [<url>]   # push specific URLs
//
// Bing typically starts crawling within minutes. Google does not accept
// IndexNow — for Google, use GSC's URL Inspection tool manually.

const HOST = 'aicompanionslabs.com'
const KEY = process.env.INDEXNOW_KEY || '9102d783c8193977a86727ff781de39e'
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`

async function loadUrls() {
  const cliArgs = process.argv.slice(2).filter((a) => a.startsWith('http'))
  if (cliArgs.length > 0) return cliArgs

  const res = await fetch(`https://${HOST}/sitemap.xml`)
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status}`)
  const xml = await res.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
}

async function main() {
  const urls = await loadUrls()
  if (urls.length === 0) {
    console.error('No URLs to submit.')
    process.exit(1)
  }

  console.log(`IndexNow: pushing ${urls.length} URL(s) to ${HOST}...`)

  const resp = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: HOST,
      key: KEY,
      keyLocation: KEY_LOCATION,
      urlList: urls,
    }),
  })

  const body = await resp.text().catch(() => '')
  console.log(`Response: ${resp.status} ${resp.statusText}`)
  if (body) console.log(body)

  // Status codes: 200 OK · 202 Accepted (still processing) · 400 bad request
  // · 403 key not found at keyLocation · 422 URLs don't match host · 429 rate
  // limited. 200/202 = success.
  if (resp.status !== 200 && resp.status !== 202) process.exit(1)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
