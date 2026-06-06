'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useApp } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

type Tab = 'overview' | 'bookings' | 'requests' | 'cancelled' | 'notifications'

export default function ProfilePage() {
  const { currentUser, events, rsvps, cancelRsvp } = useApp()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [customRequests, setCustomRequests] = useState<any[]>([])
  const [notifications, setNotifications] = useState<any[]>([])
  const [bookingFilter, setBookingFilter] = useState('All')
  const [bookingSort, setBookingSort] = useState('newest')
  const [requestFilter, setRequestFilter] = useState('All')
  const [cancelledHistory, setCancelledHistory] = useState<any[]>([])
  const [confirmCancelId, setConfirmCancelId] = useState<number | null>(null)

  useEffect(() => {
    if (!currentUser) { router.push('/login'); return }
    const all = JSON.parse(localStorage.getItem('evaska_custom_requests') || '[]')
    setCustomRequests(all.filter((r: any) => r.email === currentUser.email))
    const allNotifs = JSON.parse(localStorage.getItem('evaska_notifications') || '[]')
    setNotifications(allNotifs.filter((n: any) => n.email === currentUser.email))
    const history = JSON.parse(localStorage.getItem(`evaska_cancelled_history_${currentUser.id}`) || '[]')
    setCancelledHistory(history)
  }, [currentUser, router, activeTab])

  if (!currentUser) return null

  const myRsvpIds = rsvps.filter(r => r.userId === currentUser.id).map(r => r.eventId)
  const activeBookings = events.filter(e => myRsvpIds.includes(e.id))
  const unreadNotifs = notifications.filter(n => !n.read)

  const categories = ['All', ...Array.from(new Set(activeBookings.map(e => e.category)))]
  const filteredBookings = activeBookings
    .filter(e => bookingFilter === 'All' || e.category === bookingFilter)
    .sort((a, b) => bookingSort === 'newest' ? b.id - a.id : a.id - b.id)

  const filteredRequests = customRequests
    .filter(r => requestFilter === 'All' || (r.status || 'pending') === requestFilter)
    .sort((a: any, b: any) => b.id - a.id)

  const handleCancel = (eventId: number) => {
    const event = events.find(e => e.id === eventId)
    if (!event) return

    // Save to cancelled history FIRST
    const history = JSON.parse(localStorage.getItem(`evaska_cancelled_history_${currentUser.id}`) || '[]')
    history.unshift({
      ...event,
      cancelledAt: new Date().toLocaleString(),
    })
    localStorage.setItem(`evaska_cancelled_history_${currentUser.id}`, JSON.stringify(history))
    setCancelledHistory(history)

    // Then cancel rsvp from context
    cancelRsvp(currentUser.id, eventId)
    setConfirmCancelId(null)
    toast.success('Booking cancelled successfully!')
  }

  const markAllRead = () => {
    const all = JSON.parse(localStorage.getItem('evaska_notifications') || '[]')
    const updated = all.map((n: any) => n.email === currentUser.email ? { ...n, read: true } : n)
    localStorage.setItem('evaska_notifications', JSON.stringify(updated))
    setNotifications(updated.filter((n: any) => n.email === currentUser.email))
    toast.success('All notifications marked as read')
  }

  const statusStyle = (status: string) => {
    if (status === 'approved') return { bg: 'rgba(39,174,96,0.1)', color: '#27AE60', label: '✅ Approved' }
    if (status === 'rejected') return { bg: 'rgba(192,57,43,0.1)', color: '#C0392B', label: '❌ Rejected' }
    return { bg: 'rgba(230,126,34,0.1)', color: '#E67E22', label: '⏳ Pending Review' }
  }

  const tabs: { key: Tab; label: string; icon: string; count?: number }[] = [
    { key: 'overview', label: 'Overview', icon: '👤' },
    { key: 'bookings', label: 'My Bookings', icon: '🎟️', count: activeBookings.length },
    { key: 'requests', label: 'Event Requests', icon: '💍', count: customRequests.length },
    { key: 'notifications', label: 'Notifications', icon: '🔔', count: unreadNotifs.length },
    { key: 'cancelled', label: 'Cancelled', icon: '❌', count: cancelledHistory.length },
  ]

  const pillBtn = (active: boolean, onClick: () => void, label: string, activeColor = '#E8472A') => (
    <button onClick={onClick} style={{
      padding: '0.45rem 1rem', borderRadius: '9999px', cursor: 'pointer', transition: 'all 0.2s',
      border: active ? 'none' : '1.5px solid rgba(232,71,42,0.25)',
      backgroundColor: active ? activeColor : 'white',
      color: active ? 'white' : '#7a5c5c',
      fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 500,
    }}>{label}</button>
  )

  return (
    <div style={{ backgroundColor: '#FFF0EC', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ backgroundColor: '#2C1A1A', padding: '4rem 7rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-40px', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(232,71,42,0.08)' }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', position: 'relative', zIndex: 2 }}>
          <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: '#E8472A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', color: 'white', fontWeight: 800, boxShadow: '0 8px 24px rgba(232,71,42,0.4)', flexShrink: 0, fontFamily: '"Playfair Display", serif' }}>
            {currentUser.name[0].toUpperCase()}
          </div>
          <div>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', margin: '0 0 0.25rem', letterSpacing: '0.12em', textTransform: 'uppercase' as const }}>My Profile</p>
            <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(1.5rem, 3vw, 2.25rem)', color: 'white', fontWeight: 800, margin: '0 0 0.25rem' }}>{currentUser.name}</h1>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>{currentUser.email}</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '2.5rem', marginTop: '2rem', position: 'relative', zIndex: 2 }}>
          {[
            { label: 'Active Bookings', value: activeBookings.length, color: '#F9C5B0' },
            { label: 'Event Requests', value: customRequests.length, color: '#F9C5B0' },
            { label: 'New Notifications', value: unreadNotifs.length, color: unreadNotifs.length > 0 ? '#6ee7b7' : 'rgba(255,255,255,0.3)' },
            { label: 'Cancelled', value: cancelledHistory.length, color: 'rgba(255,255,255,0.3)' },
          ].map((s, i) => (
            <div key={i}>
              <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', color: s.color, fontWeight: 800, lineHeight: 1, display: 'block' }}>{s.value}</span>
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div style={{ backgroundColor: 'white', padding: '0 7rem', display: 'flex', borderBottom: '1px solid rgba(232,71,42,0.1)', position: 'sticky', top: '72px', zIndex: 40, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflowX: 'auto' as const }}>
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
            padding: '1.1rem 1.5rem', border: 'none',
            borderBottom: activeTab === tab.key ? '2.5px solid #E8472A' : '2.5px solid transparent',
            backgroundColor: 'transparent', color: activeTab === tab.key ? '#E8472A' : '#7a5c5c',
            fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', fontWeight: activeTab === tab.key ? 600 : 400,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'all 0.2s', whiteSpace: 'nowrap' as const,
          }}>
            {tab.icon} {tab.label}
            {tab.count !== undefined && tab.count > 0 && (
              <span style={{ backgroundColor: tab.key === 'notifications' ? '#27AE60' : '#E8472A', color: 'white', borderRadius: '9999px', fontSize: '0.65rem', padding: '0.1rem 0.5rem', fontWeight: 700 }}>{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      <div style={{ padding: '2.5rem 7rem 5rem' }}>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.5rem' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: '#2C1A1A', fontWeight: 700, margin: 0 }}>Your Activity Overview</h2>
            {unreadNotifs.length > 0 && (
              <div onClick={() => setActiveTab('notifications')} style={{ backgroundColor: '#27AE60', borderRadius: '1.25rem', padding: '1.25rem 1.75rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 4px 20px rgba(39,174,96,0.3)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>🔔</span>
                  <div>
                    <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: 'white', fontWeight: 700, margin: 0 }}>{unreadNotifs.length} new notification{unreadNotifs.length > 1 ? 's' : ''}!</p>
                    <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)', margin: 0 }}>{unreadNotifs[0]?.message}</p>
                  </div>
                </div>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: 'white', fontWeight: 600 }}>View →</span>
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
              {[
                { label: 'Active Bookings', value: activeBookings.length, icon: '🎟️', color: '#E8472A', tab: 'bookings' as Tab },
                { label: 'Custom Requests', value: customRequests.length, icon: '💍', color: '#E67E22', tab: 'requests' as Tab },
                { label: 'Approved', value: customRequests.filter(r => r.status === 'approved').length, icon: '✅', color: '#27AE60', tab: 'requests' as Tab },
                { label: 'Notifications', value: unreadNotifs.length, icon: '🔔', color: '#27AE60', tab: 'notifications' as Tab },
              ].map((card, i) => (
                <div key={i} onClick={() => setActiveTab(card.tab)} style={{ backgroundColor: 'white', borderRadius: '1.25rem', padding: '1.5rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1.5px solid rgba(232,71,42,0.08)', cursor: 'pointer', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)' }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{card.icon}</div>
                  <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', color: card.color, fontWeight: 800, margin: 0, lineHeight: 1 }}>{card.value}</p>
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', color: '#2C1A1A', fontWeight: 600, margin: '0.35rem 0 0' }}>{card.label}</p>
                </div>
              ))}
            </div>
            {activeBookings.length === 0 && customRequests.length === 0 && (
              <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '4rem', textAlign: 'center' as const }}>
                <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.25rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 1.5rem' }}>Start Your Evaska Journey!</h3>
                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' as const }}>
                  <Link href="/events" style={{ display: 'inline-block', backgroundColor: '#E8472A', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', fontWeight: 600, padding: '0.85rem 2rem', borderRadius: '9999px', textDecoration: 'none' }}>Browse Events</Link>
                  <Link href="/plan-event" style={{ display: 'inline-block', border: '1.5px solid #E8472A', color: '#E8472A', fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', fontWeight: 600, padding: '0.85rem 2rem', borderRadius: '9999px', textDecoration: 'none' }}>Plan Custom Event</Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* BOOKINGS */}
        {activeTab === 'bookings' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' as const, gap: '1rem' }}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: '#2C1A1A', fontWeight: 700, margin: 0 }}>
                My Bookings
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', backgroundColor: '#E8472A', color: 'white', padding: '0.2rem 0.65rem', borderRadius: '9999px', fontWeight: 600, marginLeft: '0.75rem' }}>{filteredBookings.length}</span>
              </h2>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', color: '#7a5c5c', fontWeight: 600 }}>Sort:</span>
                {pillBtn(bookingSort === 'newest', () => setBookingSort('newest'), '⬇ Newest First')}
                {pillBtn(bookingSort === 'oldest', () => setBookingSort('oldest'), '⬆ Oldest First')}
              </div>
            </div>

            {/* Category filter */}
            {categories.length > 1 && (
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' as const, marginBottom: '1.75rem', alignItems: 'center' }}>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', color: '#7a5c5c', fontWeight: 600 }}>Category:</span>
                {categories.map(cat => pillBtn(bookingFilter === cat, () => setBookingFilter(cat), cat))}
              </div>
            )}

            {filteredBookings.length === 0 ? (
              <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '4rem', textAlign: 'center' as const }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🎟️</div>
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 1.5rem' }}>
                  {activeBookings.length === 0 ? 'No active bookings' : `No ${bookingFilter} bookings`}
                </p>
                <Link href="/events" style={{ display: 'inline-block', backgroundColor: '#E8472A', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, padding: '0.85rem 2rem', borderRadius: '9999px', textDecoration: 'none' }}>BROWSE EVENTS</Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.25rem' }}>
                {filteredBookings.map((event, idx) => (
                  <div key={event.id} style={{ backgroundColor: 'white', borderRadius: '1.5rem', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1.5px solid rgba(232,71,42,0.08)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr auto' }}>
                      {/* Color band */}
                      <div style={{ background: event.color, display: 'flex', flexDirection: 'column' as const, alignItems: 'center', justifyContent: 'center', gap: '0.5rem', padding: '1.5rem', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '0.6rem', left: '0.6rem', backgroundColor: 'rgba(0,0,0,0.25)', borderRadius: '9999px', padding: '0.15rem 0.5rem', fontFamily: '"DM Sans", sans-serif', fontSize: '0.6rem', color: 'white', fontWeight: 700 }}>
                          #{filteredBookings.length - idx}
                        </div>
                        <div style={{ fontSize: '2.5rem' }}>{event.emoji}</div>
                        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.6rem', color: 'white', fontWeight: 700, letterSpacing: '0.1em', backgroundColor: 'rgba(0,0,0,0.2)', padding: '0.2rem 0.6rem', borderRadius: '9999px' }}>{event.category.toUpperCase()}</span>
                      </div>
                      {/* Content */}
                      <div style={{ padding: '1.75rem 2rem' }}>
                        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.15rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 0.5rem' }}>{event.title}</h3>
                        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.3rem', marginBottom: '0.75rem' }}>
                          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', color: '#7a5c5c' }}>📅 {event.date} at {event.time}</span>
                          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', color: '#7a5c5c' }}>📍 {event.location}</span>
                          <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', color: '#7a5c5c' }}>🎫 Ticket: <strong style={{ color: '#E8472A' }}>EVS-{String(event.id).slice(-6)}</strong></span>
                        </div>
                        <span style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.2rem', color: '#E8472A', fontWeight: 800 }}>{event.price}</span>
                      </div>
                      {/* Actions */}
                      <div style={{ padding: '1.75rem', display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', gap: '0.75rem', borderLeft: '1px solid rgba(232,71,42,0.08)', minWidth: '140px' }}>
                        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.68rem', fontWeight: 600, padding: '0.3rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(39,174,96,0.1)', color: '#27AE60', textAlign: 'center' as const }}>✅ Confirmed</span>
                        {confirmCancelId === event.id ? (
                          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.4rem' }}>
                            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.7rem', color: '#C0392B', margin: 0, textAlign: 'center' as const, fontWeight: 600 }}>Are you sure?</p>
                            <button onClick={() => handleCancel(event.id)} style={{ padding: '0.5rem', borderRadius: '9999px', border: 'none', backgroundColor: '#C0392B', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.72rem', fontWeight: 700, cursor: 'pointer' }}>
                              Yes, Cancel
                            </button>
                            <button onClick={() => setConfirmCancelId(null)} style={{ padding: '0.5rem', borderRadius: '9999px', border: '1.5px solid rgba(44,26,26,0.2)', backgroundColor: 'transparent', color: '#7a5c5c', fontFamily: '"DM Sans", sans-serif', fontSize: '0.72rem', fontWeight: 600, cursor: 'pointer' }}>
                              Keep Booking
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => setConfirmCancelId(event.id)}
                            style={{ padding: '0.65rem 1rem', borderRadius: '9999px', border: '1.5px solid rgba(192,57,43,0.35)', backgroundColor: 'transparent', color: '#C0392B', fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', whiteSpace: 'nowrap' as const }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#C0392B'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = '#C0392B' }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#C0392B'; e.currentTarget.style.borderColor = 'rgba(192,57,43,0.35)' }}
                          >
                            Cancel Booking
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* REQUESTS */}
        {activeTab === 'requests' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap' as const, gap: '1rem' }}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: '#2C1A1A', fontWeight: 700, margin: 0 }}>My Event Requests</h2>
              <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' as const, alignItems: 'center' }}>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', color: '#7a5c5c', fontWeight: 600 }}>Filter:</span>
                {[
                  { key: 'All', label: `All (${customRequests.length})`, color: '#E8472A' },
                  { key: 'pending', label: `⏳ Pending (${customRequests.filter(r => !r.status || r.status === 'pending').length})`, color: '#E67E22' },
                  { key: 'approved', label: `✅ Approved (${customRequests.filter(r => r.status === 'approved').length})`, color: '#27AE60' },
                  { key: 'rejected', label: `❌ Rejected (${customRequests.filter(r => r.status === 'rejected').length})`, color: '#C0392B' },
                ].map(f => pillBtn(requestFilter === f.key, () => setRequestFilter(f.key), f.label, f.color))}
              </div>
            </div>

            {filteredRequests.length === 0 ? (
              <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '4rem', textAlign: 'center' as const }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>💍</div>
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 1.5rem' }}>
                  {customRequests.length === 0 ? 'No requests yet!' : `No ${requestFilter} requests`}
                </p>
                {customRequests.length === 0 && (
                  <Link href="/plan-event" style={{ display: 'inline-block', backgroundColor: '#E8472A', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, padding: '0.85rem 2rem', borderRadius: '9999px', textDecoration: 'none' }}>PLAN AN EVENT</Link>
                )}
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.25rem' }}>
                {filteredRequests.map((req: any, i: number) => {
                  const s = statusStyle(req.status || 'pending')
                  return (
                    <div key={i} style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: `1.5px solid ${s.color}30` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                        <div>
                          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.15rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 0.25rem', textTransform: 'capitalize' as const }}>{req.eventType} — {req.theme || 'Custom Event'}</h3>
                          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.78rem', color: '#7a5c5c', margin: 0 }}>🕐 {req.submittedAt}</p>
                        </div>
                        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', fontWeight: 700, padding: '0.35rem 1rem', borderRadius: '9999px', backgroundColor: s.bg, color: s.color }}>{s.label}</span>
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.65rem', marginBottom: '1rem' }}>
                        {[
                          { icon: '📅', label: 'Date', value: req.date },
                          { icon: '👥', label: 'Guests', value: req.guests },
                          { icon: '💰', label: 'Budget', value: req.budget },
                          { icon: '📍', label: 'Location', value: req.location },
                          { icon: '🏛️', label: 'Venue', value: req.venueType },
                          { icon: '📞', label: 'Contact Via', value: req.preferredContact },
                        ].filter(f => f.value).map((field, j) => (
                          <div key={j} style={{ padding: '0.55rem 0.75rem', backgroundColor: '#FFF0EC', borderRadius: '0.6rem' }}>
                            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.62rem', color: '#7a5c5c', margin: '0 0 0.15rem', fontWeight: 600, textTransform: 'uppercase' as const }}>{field.icon} {field.label}</p>
                            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', color: '#2C1A1A', margin: 0, fontWeight: 500 }}>{field.value}</p>
                          </div>
                        ))}
                      </div>
                      <div style={{ padding: '0.85rem 1rem', borderRadius: '0.75rem', backgroundColor: s.bg }}>
                        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', color: s.color, margin: 0, fontWeight: 500 }}>
                          {req.status === 'approved' ? `🎉 Approved! Our team will contact you via ${req.preferredContact || 'email'} to finalize details.`
                            : req.status === 'rejected' ? '😞 This request was not accommodated. Please contact us for alternatives.'
                            : `⏳ Under review. We will contact you via ${req.preferredContact || 'email'} within 24 hours.`}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
            <div style={{ marginTop: '2rem' }}>
              <Link href="/plan-event" style={{ display: 'inline-block', backgroundColor: '#E8472A', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', fontWeight: 600, padding: '0.85rem 2rem', borderRadius: '9999px', textDecoration: 'none' }}>+ Plan Another Event</Link>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS */}
        {activeTab === 'notifications' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: '#2C1A1A', fontWeight: 700, margin: 0 }}>
                Notifications
                {unreadNotifs.length > 0 && <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', backgroundColor: '#27AE60', color: 'white', padding: '0.2rem 0.65rem', borderRadius: '9999px', fontWeight: 600, marginLeft: '0.75rem' }}>{unreadNotifs.length} new</span>}
              </h2>
              {unreadNotifs.length > 0 && (
                <button onClick={markAllRead} style={{ background: 'none', border: 'none', fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: '#E8472A', fontWeight: 600, cursor: 'pointer' }}>Mark all as read</button>
              )}
            </div>
            {notifications.length === 0 ? (
              <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '4rem', textAlign: 'center' as const }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔔</div>
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 0.5rem' }}>No notifications yet</p>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', color: '#7a5c5c', margin: 0 }}>You will be notified when Evaska reviews your requests.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1rem' }}>
                {[...notifications].sort((a: any, b: any) => b.id - a.id).map((notif: any, i: number) => (
                  <div key={i} style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: notif.read ? '0 2px 12px rgba(0,0,0,0.04)' : '0 8px 28px rgba(39,174,96,0.12)', border: notif.read ? '1.5px solid rgba(232,71,42,0.08)' : `1.5px solid ${notif.type === 'approved' ? '#27AE60' : '#C0392B'}`, position: 'relative' as const, opacity: notif.read ? 0.8 : 1 }}>
                    {!notif.read && <div style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', width: '10px', height: '10px', borderRadius: '50%', backgroundColor: notif.type === 'approved' ? '#27AE60' : '#C0392B' }} />}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                      <div style={{ fontSize: '2.5rem', flexShrink: 0 }}>{notif.type === 'approved' ? '🎉' : '😞'}</div>
                      <div style={{ flex: 1 }}>
                        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: notif.type === 'approved' ? '#27AE60' : '#C0392B', fontWeight: 700, margin: '0 0 0.75rem' }}>{notif.message}</h3>
                        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: '#2C1A1A', lineHeight: 1.8, margin: '0 0 1rem' }}>{notif.detail}</p>
                        {notif.type === 'approved' && (
                          <div style={{ backgroundColor: 'rgba(39,174,96,0.08)', borderRadius: '1rem', padding: '1rem 1.25rem', border: '1px solid rgba(39,174,96,0.2)' }}>
                            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: '#27AE60', fontWeight: 700, margin: '0 0 0.35rem' }}>📞 What happens next?</p>
                            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: '#2C1A1A', margin: 0, lineHeight: 1.6 }}>Our team will reach out via <strong>{notif.contact}</strong> within 24 hours to discuss final details and confirm your booking officially.</p>
                          </div>
                        )}
                        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.72rem', color: '#7a5c5c', margin: '0.75rem 0 0' }}>🕐 {notif.createdAt}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CANCELLED */}
        {activeTab === 'cancelled' && (
          <div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 1.5rem' }}>
              Cancelled Bookings
              {cancelledHistory.length > 0 && <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', backgroundColor: '#7a5c5c', color: 'white', padding: '0.2rem 0.65rem', borderRadius: '9999px', fontWeight: 600, marginLeft: '0.75rem' }}>{cancelledHistory.length}</span>}
            </h2>
            {cancelledHistory.length === 0 ? (
              <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '4rem', textAlign: 'center' as const }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 0.5rem' }}>No cancellations!</p>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', color: '#7a5c5c', margin: 0 }}>All your bookings are active and confirmed.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1rem' }}>
                {cancelledHistory.map((event: any, i: number) => (
                  <div key={i} style={{ backgroundColor: 'white', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 2px 12px rgba(0,0,0,0.04)', border: '1.5px solid rgba(192,57,43,0.15)', opacity: 0.7 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr auto', alignItems: 'center' }}>
                      <div style={{ background: event.color, height: '100%', minHeight: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', filter: 'grayscale(0.5)' }}>
                        {event.emoji}
                      </div>
                      <div style={{ padding: '1.25rem 1.5rem' }}>
                        <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 0.25rem' }}>{event.title}</h3>
                        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.78rem', color: '#7a5c5c', margin: '0 0 0.2rem' }}>📅 {event.date} · 📍 {event.location}</p>
                        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.72rem', color: '#C0392B', margin: 0 }}>Cancelled: {event.cancelledAt}</p>
                      </div>
                      <div style={{ padding: '1.25rem' }}>
                        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.7rem', fontWeight: 600, padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(192,57,43,0.1)', color: '#C0392B', whiteSpace: 'nowrap' as const }}>Cancelled</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 1024px) { div[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 768px) {
          div[style*="4rem 7rem"] { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          div[style*="2.5rem 7rem"] { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
          div[style*="0 7rem"] { padding-left: 1.5rem !important; padding-right: 1.5rem !important; }
        }
      `}</style>
    </div>
  )
}
