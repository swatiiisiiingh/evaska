'use client'

import React from 'react'
import Link from 'next/link'

export default function About() {
  return (
    <section style={{
      backgroundColor: '#FFF0EC',
      padding: '6rem 7rem',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '5rem',
      alignItems: 'center',
    }}>

      {/* ── LEFT — Image ── */}
      <div style={{ position: 'relative' }}>

        {/* Main image box */}
        <div style={{
          width: '100%',
          aspectRatio: '3/4',
          borderRadius: '2rem',
          background: 'linear-gradient(160deg, #F9C5B0 0%, #f0a090 60%, #e07060 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(232,71,42,0.2)',
        }}>
          {/* Placeholder */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👩‍💼</div>
            <p style={{
              fontFamily: '"Dancing Script", cursive',
              fontSize: '1.3rem',
              color: 'white',
              opacity: 0.85,
              margin: 0,
            }}>
              Your photo here
            </p>
          </div>

          {/* Decorative circle top right */}
          <div style={{
            position: 'absolute',
            top: '-20px',
            right: '-20px',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.15)',
          }} />
        </div>

        {/* Floating stats card */}
        <div style={{
          position: 'absolute',
          bottom: '-24px',
          right: '-24px',
          backgroundColor: 'white',
          borderRadius: '1.25rem',
          padding: '1.25rem 1.75rem',
          boxShadow: '0 12px 40px rgba(232,71,42,0.15)',
          display: 'flex',
          flexDirection: 'column' as const,
          gap: '0.25rem',
          minWidth: '160px',
        }}>
          <span style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '2rem',
            color: '#E8472A',
            fontWeight: 800,
            lineHeight: 1,
          }}>
            500+
          </span>
          <span style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.8rem',
            color: '#7a5c5c',
            fontWeight: 500,
          }}>
            Events Planned
          </span>
        </div>

        {/* Floating badge top left */}
        <div style={{
          position: 'absolute',
          top: '24px',
          left: '-20px',
          backgroundColor: '#E8472A',
          borderRadius: '9999px',
          padding: '0.5rem 1.25rem',
          boxShadow: '0 4px 16px rgba(232,71,42,0.35)',
        }}>
          <span style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.75rem',
            color: 'white',
            fontWeight: 600,
            letterSpacing: '0.05em',
          }}>
            ✨ Est. 2020
          </span>
        </div>
      </div>

      {/* ── RIGHT — Text ── */}
      <div style={{
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1.5rem',
      }}>

        {/* Label */}
        <span style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase' as const,
          color: '#E8472A',
          fontWeight: 600,
        }}>
          About Us
        </span>

        {/* Heading */}
        <h2 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(2rem, 3.5vw, 3rem)',
          color: '#C0392B',
          lineHeight: 1.2,
          fontWeight: 800,
          margin: 0,
        }}>
          Meet Our Event<br />Planner &amp;<br />Professional Team
        </h2>

        {/* Body */}
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.95rem',
          color: '#7a5c5c',
          lineHeight: 1.9,
          margin: 0,
          maxWidth: '420px',
        }}>
          At Evaska, we believe every event tells a story. Our passionate team
          of planners and decorators bring your vision to life — from the first
          consultation to the final farewell. No detail is too small, no dream
          too big.
        </p>

        {/* Signature */}
        <div style={{ marginTop: '0.5rem' }}>
          <p style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: '1.8rem',
            color: '#C0392B',
            margin: 0,
          }}>
            With Love, Evaska
          </p>
        </div>

        {/* Stats row */}
        <div style={{
          display: 'flex',
          gap: '2.5rem',
          marginTop: '0.5rem',
          paddingTop: '1.5rem',
          borderTop: '1px solid rgba(232,71,42,0.15)',
        }}>
          {[
            { number: '500+', label: 'Events Done' },
            { number: '12+', label: 'Years Exp.' },
            { number: '98%', label: 'Happy Clients' },
          ].map((stat, i) => (
            <div key={i}>
              <p style={{
                fontFamily: '"Playfair Display", serif',
                fontSize: '1.75rem',
                color: '#E8472A',
                fontWeight: 800,
                margin: 0,
                lineHeight: 1,
              }}>
                {stat.number}
              </p>
              <p style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.75rem',
                color: '#7a5c5c',
                margin: '0.25rem 0 0',
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ marginTop: '0.5rem' }}>
          <Link
            href="/about"
            style={{
              display: 'inline-block',
              backgroundColor: '#E8472A',
              color: 'white',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.8rem',
              fontWeight: 500,
              letterSpacing: '0.1em',
              padding: '0.9rem 2.2rem',
              borderRadius: '9999px',
              textDecoration: 'none',
              textTransform: 'uppercase' as const,
              transition: 'all 0.3s',
              boxShadow: '0 4px 16px rgba(232,71,42,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#C0392B'
              e.currentTarget.style.transform = 'translateY(-2px)'
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(232,71,42,0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#E8472A'
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 16px rgba(232,71,42,0.3)'
            }}
          >
            Learn More About Us
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section {
            grid-template-columns: 1fr !important;
            padding: 3rem 1.5rem !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  )
}