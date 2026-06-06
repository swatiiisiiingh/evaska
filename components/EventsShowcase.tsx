'use client'

import React, { useState } from 'react'
import Link from 'next/link'

const events = [
  {
    id: 1,
    number: '01',
    title: 'Happy Birthday Decoration',
    category: 'Birthday',
    desc: 'Balloons, neon signs, and confetti — birthday setups that steal the spotlight.',
    color: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD700 100%)',
    emoji: '🎂',
    tag: 'Most Popular',
  },
  {
    id: 2,
    number: '02',
    title: 'Wedding Ceremony Setup',
    category: 'Wedding',
    desc: 'Elegant floral arches, fairy lights, and bespoke décor for your perfect day.',
    color: 'linear-gradient(135deg, #F9C5B0 0%, #e8a090 50%, #d4756a 100%)',
    emoji: '💍',
    tag: 'Premium',
  },
  {
    id: 3,
    number: '03',
    title: 'Corporate Gala Night',
    category: 'Corporate',
    desc: 'Sophisticated setups for conferences, product launches and award nights.',
    color: 'linear-gradient(135deg, #C0392B 0%, #E8472A 50%, #F9C5B0 100%)',
    emoji: '🏆',
    tag: 'New',
  },
]

export default function EventsShowcase() {
  const [hovered, setHovered] = useState<number | null>(null)

  return (
    <section style={{
      backgroundColor: '#FDF6F0',
      padding: '6rem 7rem',
    }}>

      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        marginBottom: '3.5rem',
      }}>
        <div>
          <span style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            color: '#E8472A',
            fontWeight: 600,
          }}>
            Our Work
          </span>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(2rem, 3.5vw, 3rem)',
            color: '#C0392B',
            lineHeight: 1.2,
            fontWeight: 800,
            margin: '0.5rem 0 0',
          }}>
            Events We Have<br />Brought To Life
          </h2>
        </div>

        <Link
          href="/events"
          style={{
            display: 'inline-block',
            border: '1.5px solid #E8472A',
            color: '#E8472A',
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.8rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            padding: '0.8rem 2rem',
            borderRadius: '9999px',
            textDecoration: 'none',
            textTransform: 'uppercase' as const,
            transition: 'all 0.3s',
            whiteSpace: 'nowrap' as const,
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
          View All Events
        </Link>
      </div>

      {/* Event Cards */}
      <div style={{
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '1.5rem',
      }}>
        {events.map((event) => (
          <div
            key={event.id}
            onMouseEnter={() => setHovered(event.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr auto',
              alignItems: 'center',
              gap: '2rem',
              backgroundColor: 'white',
              borderRadius: '1.5rem',
              padding: '2rem 2.5rem',
              boxShadow: hovered === event.id
                ? '0 16px 48px rgba(232,71,42,0.18)'
                : '0 4px 20px rgba(0,0,0,0.06)',
              transition: 'all 0.3s',
              transform: hovered === event.id ? 'translateY(-4px)' : 'translateY(0)',
              cursor: 'pointer',
              border: hovered === event.id
                ? '1.5px solid rgba(232,71,42,0.2)'
                : '1.5px solid transparent',
            }}
          >
            {/* Number */}
            <span style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '3rem',
              color: 'rgba(232,71,42,0.15)',
              fontWeight: 800,
              lineHeight: 1,
            }}>
              {event.number}
            </span>

            {/* Content */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>

              {/* Color swatch */}
              <div style={{
                width: '80px',
                height: '80px',
                borderRadius: '1rem',
                background: event.color,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                flexShrink: 0,
                boxShadow: '0 4px 16px rgba(232,71,42,0.2)',
              }}>
                {event.emoji}
              </div>

              {/* Text */}
              <div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '0.4rem',
                }}>
                  <h3 style={{
                    fontFamily: '"Playfair Display", serif',
                    fontSize: '1.2rem',
                    color: '#2C1A1A',
                    fontWeight: 700,
                    margin: 0,
                  }}>
                    {event.title}
                  </h3>
                  <span style={{
                    backgroundColor: 'rgba(232,71,42,0.1)',
                    color: '#E8472A',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.65rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '9999px',
                    letterSpacing: '0.05em',
                  }}>
                    {event.tag}
                  </span>
                </div>
                <p style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.85rem',
                  color: '#7a5c5c',
                  margin: 0,
                  lineHeight: 1.6,
                }}>
                  {event.desc}
                </p>
              </div>
            </div>

            {/* Arrow */}
            <div style={{
              width: '48px',
              height: '48px',
              borderRadius: '50%',
              backgroundColor: hovered === event.id ? '#E8472A' : 'rgba(232,71,42,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s',
              flexShrink: 0,
            }}>
              <span style={{
                color: hovered === event.id ? 'white' : '#E8472A',
                fontSize: '1.1rem',
                transition: 'all 0.3s',
              }}>
                →
              </span>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          section {
            padding: 3rem 1.5rem !important;
          }
          div[style*="gridTemplateColumns: '80px 1fr auto'"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}