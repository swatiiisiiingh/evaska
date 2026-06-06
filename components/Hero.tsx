'use client'

import React from 'react'
import Link from 'next/link'

const socialLinks = [
  { label: 'IG', name: 'instagram' },
  { label: 'FB', name: 'facebook' },
  { label: 'PT', name: 'pinterest' },
  { label: 'LI', name: 'linkedin' },
]

export default function Hero() {
  return (
    <section style={{
      backgroundColor: '#FFF0EC',
      height: '100vh',
      display: 'grid',
      gridTemplateColumns: '55% 45%',
      overflow: 'hidden',
      position: 'relative',
    }}>

      {/* LEFT */}
      <div style={{
        display: 'flex',
        flexDirection: 'column' as const,
        justifyContent: 'center',
        padding: '0 3rem 0 7rem',
        gap: '1.8rem',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', color: '#2C1A1A', letterSpacing: '0.1em', textTransform: 'uppercase' as const, fontWeight: 500 }}>
            Follow Us
          </span>
          {socialLinks.map((s) => (
            <button key={s.name} onClick={() => {}} style={{
              width: '30px', height: '30px', borderRadius: '50%',
              border: '1px solid rgba(44,26,26,0.25)', background: 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', color: '#2C1A1A', fontSize: '0.65rem',
              fontWeight: 700, fontFamily: '"DM Sans", sans-serif', transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#E8472A'
                e.currentTarget.style.borderColor = '#E8472A'
                e.currentTarget.style.color = 'white'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.borderColor = 'rgba(44,26,26,0.25)'
                e.currentTarget.style.color = '#2C1A1A'
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(2.8rem, 5vw, 4.5rem)',
          color: '#C0392B', lineHeight: 1.12, fontWeight: 800, margin: 0,
        }}>
          Plan The Perfect<br />Event With Us
        </h1>

        <p style={{
          fontFamily: '"DM Sans", sans-serif', fontSize: '0.95rem',
          color: '#7a5c5c', lineHeight: 1.9, maxWidth: '400px', margin: 0,
        }}>
          From intimate gatherings to grand celebrations — Evaska helps you
          discover, create, and manage every event seamlessly in one place.
        </p>

        <div>
          <Link href="/events" style={{
            display: 'inline-block',
            border: '1.5px solid #E8472A', color: '#E8472A',
            fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem',
            fontWeight: 500, letterSpacing: '0.1em', padding: '0.9rem 2.2rem',
            borderRadius: '9999px', textDecoration: 'none',
            textTransform: 'uppercase' as const, transition: 'all 0.3s',
          }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#E8472A'
              e.currentTarget.style.color = 'white'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = '#E8472A'
            }}
          >
            Book A Consultation
          </Link>
        </div>
      </div>

      {/* RIGHT — real photo, no circle */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '100vh',
      }}>
        <img
          src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&q=80"
          alt="Outdoor party setup"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
          }}
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(249,197,176,0.2), transparent)',
        }} />
      </div>

      <style>{`
        @media (max-width: 768px) {
          section { grid-template-columns: 1fr !important; height: auto !important; }
          section > div:first-child { padding: 4rem 2rem !important; min-height: 60vh; }
          section > div:last-child { min-height: 50vh !important; }
        }
      `}</style>
    </section>
  )
}
