import Link from 'next/link'
import Image from 'next/image'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import FloatingBackground from '@/components/FloatingBackground'
import { characters, characterCover } from '@/lib/characters'
import { posts } from '@/lib/blog'
import {
  CATEGORIES, FAQS, LAB_TESTS, PLATFORMS, SECRET_DESIRES_AFFILIATE_URL, SITE,
} from '@/lib/site'

// Small typed inline-style helpers to keep JSX below readable.
const primaryCta: React.CSSProperties = {
  background: 'linear-gradient(135deg,#f0417e,#ad1457)',
  color: '#fff',
  borderRadius: 999,
  padding: '16px 34px',
  fontSize: 16,
  fontWeight: 700,
  boxShadow: '0 8px 28px rgba(214,51,108,0.32)',
  textDecoration: 'none',
}
const outlinePinkCta: React.CSSProperties = {
  color: '#a61e4d',
  border: '1.5px solid #f0a3c2',
  borderRadius: 999,
  padding: '16px 34px',
  fontSize: 16,
  fontWeight: 700,
  background: '#fff',
  textDecoration: 'none',
}

export default function Home() {
  return (
    <>
      <FloatingBackground density={14} />
      <Nav />

      {/* ─────────── HERO ─────────── */}
      <header
        id="top"
        style={{
          position: 'relative',
          overflow: 'hidden',
          background:
            'radial-gradient(1000px 600px at 78% 15%,rgba(247,131,172,0.55),transparent 65%),' +
            'radial-gradient(800px 500px at 10% 95%,rgba(230,73,128,0.22),transparent 60%),' +
            'radial-gradient(900px 500px at 45% 115%,rgba(124,20,60,0.16),transparent 70%)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(300px,1.1fr) minmax(280px,0.9fr)',
            gap: 48,
            alignItems: 'center',
            padding: '72px 40px 80px',
          }}
          className="hero-grid"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24, position: 'relative', zIndex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#d6336c' }}>
              AI Companion Discovery Platform
            </div>
            <h1
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(40px,5.5vw,68px)',
                lineHeight: 1.05,
                margin: 0,
                fontWeight: 700,
                color: '#2b0f1d',
                textWrap: 'balance',
              }}
            >
              Your Next AI Companion <em style={{ color: '#c2255c', fontStyle: 'italic' }}>Is Waiting</em>
            </h1>
            <p style={{ fontSize: 18, lineHeight: 1.65, color: '#6f4a5d', margin: 0, maxWidth: '52ch' }}>
              Discover AI girlfriends, virtual companions, custom characters, immersive
              experiences, and the platforms behind them.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', alignItems: 'center' }}>
              <Link href="#characters" style={primaryCta}>Explore AI Companions</Link>
              <Link href="#characters" style={outlinePinkCta}>Browse AI Characters</Link>
              <Link href="#trending" style={{ color: '#8a6274', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>
                Find the Best AI Companion →
              </Link>
            </div>
            <div style={{ fontSize: 12, color: '#a3818f' }}>
              18+ Adult-oriented content. AI-generated characters and experiences.
            </div>
          </div>

          <div style={{ position: 'relative', justifySelf: 'end', width: '100%', maxWidth: 420 }}>
            <div
              aria-hidden="true"
              style={{
                position: 'absolute', inset: -30,
                background: 'radial-gradient(closest-side,rgba(230,73,128,0.25),transparent)',
                filter: 'blur(24px)',
              }}
            />
            <Image
              src="/characters/karley/1.webp"
              alt="Karley, an AI-generated companion character in an elegant evening look"
              width={840} height={1120}
              priority
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '3/4',
                objectFit: 'cover',
                objectPosition: 'top',
                borderRadius: 24,
                border: '4px solid #fff',
                boxShadow: '0 30px 70px rgba(120,30,70,0.28)',
                display: 'block',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 16, bottom: 16,
                background: 'rgba(255,255,255,0.85)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid #f6d3e1',
                borderRadius: 12,
                padding: '10px 16px',
                fontSize: 13,
              }}
            >
              <span style={{ fontWeight: 700 }}>Karley</span>{' '}
              <span style={{ color: '#8a6274' }}>· AI-generated character</span>
            </div>
          </div>
        </div>
      </header>

      {/* ─────────── EDITOR'S PICK ─────────── */}
      <section style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '8px 40px 0' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(260px,2fr) minmax(220px,1fr)',
            gap: 0,
            background: '#fff',
            border: '1.5px solid #f2b8cf',
            borderRadius: 20,
            overflow: 'hidden',
            boxShadow: '0 16px 60px rgba(214,51,108,0.22)',
          }}
        >
          <div style={{ padding: '36px 40px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#e8590c' }}>
              ★ Editor&apos;s Pick
            </div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: '#2b0f1d' }}>
              Secret Desires
            </div>
            <p style={{ margin: 0, color: '#6f4a5d', fontSize: 15, lineHeight: 1.6, maxWidth: '56ch' }}>
              Explore a highly customizable AI companion experience with personalized characters,
              conversations and immersive AI-generated experiences.
            </p>
            <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginTop: 6, alignItems: 'center' }}>
              <a
                href={SECRET_DESIRES_AFFILIATE_URL}
                rel="sponsored noopener nofollow"
                target="_blank"
                style={{
                  background: 'linear-gradient(135deg,#f0417e,#ad1457)',
                  color: '#fff', borderRadius: 999, padding: '13px 28px',
                  fontSize: 15, fontWeight: 700, textDecoration: 'none',
                }}
              >
                Try Secret Desires →
              </a>
              <Link href="#reviews" style={{ color: '#a61e4d', fontSize: 14, fontWeight: 700, textDecoration: 'none' }}>
                Read Our Secret Desires Review
              </Link>
            </div>
          </div>
          <div
            style={{
              background:
                'radial-gradient(400px 300px at 70% 40%,#fbd6e5,transparent),linear-gradient(160deg,#fde8f0,#fbd0e0)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 200,
            }}
          >
            <div style={{ textAlign: 'center', padding: 24 }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 52, color: '#c2255c' }}>SD</div>
              <div style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: '#a3818f', fontFamily: 'monospace' }}>
                Featured Partner
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────── EXPLORE BY CATEGORY ─────────── */}
      <section style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '72px 40px 0' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, margin: '0 0 28px', fontWeight: 700, color: '#2b0f1d' }}>
          Explore by Category
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(240px,1fr))',
            gap: 16,
          }}
        >
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.name}
              href={cat.href}
              style={{
                display: 'flex', flexDirection: 'column', gap: 8,
                background: '#fff', border: '1px solid #f6d3e1', borderRadius: 16, padding: 24,
                color: '#331523', boxShadow: '0 2px 10px rgba(214,51,108,0.05)',
                textDecoration: 'none',
              }}
            >
              <div style={{ fontSize: 22 }}>{cat.icon}</div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 600 }}>{cat.name}</div>
              <div style={{ fontSize: 13.5, color: '#8a6274', lineHeight: 1.5 }}>{cat.desc}</div>
              <div style={{ fontSize: 13, color: '#d6336c', fontWeight: 700, marginTop: 'auto' }}>Explore →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────── CHARACTER SHOWCASE ─────────── */}
      <section
        id="characters"
        style={{
          position: 'relative',
          background: 'radial-gradient(800px 420px at 50% 0%,rgba(247,131,172,0.18),transparent 70%)',
          maxWidth: 1200, margin: '0 auto', padding: '80px 40px 0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 10 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, margin: 0, fontWeight: 700, color: '#2b0f1d' }}>
            Meet the AICompanionPartner Characters
          </h2>
          <span style={{ fontSize: 13, color: '#a3818f' }}>
            All characters are fictional adults · AI-generated
          </span>
        </div>
        <p style={{ color: '#8a6274', fontSize: 15, margin: '0 0 28px', maxWidth: '70ch' }}>
          Original AI-generated characters, each with a consistent identity, personality
          and gallery. Meet them, then interact with them on Secret Desires.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(250px,1fr))', gap: 18 }}>
          {characters.map((c) => (
            <Link
              key={c.slug}
              href={`/characters/${c.slug}/`}
              style={{
                position: 'relative',
                display: 'block',
                borderRadius: 18,
                overflow: 'hidden',
                border: '3px solid #fff',
                background: '#fff',
                color: '#fff',
                boxShadow: '0 6px 24px rgba(120,30,70,0.14)',
                textDecoration: 'none',
              }}
            >
              <Image
                src={characterCover(c)}
                alt={c.gallery[0]?.alt || `${c.name} AI companion character portrait`}
                width={500} height={666}
                style={{
                  width: '100%',
                  aspectRatio: '3/4',
                  objectFit: 'cover',
                  objectPosition: 'top',
                  display: 'block',
                }}
              />
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', inset: 0,
                  background:
                    'linear-gradient(to top,rgba(43,15,29,0.88) 0%,rgba(43,15,29,0.2) 38%,transparent 60%)',
                  boxShadow: 'inset 0 0 70px rgba(43,15,29,0.35)',
                  pointerEvents: 'none',
                }}
              />
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: 18, display: 'flex', flexDirection: 'column', gap: 8 }}>
                <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 23, fontWeight: 700 }}>{c.name}</div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {c.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 11, fontWeight: 700,
                        background: 'rgba(255,255,255,0.22)',
                        backdropFilter: 'blur(6px)',
                        WebkitBackdropFilter: 'blur(6px)',
                        borderRadius: 999, padding: '4px 10px', color: '#fff',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div style={{ fontSize: 13.5, fontWeight: 700, color: '#ffa8c9' }}>Meet {c.name} →</div>
              </div>
            </Link>
          ))}

          {/* 40+ more coming placeholder */}
          <div
            style={{
              display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
              gap: 12, border: '2px dashed #f0a3c2', borderRadius: 18,
              background: 'rgba(255,255,255,0.6)', minHeight: 320, padding: 24, textAlign: 'center',
            }}
          >
            <div style={{ fontSize: 28 }}>💗</div>
            <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 600, color: '#2b0f1d' }}>40+ more coming</div>
            <div style={{ fontSize: 13.5, color: '#8a6274', lineHeight: 1.5 }}>
              The character universe is growing. New AI companions added regularly.
            </div>
            <a
              href={SECRET_DESIRES_AFFILIATE_URL}
              rel="sponsored noopener nofollow"
              target="_blank"
              style={{ fontSize: 13.5, fontWeight: 700, color: '#d6336c', textDecoration: 'none' }}
            >
              Create your own →
            </a>
          </div>
        </div>
      </section>

      {/* ─────────── TRENDING PLATFORMS ─────────── */}
      <section
        id="trending"
        style={{
          position: 'relative',
          background: 'radial-gradient(800px 420px at 50% 0%,rgba(230,73,128,0.12),transparent 70%)',
          maxWidth: 1200, margin: '0 auto', padding: '80px 40px 0',
        }}
      >
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, margin: '0 0 8px', fontWeight: 700, color: '#2b0f1d' }}>
          Trending AI Companion Platforms
        </h2>
        <p style={{ color: '#8a6274', fontSize: 15, margin: '0 0 28px', maxWidth: '70ch' }}>
          Ranked by our editorial framework: conversation, memory, customization, visual
          quality, voice, video, usability and value. Scores publish after hands-on testing.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {PLATFORMS.map((p) => (
            <div
              key={p.rank}
              style={{
                display: 'grid',
                gridTemplateColumns: '56px minmax(140px,1fr) minmax(160px,2fr) auto',
                gap: 18, alignItems: 'center',
                background: '#fff', border: '1px solid #f6d3e1', borderRadius: 16, padding: '20px 24px',
              }}
            >
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 26, fontWeight: 700, color: '#e64980' }}>#{p.rank}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontWeight: 800, fontSize: 17, color: '#2b0f1d' }}>{p.name}</div>
                <div style={{ fontSize: 12, color: '#a3818f' }}>{p.rating}</div>
              </div>
              <div style={{ fontSize: 14, color: '#6f4a5d', lineHeight: 1.5 }}>{p.bestFor}</div>
              <a
                href={p.href}
                rel={p.rank === 1 ? 'sponsored noopener nofollow' : undefined}
                target={p.rank === 1 ? '_blank' : undefined}
                style={{
                  justifySelf: 'end',
                  fontSize: 13.5, fontWeight: 700, color: '#fff',
                  background: p.btnBg,
                  borderRadius: 999, padding: '10px 20px', whiteSpace: 'nowrap',
                  textDecoration: 'none',
                }}
              >
                {p.cta}
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────── LAB ─────────── */}
      <section id="lab" style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '80px 40px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, margin: 0, fontWeight: 700, color: '#2b0f1d' }}>
            What We&apos;re Testing This Week
          </h2>
          <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#d6336c' }}>
            AICompanionPartner Lab
          </span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(230px,1fr))', gap: 16 }}>
          {LAB_TESTS.map((t) => (
            <div
              key={t.name}
              style={{
                display: 'flex', flexDirection: 'column', gap: 10,
                background: '#fff', border: '1px solid #f6d3e1', borderRadius: 16, padding: 24,
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: t.statusColor }}>
                {t.status}
              </div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 19, fontWeight: 600, color: '#2b0f1d', lineHeight: 1.3 }}>
                {t.name}
              </div>
              <div style={{ fontSize: 13, color: '#8a6274', lineHeight: 1.55 }}>{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─────────── WHY CARDS ─────────── */}
      <section id="reviews" style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '80px 40px 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(260px,1fr))', gap: 16 }}>
          <WhyCard icon="🔍" title="Discover">
            Find AI companions and characters across every personality, style and platform.
          </WhyCard>
          <WhyCard icon="⚖️" title="Compare">
            See how the leading platforms differ on images, video, voice, memory and pricing.
          </WhyCard>
          <WhyCard icon="💞" title="Experience">
            Explore original AI-generated characters and visual content, then meet them live.
          </WhyCard>
        </div>
      </section>

      {/* ─────────── LATEST FROM THE JOURNAL ─────────── */}
      <section id="journal" style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '80px 40px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 20, flexWrap: 'wrap', marginBottom: 24 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#d6336c', marginBottom: 6 }}>
              Journal
            </div>
            <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, margin: 0, fontWeight: 700, color: '#2b0f1d' }}>
              Latest guides &amp; explainers
            </h2>
          </div>
          <Link href="/blog/" style={{ fontSize: 14, fontWeight: 700, color: '#a61e4d', textDecoration: 'none' }}>
            All articles →
          </Link>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(280px,1fr))', gap: 16 }}>
          {posts.slice(0, 3).map((p) => (
            <Link
              key={p.slug}
              href={`/blog/${p.slug}/`}
              style={{
                display: 'flex', flexDirection: 'column', gap: 8,
                background: '#fff', border: '1px solid #f6d3e1', borderRadius: 16,
                padding: 22, textDecoration: 'none', color: '#331523',
                boxShadow: '0 2px 10px rgba(214,51,108,0.05)',
              }}
            >
              <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#d6336c' }}>
                {p.category}
              </div>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 20, fontWeight: 700, color: '#2b0f1d', lineHeight: 1.3 }}>
                {p.title}
              </div>
              <div style={{ fontSize: 14, color: '#6f4a5d', lineHeight: 1.6 }}>
                {p.description}
              </div>
              <div style={{ fontSize: 12.5, color: '#8a6274', display: 'flex', gap: 8, marginTop: 4 }}>
                <span>{p.readMin} min read</span>
              </div>
              <div style={{ fontSize: 13.5, color: '#d6336c', fontWeight: 700, marginTop: 4 }}>Read →</div>
            </Link>
          ))}
        </div>
      </section>

      {/* ─────────── FAQ ─────────── */}
      <section id="faq" style={{ position: 'relative', maxWidth: 900, margin: '0 auto', padding: '80px 40px 0' }}>
        <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 34, margin: '0 0 8px', fontWeight: 700, color: '#2b0f1d' }}>
          What Is AICompanionPartner?
        </h2>
        <p style={{ color: '#6f4a5d', fontSize: 15, lineHeight: 1.7, margin: '0 0 28px' }}>
          AICompanionPartner is an 18+ discovery platform for AI girlfriends, AI boyfriends and
          virtual companions. We publish original AI-generated characters with full
          galleries, hands-on platform reviews, side-by-side comparisons, and lab tests —
          so you can find the companion experience that fits you. Some links are affiliate
          links; our ratings are intended to remain independent of compensation.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {FAQS.map((f) => (
            <details
              key={f.q}
              style={{ background: '#fff', border: '1px solid #f6d3e1', borderRadius: 14, padding: '18px 22px' }}
            >
              <summary style={{ fontWeight: 700, fontSize: 15, cursor: 'pointer', color: '#2b0f1d', listStyle: 'none' }}>
                {f.q}
              </summary>
              <p style={{ margin: '12px 0 2px', fontSize: 14, color: '#6f4a5d', lineHeight: 1.65 }}>{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* FAQ JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQS.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          }),
        }}
      />

      {/* Organization + WebSite JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: SITE.name,
            url: SITE.url,
            description: SITE.descriptionLong,
          }),
        }}
      />

      {/* ─────────── FINAL CTA ─────────── */}
      <section style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '80px 40px 90px' }}>
        <div
          style={{
            textAlign: 'center',
            background: 'linear-gradient(150deg,#f0417e,#ad1457 55%,#7c1236)',
            borderRadius: 24, padding: '64px 40px',
            boxShadow: '0 24px 60px rgba(214,51,108,0.35)',
          }}
        >
          <h2 style={{ fontFamily: 'Playfair Display, serif', fontSize: 'clamp(30px,4vw,44px)', margin: '0 0 14px', fontWeight: 700, color: '#fff' }}>
            Ready to Meet Your AI Companion?
          </h2>
          <p style={{ color: '#ffd6e6', fontSize: 16, margin: '0 0 30px' }}>
            Explore customizable AI companions and discover the platform that fits you.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={SECRET_DESIRES_AFFILIATE_URL}
              rel="sponsored noopener nofollow"
              target="_blank"
              style={{
                background: '#fff', color: '#c2255c', borderRadius: 999,
                padding: '16px 36px', fontSize: 16, fontWeight: 800, textDecoration: 'none',
              }}
            >
              Try Secret Desires →
            </a>
            <Link
              href="#characters"
              style={{
                color: '#fff',
                border: '1.5px solid rgba(255,255,255,0.55)',
                borderRadius: 999, padding: '16px 36px', fontSize: 16, fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              Explore AI Characters →
            </Link>
          </div>
          <div style={{ fontSize: 12, color: '#ffc2da', marginTop: 18 }}>18+ only.</div>
        </div>
      </section>

      <Footer variant="full" />
    </>
  )
}

function WhyCard({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div
      style={{
        display: 'flex', flexDirection: 'column', gap: 10,
        background: 'linear-gradient(160deg,#fff,#fde8f0)',
        border: '1px solid #f6d3e1', borderRadius: 16, padding: 28,
      }}
    >
      <div style={{ fontSize: 24 }}>{icon}</div>
      <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 22, fontWeight: 700, color: '#2b0f1d' }}>{title}</div>
      <div style={{ fontSize: 14, color: '#6f4a5d', lineHeight: 1.6 }}>{children}</div>
    </div>
  )
}
