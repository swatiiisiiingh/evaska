'use client'

import React from 'react'
import Link from 'next/link'

const values = [
  { icon: '💡', title: 'Creative Vision', desc: 'Every event is a blank canvas. We bring bold, original ideas that make your celebration truly one of a kind.' },
  { icon: '🤝', title: 'Personal Touch', desc: 'We listen first. Your story, your style, your dreams — we build everything around what matters most to you.' },
  { icon: '⭐', title: 'Excellence Always', desc: 'From the first call to the final farewell, we hold ourselves to the highest standard — every single time.' },
  { icon: '🕐', title: 'Always On Time', desc: 'We respect your time and your guests. Flawless execution and punctuality are non-negotiable for us.' },
]

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#FFF0EC', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{
        backgroundColor: '#2C1A1A',
        padding: '6rem 7rem 5rem',
        position: 'relative',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '4rem',
        alignItems: 'center',
      }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(232,71,42,0.08)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '30%', width: '250px', height: '250px', borderRadius: '50%', background: 'rgba(249,197,176,0.05)' }} />

        <div style={{ zIndex: 2 }}>
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#F9C5B0', fontWeight: 600 }}>Our Story</span>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', color: 'white', fontWeight: 800, margin: '0.75rem 0 1.25rem', lineHeight: 1.15 }}>
            We Plan Events<br />With Heart &amp;<br />Soul
          </h1>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.9, margin: '0 0 2rem', maxWidth: '420px' }}>
            Born out of a passion for celebrations, Evaska was founded in 2026 to bring joy, creativity, and seamless execution to every event — big or small, intimate or grand.
          </p>
          <Link href="/events" style={{ display: 'inline-block', backgroundColor: '#E8472A', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, padding: '0.9rem 2.2rem', borderRadius: '9999px', textDecoration: 'none', letterSpacing: '0.08em', boxShadow: '0 4px 20px rgba(232,71,42,0.35)' }}>
            SEE OUR EVENTS →
          </Link>
        </div>

        <div style={{ zIndex: 2, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
          {[
            { value: '50+', label: 'Events Planned', icon: '🎪' },
            { value: 'Growing', label: 'Years & Expanding', icon: '⭐' },
            { value: '98%', label: 'Client Satisfaction', icon: '❤️' },
            { value: '10+', label: 'Cities Covered', icon: '📍' },
          ].map((stat, i) => (
            <div key={i} style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.25rem', padding: '1.5rem' }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
              <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.75rem', color: '#F9C5B0', fontWeight: 800, margin: 0, lineHeight: 1 }}>{stat.value}</p>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)', margin: '0.35rem 0 0' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div style={{ padding: '5rem 7rem' }}>
        <div style={{ textAlign: 'center' as const, marginBottom: '3.5rem' }}>
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#E8472A', fontWeight: 600 }}>What We Stand For</span>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: '#C0392B', fontWeight: 800, margin: '0.5rem 0 0' }}>Our Core Values</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
          {values.map((v, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '2rem 1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1.5px solid rgba(232,71,42,0.08)', textAlign: 'center' as const }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{v.icon}</div>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 0.75rem' }}>{v.title}</h3>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', color: '#7a5c5c', lineHeight: 1.7, margin: 0 }}>{v.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Banner */}
      <div style={{ backgroundColor: '#2C1A1A', margin: '0 7rem 5rem', borderRadius: '2rem', padding: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-40px', right: '10%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(232,71,42,0.12)' }} />
        <div style={{ zIndex: 2 }}>
          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', color: 'white', fontWeight: 800, margin: '0 0 0.75rem' }}>Ready to plan your perfect event?</h3>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>Let&apos;s create something unforgettable together.</p>
        </div>
        <div style={{ display: 'flex', gap: '1rem', zIndex: 2, flexShrink: 0 }}>
          <Link href="/events" style={{ display: 'inline-block', backgroundColor: '#E8472A', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, padding: '0.9rem 2rem', borderRadius: '9999px', textDecoration: 'none', letterSpacing: '0.08em', whiteSpace: 'nowrap' as const }}>BROWSE EVENTS</Link>
          <Link href="/contact" style={{ display: 'inline-block', border: '1.5px solid rgba(255,255,255,0.3)', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, padding: '0.9rem 2rem', borderRadius: '9999px', textDecoration: 'none', letterSpacing: '0.08em', whiteSpace: 'nowrap' as const }}>CONTACT US</Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          div[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
        }
        @media (max-width: 768px) {
          div[style*="6rem 7rem 5rem"] { padding: 3rem 1.5rem !important; grid-template-columns: 1fr !important; }
          div[style*="5rem 7rem"] { padding: 3rem 1.5rem !important; }
          div[style*="0 7rem 5rem"] { margin: 0 1.5rem 3rem !important; flex-direction: column !important; }
        }
      `}</style>
    </div>
  )
}
