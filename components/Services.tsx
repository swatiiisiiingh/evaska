'use client'

import React from 'react'

const services = [
  {
    emoji: '💍',
    title: 'Weddings',
    desc: 'Elegant ceremonies & receptions',
  },
  {
    emoji: '🎂',
    title: 'Birthdays',
    desc: 'Sweet tables & celebrations',
  },
  {
    emoji: '🎊',
    title: 'Corporate',
    desc: 'Conferences & team events',
  },
  {
    emoji: '🪄',
    title: 'Bachelorette',
    desc: 'Fun & unforgettable nights',
  },
  {
    emoji: '🎆',
    title: 'Fireworks',
    desc: 'Dry ice & grand finales',
  },
]

export default function Services() {
  return (
    <section style={{
      backgroundColor: '#FFF0EC',
      padding: '5rem 7rem',
    }}>

      <h2 style={{
        fontFamily: '"Playfair Display", serif',
        fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
        color: '#2C1A1A',
        textAlign: 'center' as const,
        fontWeight: 700,
        marginBottom: '3.5rem',
      }}>
        We Have You Covered
      </h2>

      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        gap: '2rem',
        flexWrap: 'wrap' as const,
      }}>
        {services.map((service, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              flexDirection: 'column' as const,
              alignItems: 'center',
              gap: '1rem',
              cursor: 'pointer',
              transition: 'transform 0.3s',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)'
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
            }}
          >
            <div
              style={{
                width: '130px',
                height: '130px',
                borderRadius: '50%',
                backgroundColor: 'white',
                boxShadow: '0 4px 20px rgba(232,71,42,0.12)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2.8rem',
                border: '2px solid rgba(232,71,42,0.08)',
                transition: 'all 0.3s',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = '#E8472A'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 28px rgba(232,71,42,0.25)'
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(232,71,42,0.08)'
                ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 20px rgba(232,71,42,0.12)'
              }}
            >
              {service.emoji}
            </div>

            <p style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.9rem',
              fontWeight: 600,
              color: '#2C1A1A',
              margin: 0,
              textAlign: 'center' as const,
            }}>
              {service.title}
            </p>

            <p style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.75rem',
              color: '#7a5c5c',
              margin: 0,
              textAlign: 'center' as const,
              maxWidth: '110px',
              lineHeight: 1.5,
            }}>
              {service.desc}
            </p>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: '4rem',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(232,71,42,0.2), transparent)',
      }} />

      <style>{`
        @media (max-width: 768px) {
          section { padding: 3rem 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}