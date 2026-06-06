'use client'

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useApp } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function MyEventsPage() {
  const { currentUser, events, rsvps, cancelRsvp } = useApp()
  const router = useRouter()

  useEffect(() => {
    if (!currentUser) router.push('/login')
  }, [currentUser, router])

  if (!currentUser) return null

  const myRsvpIds = rsvps.filter(r => r.userId === currentUser.id).map(r => r.eventId)
  const myEvents = events.filter(e => myRsvpIds.includes(e.id))
  const myRequests = JSON.parse(localStorage.getItem('evaska_custom_requests') || '[]').filter((r: any) => r.email === currentUser.email)

  const handleCancel = (eventId: number) => {
    cancelRsvp(currentUser.id, eventId)
    toast.success('Booking cancelled.')
  }

  return (
    <div style={{ backgroundColor: '#FFF0EC', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ backgroundColor: '#2C1A1A', padding: '4rem 7rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-60px', right: '8%', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(232,71,42,0.08)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
          <div style={{ width: '52px', height: '52px', borderRadius: '50%', backgroundColor: '#E8472A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem' }}>👤</div>
          <div>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', margin: 0, letterSpacing: '0.1em', textTransform: 'uppercase' as const }}>My Portal</p>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '1rem', color: 'white', margin: 0, fontWeight: 600 }}>Welcome, {currentUser.name}!</p>
          </div>
        </div>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'white', fontWeight: 800, margin: '0 0 0.75rem', lineHeight: 1.15 }}>My Activity</h1>
        <div style={{ display: 'flex', gap: '2rem', marginTop: '1.5rem' }}>
          {[
            { label: 'Bookings', value: myEvents.length },
            { label: 'Custom Requests', value: myRequests.length },
          ].map((s, i) => (
            <div key={i}>
              <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.75rem', color: '#F9C5B0', fontWeight: 800, lineHeight: 1, display: 'block' }}>{s.value}</span>
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.35)', letterSpacing: '0.08em' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: '3rem 7rem 6rem' }}>

        {/* Booked Events */}
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          My Bookings
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', backgroundColor: '#E8472A', color: 'white', padding: '0.2rem 0.65rem', borderRadius: '9999px', fontWeight: 600 }}>{myEvents.length}</span>
        </h2>

        {myEvents.length === 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '3rem', textAlign: 'center' as const, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎟️</div>
            <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 0.5rem' }}>No bookings yet!</p>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', color: '#7a5c5c', margin: '0 0 1.5rem' }}>Browse events and book your spot!</p>
            <Link href="/events" style={{ display: 'inline-block', backgroundColor: '#E8472A', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, padding: '0.85rem 2rem', borderRadius: '9999px', textDecoration: 'none' }}>
              BROWSE EVENTS
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.25rem', marginBottom: '3rem' }}>
            {myEvents.map(event => (
              <div key={event.id} style={{ backgroundColor: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'grid', gridTemplateColumns: '160px 1fr auto', border: '1.5px solid rgba(232,71,42,0.08)' }}>
                <div style={{ background: event.color, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1.5rem' }}>
                  <div style={{ fontSize: '2.5rem' }}>{event.emoji}</div>
                  <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.6rem', color: 'white', fontWeight: 700, letterSpacing: '0.1em', backgroundColor: 'rgba(0,0,0,0.2)', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>{event.category.toUpperCase()}</span>
                </div>
                <div style={{ padding: '1.75rem 2rem' }}>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.15rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 0.5rem' }}>{event.title}</h3>
                  <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.3rem', marginBottom: '0.75rem' }}>
                    <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', color: '#7a5c5c' }}>📅 {event.date} at {event.time}</span>
                    <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', color: '#7a5c5c' }}>📍 {event.location}</span>
                  </div>
                  <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: '#E8472A', fontWeight: 800 }}>{event.price}</span>
                </div>
                <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', gap: '0.75rem', borderLeft: '1px solid rgba(232,71,42,0.08)' }}>
                  <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.65rem', fontWeight: 600, padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(39,174,96,0.1)', color: '#27AE60', textAlign: 'center' as const }}>✅ Confirmed</span>
                  <button onClick={() => handleCancel(event.id)} style={{ padding: '0.7rem 1.25rem', borderRadius: '9999px', border: '1.5px solid rgba(192,57,43,0.3)', backgroundColor: 'transparent', color: '#C0392B', fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', whiteSpace: 'nowrap' as const }}>
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Requests */}
        <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          My Custom Event Requests
          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', backgroundColor: '#2C1A1A', color: 'white', padding: '0.2rem 0.65rem', borderRadius: '9999px', fontWeight: 600 }}>{myRequests.length}</span>
        </h2>

        {myRequests.length === 0 ? (
          <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '3rem', textAlign: 'center' as const, boxShadow: '0 4px 20px rgba(0,0,0,0.06)', marginBottom: '2.5rem' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💍</div>
            <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 0.5rem' }}>No custom requests yet!</p>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', color: '#7a5c5c', margin: '0 0 1.5rem' }}>Planning a wedding, birthday or corporate event?</p>
            <Link href="/plan-event" style={{ display: 'inline-block', backgroundColor: '#E8472A', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, padding: '0.85rem 2rem', borderRadius: '9999px', textDecoration: 'none' }}>
              PLAN AN EVENT
            </Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1rem', marginBottom: '2.5rem' }}>
            {myRequests.map((req: any, i: number) => (
              <div key={i} style={{ backgroundColor: 'white', borderRadius: '1.25rem', padding: '1.5rem 2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1.5px solid rgba(232,71,42,0.08)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.05rem', color: '#2C1A1A', fontWeight: 700, margin: 0, textTransform: 'capitalize' as const }}>
                    {req.eventType} — {req.theme || 'Custom Event'}
                  </h3>
                  <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.7rem', fontWeight: 600, padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(230,126,34,0.1)', color: '#E67E22' }}>Pending Review</span>
                </div>
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' as const }}>
                  {[
                    { label: '📅 Date', value: req.date },
                    { label: '👥 Guests', value: req.guests },
                    { label: '📍 Venue', value: req.venue },
                    { label: '💰 Budget', value: req.budget },
                  ].map((item, j) => item.value ? (
                    <span key={j} style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: '#7a5c5c' }}>
                      {item.label}: <strong style={{ color: '#2C1A1A' }}>{item.value}</strong>
                    </span>
                  ) : null)}
                </div>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.78rem', color: '#7a5c5c', margin: '0.75rem 0 0' }}>
                  🕐 Submitted: {req.submittedAt} — We will contact you at <strong>{req.email}</strong> within 24 hours.
                </p>
              </div>
            ))}
          </div>
        )}

        {/* CTA */}
        <div style={{ backgroundColor: '#2C1A1A', borderRadius: '2rem', padding: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '2rem' }}>
          <div>
            <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: 'white', fontWeight: 700, margin: '0 0 0.5rem' }}>Discover more events</h3>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', color: 'rgba(255,255,255,0.45)', margin: 0 }}>Browse our latest events and offers from Evaska.</p>
          </div>
          <Link href="/events" style={{ display: 'inline-block', backgroundColor: '#E8472A', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', fontWeight: 600, padding: '1rem 2.5rem', borderRadius: '9999px', textDecoration: 'none', whiteSpace: 'nowrap' as const, flexShrink: 0 }}>
            BROWSE EVENTS →
          </Link>
        </div>
      </div>
    </div>
  )
}
