import type { Metadata } from 'next'
import PageLayout, { H1, Lede, H2, P } from '@/components/PageLayout'
import { pageMetadata, articleLd } from '@/lib/seo'

const PATH = '/contact'
const TITLE = 'Contact — AI Companions Labs'
const DESC = 'Contact AI Companions Labs — support email, Telegram, corrections and partnership enquiries.'
const SUPPORT_EMAIL = 'stackpicks.dev@gmail.com'
const TELEGRAM = '@piyush_sdai'

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESC, path: PATH })

export default function ContactPage() {
  return (
    <PageLayout
      crumbs={[{ name: 'Home', path: '/' }, { name: 'Contact', path: PATH }]}
      jsonLd={articleLd({ headline: TITLE, description: DESC, path: PATH })}
    >
      <H1>Contact AI Companions Labs</H1>
      <Lede>
        Reach us by email for support and partnerships, or on Telegram for quick questions.
      </Lede>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
        gap: 14,
        margin: '10px 0 30px',
      }}>
        <ContactCard
          label="Support"
          value={SUPPORT_EMAIL}
          href={`mailto:${SUPPORT_EMAIL}`}
        />
        <ContactCard
          label="Telegram"
          value={TELEGRAM}
          href={`https://t.me/${TELEGRAM.replace('@','')}`}
          external
        />
        <ContactCard
          label="Partnerships"
          value={SUPPORT_EMAIL}
          href={`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Partnership enquiry')}`}
        />
      </div>

      <H2>Send us a message</H2>
      <P>
        Use the form below and your default mail client will open a pre-filled draft. If you
        prefer, you can email <a href={`mailto:${SUPPORT_EMAIL}`}>{SUPPORT_EMAIL}</a> directly.
      </P>

      <ContactForm />

      <H2>What to include</H2>
      <P>
        For corrections: the URL of the page, the specific fact that is wrong, and (if possible)
        a source we can verify against. For partnership enquiries: a short summary of what you
        are proposing and any relevant links.
      </P>

      <H2>Response times</H2>
      <P>
        We reply to most emails within 3 business days. Corrections are prioritized when the
        error is factual.
      </P>
    </PageLayout>
  )
}

function ContactCard({ label, value, href, external }: { label: string; value: string; href: string; external?: boolean }) {
  return (
    <a
      href={href}
      {...(external ? { target: '_blank', rel: 'noopener' } : {})}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        padding: '16px 18px',
        background: '#fff',
        border: '1px solid #f6d3e1',
        borderRadius: 12,
        color: '#331523',
        textDecoration: 'none',
      }}
    >
      <span style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#c2255c' }}>
        {label}
      </span>
      <span style={{ fontSize: 15.5, fontWeight: 700 }}>{value}</span>
    </a>
  )
}

// Static, JS-free form that hands the draft to the user's mail client.
// The action= URL is a mailto: with a pre-filled subject; the body is not
// pre-filled because browsers strip line breaks unreliably on mailto POSTs.
// This intentionally has no server dependency; wire Formspree/Getform later
// without changing the visible form.
function ContactForm() {
  const SUPPORT_EMAIL = 'stackpicks.dev@gmail.com'
  return (
    <form
      method="post"
      action={`mailto:${SUPPORT_EMAIL}`}
      encType="text/plain"
      style={{
        display: 'grid',
        gap: 12,
        maxWidth: 620,
        background: '#fff',
        border: '1px solid #f6d3e1',
        borderRadius: 14,
        padding: 20,
      }}
    >
      <Field label="Name" name="Name" type="text" required />
      <Field label="Email" name="Email" type="email" required />
      <FieldSelect label="Reason" name="Reason" options={[
        'General', 'Correction', 'Partnership', 'Affiliate', 'Technical', 'Character', 'Media',
      ]} />
      <FieldTextarea label="Message" name="Message" required />
      <button
        type="submit"
        style={{
          justifySelf: 'start',
          background: 'linear-gradient(135deg,#f0417e,#ad1457)',
          color: '#fff',
          borderRadius: 999,
          padding: '12px 24px',
          fontSize: 14,
          fontWeight: 700,
          border: 'none',
          cursor: 'pointer',
        }}
      >
        Open in mail client
      </button>
    </form>
  )
}

function Field({ label, name, type, required }: { label: string; name: string; type: string; required?: boolean }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, color: '#331523' }}>
      <span style={{ fontWeight: 700 }}>{label}{required && <span style={{ color: '#c2255c' }}> *</span>}</span>
      <input
        name={name}
        type={type}
        required={required}
        style={{
          padding: '10px 12px',
          borderRadius: 8,
          border: '1px solid #f0a3c2',
          fontSize: 14,
        }}
      />
    </label>
  )
}
function FieldSelect({ label, name, options }: { label: string; name: string; options: string[] }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, color: '#331523' }}>
      <span style={{ fontWeight: 700 }}>{label}</span>
      <select
        name={name}
        style={{
          padding: '10px 12px',
          borderRadius: 8,
          border: '1px solid #f0a3c2',
          fontSize: 14,
          background: '#fff',
        }}
      >
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  )
}
function FieldTextarea({ label, name, required }: { label: string; name: string; required?: boolean }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4, fontSize: 13, color: '#331523' }}>
      <span style={{ fontWeight: 700 }}>{label}{required && <span style={{ color: '#c2255c' }}> *</span>}</span>
      <textarea
        name={name}
        rows={5}
        required={required}
        style={{
          padding: '10px 12px',
          borderRadius: 8,
          border: '1px solid #f0a3c2',
          fontSize: 14,
          resize: 'vertical',
          fontFamily: 'inherit',
        }}
      />
    </label>
  )
}
