'use client'

import React from 'react'
import Link from 'next/link'

const footerLinks = {
  Company: ['About Us', 'Our Team', 'Careers', 'Press'],
  Services: ['Weddings', 'Birthdays', 'Corporate', 'Bachelorette'],
  Support: ['Contact Us', 'FAQ', 'Privacy Policy', 'Terms of Service'],
}

const socialLinks = [
  { label: 'IG', name: 'Instagram' },
  { label: 'FB', name: 'Facebook' },
  { label: 'PT', name: 'Pinterest' },
  { label: 'LI', name: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: '#2C1A1A',
      color: 'white',
      padding: '5rem 7rem 2rem',
    }}>

      {/* Top Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '3rem',
        paddingBottom: '4rem',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
      }}>

        {/* Brand column */}
        <div style={{
          display: 'flex',
          flexDirection: 'column' as const,
          gap: '1.25rem',
        }}>
          <span style={{
            fontFamily: '"Dancing Script", cursive',
            fontSize: '2.5rem',
            color: '#F9C5B0',
            fontWeight: 700,
            lineHeight: 1,
          }}>
            Evaska
          </span>
          <p style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.875rem',
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.8,
            margin: 0,
            maxWidth: '280px',
          }}>
            Where every event comes alive. We plan, design, and execute
            unforgettable experiences for every occasion.
          </p>

          {/* Social icons */}
          <div style={{
            display: 'flex',
            gap: '0.75rem',
            marginTop: '0.5rem',
          }}>
            {socialLinks.map((s) => (
              <button
                key={s.name}
                onClick={() => {}}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: '0.65rem',
                  fontWeight: 700,
                  fontFamily: '"DM Sans", sans-serif',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#E8472A'
                  e.currentTarget.style.borderColor = '#E8472A'
                  e.currentTarget.style.color = 'white'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)'
                }}
              >
                {s.label}
              </button>
            ))}
          </div>

          {/* Newsletter */}
          <div style={{
            display: 'flex',
            marginTop: '0.5rem',
            borderRadius: '9999px',
            overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.15)',
            maxWidth: '300px',
          }}>
            <input
              type="email"
              placeholder="Your email address"
              style={{
                flex: 1,
                padding: '0.75rem 1.25rem',
                background: 'transparent',
                border: 'none',
                outline: 'none',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.8rem',
                color: 'white',
              }}
            />
            <button
              style={{
                padding: '0.75rem 1.25rem',
                backgroundColor: '#E8472A',
                border: 'none',
                cursor: 'pointer',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: 'white',
                letterSpacing: '0.05em',
                transition: 'background 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#C0392B'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#E8472A'
              }}
            >
              JOIN
            </button>
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(footerLinks).map(([heading, links]) => (
          <div key={heading} style={{
            display: 'flex',
            flexDirection: 'column' as const,
            gap: '1rem',
          }}>
            <h4 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '1rem',
              color: '#F9C5B0',
              fontWeight: 700,
              margin: 0,
              marginBottom: '0.25rem',
            }}>
              {heading}
            </h4>
            {links.map((link) => (
              <Link
                key={link}
                href="/"
                style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.85rem',
                  color: 'rgba(255,255,255,0.5)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#F9C5B0'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
                }}
              >
                {link}
              </Link>
            ))}
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        paddingTop: '2rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap' as const,
        gap: '1rem',
      }}>
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.8rem',
          color: 'rgba(255,255,255,0.3)',
          margin: 0,
        }}>
          © 2026 Evaska. All rights reserved. Made with ❤️
        </p>
        <p style={{
          fontFamily: '"Dancing Script", cursive',
          fontSize: '1.1rem',
          color: 'rgba(249,197,176,0.4)',
          margin: 0,
        }}>
          Where Every Event Comes Alive
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          footer {
            padding: 3rem 1.5rem 2rem !important;
          }
          div[style*="gridTemplateColumns: '2fr 1fr 1fr 1fr'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  )
}