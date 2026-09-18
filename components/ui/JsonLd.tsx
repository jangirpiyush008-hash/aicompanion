// Renders one JSON-LD script tag. Accepts any JSON-serialisable object; use
// the helpers in lib/seo.ts to build the payload.
export default function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
