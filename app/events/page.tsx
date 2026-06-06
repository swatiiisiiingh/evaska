'use client'

import React, { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const categories = ['All', 'Concert', 'Party', 'Festival', 'Wedding', 'Birthday', 'Corporate', 'Offer', 'Other']

export default function EventsPage() {
  const { events, currentUser, addRsvp, rsvps } = useApp()
  const [activeCategory, setActiveCategory] = useState('All')
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const router = useRouter()

  const filtered = events.filter(e =>
    activeCategory === 'All' || e.category === activeCategory
  )

  const handleRsvp = (eventId: number) => {
    if (!currentUser) {
      toast.error('Please login to RSVP!')
      router.push('/login')
      return
    }
    const already = rsvps.find(r => r.userId === currentUser.id && r.eventId === eventId)
    if (already) {
      toast('Already booked!', { icon: '🎟️' })
      return
    }
    addRsvp({ userId: currentUser.id, eventId })
    toast.success('Booking confirmed! 🎉')
  }

  return (
    <div style={{ backgroundColor: '#FFF0EC', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ backgroundColor: '#2C1A1A', padding: '5rem 7rem 4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(232,71,42,0.08)' }} />
        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#F9C5B0', fontWeight: 600 }}>Evaska Presents</span>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: 'white', fontWeight: 800, margin: '0.5rem 0 1rem', lineHeight: 1.15 }}>Upcoming Events</h1>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '1rem', color: 'rgba(255,255,255,0.5)', margin: 0, maxWidth: '480px', lineHeight: 1.7 }}>
          Handpicked events, open parties, seasonal offers and more — curated exclusively by Evaska.
        </p>
      </div>

      {/* Category Filter */}
      <div style={{ padding: '1.5rem 7rem', backgroundColor: 'white', position: 'sticky', top: '72px', zIndex: 40, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' as const, alignItems: 'center' }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat)} style={{
            padding: '0.55rem 1.25rem', borderRadius: '9999px',
            border: activeCategory === cat ? 'none' : '1.5px solid rgba(232,71,42,0.25)',
            backgroundColor: activeCategory === cat ? '#E8472A' : 'transparent',
            color: activeCategory === cat ? 'white' : '#7a5c5c',
            fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.25s',
          }}>{cat}</button>
        ))}
      </div>

      {/* Events Grid */}
      <div style={{ padding: '3rem 7rem 6rem', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.75rem' }}>
        {filtered.length === 0 && (
          <div style={{ gridColumn: '1/-1', textAlign: 'center' as const, padding: '5rem', fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: '#C0392B' }}>
            No events in this category yet 🎭
          </div>
        )}
        {filtered.map(event => {
          const alreadyRsvpd = rsvps.find(r => r.userId === currentUser?.id && r.eventId === event.id)
          return (
            <div key={event.id}
              onMouseEnter={() => setHoveredCard(event.id)}
              onMouseLeave={() => setHoveredCard(null)}
              style={{
                backgroundColor: 'white', borderRadius: '1.5rem', overflow: 'hidden',
                boxShadow: hoveredCard === event.id ? '0 20px 60px rgba(232,71,42,0.18)' : '0 4px 20px rgba(0,0,0,0.06)',
                transform: hoveredCard === event.id ? 'translateY(-6px)' : 'translateY(0)',
                transition: 'all 0.3s', cursor: 'pointer',
                border: hoveredCard === event.id ? '1.5px solid rgba(232,71,42,0.2)' : '1.5px solid transparent',
              }}>
              <div style={{ height: '200px', background: event.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4.5rem', position: 'relative' }}>
                {event.emoji}
                <span style={{ position: 'absolute', top: '1rem', right: '1rem', backgroundColor: event.tagColor, color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.65rem', fontWeight: 600, padding: '0.3rem 0.8rem', borderRadius: '9999px' }}>{event.tag}</span>
                <span style={{ position: 'absolute', bottom: '1rem', left: '1rem', backgroundColor: 'rgba(0,0,0,0.3)', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.65rem', fontWeight: 600, padding: '0.25rem 0.75rem', borderRadius: '9999px', backdropFilter: 'blur(4px)' }}>by Evaska</span>
              </div>
              <div style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A1A', fontWeight: 700, margin: 0, lineHeight: 1.3 }}>{event.title}</h3>
                  <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: '#E8472A', fontWeight: 700, flexShrink: 0, marginLeft: '0.5rem' }}>{event.price}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.35rem', marginBottom: '1.25rem' }}>
                  <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: '#7a5c5c' }}>📅 {event.date} at {event.time}</span>
                  <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: '#7a5c5c' }}>📍 {event.location}</span>
                </div>
                <div style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                    <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', color: '#7a5c5c' }}>Spots left</span>
                    <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', color: '#E8472A', fontWeight: 600 }}>{event.spots}/{event.totalSpots}</span>
                  </div>
                  <div style={{ height: '4px', backgroundColor: 'rgba(232,71,42,0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${(event.spots / event.totalSpots) * 100}%`, backgroundColor: '#E8472A', borderRadius: '9999px' }} />
                  </div>
                </div>
                <button onClick={() => handleRsvp(event.id)} style={{
                  width: '100%', padding: '0.85rem', borderRadius: '9999px',
                  border: alreadyRsvpd ? 'none' : '1.5px solid #E8472A',
                  backgroundColor: alreadyRsvpd ? 'rgba(39,174,96,0.1)' : 'transparent',
                  color: alreadyRsvpd ? '#27AE60' : '#E8472A',
                  fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600,
                  letterSpacing: '0.08em', cursor: 'pointer', transition: 'all 0.3s', textTransform: 'uppercase' as const,
                }}
                  onMouseEnter={(e) => { if (!alreadyRsvpd) { e.currentTarget.style.backgroundColor = '#E8472A'; e.currentTarget.style.color = 'white' } }}
                  onMouseLeave={(e) => { if (!alreadyRsvpd) { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#E8472A' } }}
                >
                  {alreadyRsvpd ? '✅ Booked' : 'Book Now'}
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Plan custom CTA */}
      <div style={{ margin: '0 7rem 5rem', backgroundColor: '#2C1A1A', borderRadius: '2rem', padding: '3rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-40px', right: '5%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(232,71,42,0.12)' }} />
        <div style={{ zIndex: 2 }}>
          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.75rem', color: 'white', fontWeight: 800, margin: '0 0 0.5rem' }}>Want a custom event? 💍</h3>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>Weddings, birthdays, corporate — we plan it all, just for you.</p>
        </div>
        <a href="/plan-event" style={{ display: 'inline-block', backgroundColor: '#E8472A', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', fontWeight: 600, padding: '1rem 2.5rem', borderRadius: '9999px', textDecoration: 'none', letterSpacing: '0.08em', whiteSpace: 'nowrap' as const, boxShadow: '0 4px 20px rgba(232,71,42,0.35)', flexShrink: 0, zIndex: 2 }}>
          PLAN MY EVENT →
        </a>
      </div>

      <style>{`
        @media (max-width: 1024px) { div[style*="repeat(3, 1fr)"] { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 768px) { div[style*="repeat(3, 1fr)"] { grid-template-columns: 1fr !important; padding: 2rem 1.5rem !important; } }
      `}</style>
    </div>
  )
}
