'use client'

import React, { useState, useEffect } from 'react'
import { useApp } from '@/context/AppContext'
import { Event } from '@/context/AppContext'
import toast from 'react-hot-toast'

const ADMIN_PASSWORD = 'evaska@admin2026'

type Tab = 'overview' | 'events' | 'bookings' | 'requests' | 'create' | 'devlog'

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pw, setPw] = useState('')
  const [pwError, setPwError] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>('overview')
  const [showSuccess, setShowSuccess] = useState(false)
  const [customRequests, setCustomRequests] = useState<any[]>([])
  const [requestFilter, setRequestFilter] = useState('all')
  const { events, rsvps, addEvent, devLog } = useApp()

  const [form, setForm] = useState({
    title: '', category: '', date: '', time: '',
    location: '', capacity: '', price: '', description: '',
  })

  useEffect(() => {
    const saved = localStorage.getItem('evaska_admin_auth')
    if (saved === 'true') setAuthed(true)
  }, [])

  useEffect(() => {
    if (authed) {
      const all = JSON.parse(localStorage.getItem('evaska_custom_requests') || '[]')
      setCustomRequests(all)
    }
  }, [authed, activeTab])

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true)
      localStorage.setItem('evaska_admin_auth', 'true')
    } else {
      setPwError(true)
      setTimeout(() => setPwError(false), 2000)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('evaska_admin_auth')
    setAuthed(false)
  }

  const handleCreate = () => {
    if (!form.title || !form.date || !form.location) {
      alert('Please fill title, date and location!')
      return
    }
    const newEvent: Event = {
      id: Date.now(),
      organizerId: 'evaska-owner',
      organizerName: 'Evaska',
      title: form.title,
      category: form.category || 'Other',
      date: form.date,
      time: form.time || '6:00 PM',
      location: form.location,
      spots: parseInt(form.capacity) || 50,
      totalSpots: parseInt(form.capacity) || 50,
      emoji: '🎉',
      color: 'linear-gradient(135deg, #F9C5B0 0%, #E8472A 100%)',
      tag: 'New',
      tagColor: '#27AE60',
      price: form.price || 'Free',
      description: form.description || '',
    }
    addEvent(newEvent)
    setShowSuccess(true)
    setForm({ title: '', category: '', date: '', time: '', location: '', capacity: '', price: '', description: '' })
    setTimeout(() => { setShowSuccess(false); setActiveTab('events') }, 2000)
  }

  const handleApprove = (reqId: number) => {
    const all = JSON.parse(localStorage.getItem('evaska_custom_requests') || '[]')
    const req = all.find((r: any) => r.id === reqId)
    const updated = all.map((r: any) => r.id === reqId ? { ...r, status: 'approved', reviewedAt: new Date().toLocaleString() } : r)
    localStorage.setItem('evaska_custom_requests', JSON.stringify(updated))
    const notifs = JSON.parse(localStorage.getItem('evaska_notifications') || '[]')
    notifs.unshift({
      id: Date.now(), email: req.email, type: 'approved',
      message: `🎉 Your ${req.eventType} request has been approved!`,
      detail: `Thank you for trusting Evaska! We are excited to plan your ${req.eventType}${req.theme ? ` with a ${req.theme} theme` : ''}. Our team will reach out via ${req.preferredContact || 'email'} within 24 hours to finalize all the details. Get ready for something magical! ✨`,
      contact: req.preferredContact || 'email', read: false, createdAt: new Date().toLocaleString(),
    })
    localStorage.setItem('evaska_notifications', JSON.stringify(notifs))
    setCustomRequests(updated)
    toast.success('Approved! Client notified 🎉')
  }

  const handleReject = (reqId: number) => {
    const all = JSON.parse(localStorage.getItem('evaska_custom_requests') || '[]')
    const req = all.find((r: any) => r.id === reqId)
    const updated = all.map((r: any) => r.id === reqId ? { ...r, status: 'rejected', reviewedAt: new Date().toLocaleString() } : r)
    localStorage.setItem('evaska_custom_requests', JSON.stringify(updated))
    const notifs = JSON.parse(localStorage.getItem('evaska_notifications') || '[]')
    notifs.unshift({
      id: Date.now(), email: req.email, type: 'rejected',
      message: `😞 Your ${req.eventType} request could not be accommodated`,
      detail: `We are sorry, but we are unable to accommodate your ${req.eventType} request at this time. Please contact us to discuss alternative dates or options. We would love to make your event happen! 💕`,
      read: false, createdAt: new Date().toLocaleString(),
    })
    localStorage.setItem('evaska_notifications', JSON.stringify(notifs))
    setCustomRequests(updated)
    toast.error('Request rejected. Client notified.')
  }

  // Filtered requests based on selected filter
  const filteredRequests = customRequests.filter(r => {
    if (requestFilter === 'all') return true
    if (requestFilter === 'pending') return !r.status || r.status === 'pending'
    return r.status === requestFilter
  })

  const pendingCount = customRequests.filter(r => !r.status || r.status === 'pending').length
  const approvedCount = customRequests.filter(r => r.status === 'approved').length
  const rejectedCount = customRequests.filter(r => r.status === 'rejected').length

  const inputStyle: React.CSSProperties = {
    width: '100%', padding: '0.9rem 1.25rem', borderRadius: '0.75rem',
    border: '1.5px solid rgba(232,71,42,0.2)', backgroundColor: 'white',
    fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: '#2C1A1A',
    outline: 'none', boxSizing: 'border-box', transition: 'border 0.2s',
  }

  const tabs: { key: Tab; label: string; icon: string; badge?: number }[] = [
    { key: 'overview', label: 'Overview', icon: '📊' },
    { key: 'events', label: 'All Events', icon: '🎪' },
    { key: 'bookings', label: 'All Bookings', icon: '🎟️' },
    { key: 'requests', label: 'Custom Requests', icon: '💍', badge: pendingCount },
    { key: 'create', label: 'Post Event', icon: '✨' },
    { key: 'devlog', label: 'Dev Log', icon: '🔔' },
  ]

  const statusStyle = (status: string) => {
    if (status === 'approved') return { bg: 'rgba(39,174,96,0.1)', color: '#27AE60', label: '✅ Approved' }
    if (status === 'rejected') return { bg: 'rgba(192,57,43,0.1)', color: '#C0392B', label: '❌ Rejected' }
    return { bg: 'rgba(230,126,34,0.1)', color: '#E67E22', label: '⏳ Pending' }
  }

  if (!authed) {
    return (
      <div style={{ backgroundColor: '#2C1A1A', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ backgroundColor: '#FFF0EC', borderRadius: '2rem', padding: '3rem', width: '400px', textAlign: 'center' as const, boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔐</div>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.75rem', color: '#2C1A1A', fontWeight: 800, margin: '0 0 0.5rem' }}>Admin Access</h1>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', color: '#7a5c5c', margin: '0 0 2rem' }}>Enter your admin password to continue</p>
          <input type="password" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleLogin()} placeholder="Admin password"
            style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '0.75rem', border: `1.5px solid ${pwError ? '#C0392B' : 'rgba(232,71,42,0.2)'}`, backgroundColor: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: '#2C1A1A', outline: 'none', boxSizing: 'border-box' as const, marginBottom: '1rem' }} />
          {pwError && <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: '#C0392B', margin: '0 0 1rem' }}>❌ Wrong password</p>}
          <button onClick={handleLogin} style={{ width: '100%', padding: '0.9rem', borderRadius: '9999px', border: 'none', backgroundColor: '#E8472A', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer' }}>
            ENTER →
          </button>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.72rem', color: 'rgba(122,92,92,0.4)', marginTop: '1.5rem' }}>This page is private and not linked anywhere on the site.</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#FFF0EC', minHeight: '100vh' }}>
      {/* Top bar */}
      <div style={{ backgroundColor: '#2C1A1A', padding: '1.25rem 4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', margin: '0 0 0.2rem', letterSpacing: '0.1em' }}>🔐 EVASKA OWNER DASHBOARD</p>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: 'white', margin: 0, fontWeight: 700 }}>Welcome back, Boss! 👑</h1>
        </div>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <span style={{ fontFamily: '"Dancing Script", cursive', fontSize: '1.75rem', color: '#F9C5B0' }}>Evaska</span>
          <button onClick={handleLogout} style={{ padding: '0.5rem 1.25rem', borderRadius: '9999px', border: '1.5px solid rgba(255,255,255,0.3)', backgroundColor: 'transparent', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>Logout</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ backgroundColor: 'white', padding: '0 4rem', display: 'flex', borderBottom: '1px solid rgba(232,71,42,0.1)', position: 'sticky', top: 0, zIndex: 40, boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflowX: 'auto' as const }}>
        {tabs.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
            padding: '1.1rem 1.5rem', border: 'none',
            borderBottom: activeTab === tab.key ? '2.5px solid #E8472A' : '2.5px solid transparent',
            backgroundColor: 'transparent', color: activeTab === tab.key ? '#E8472A' : '#7a5c5c',
            fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', fontWeight: activeTab === tab.key ? 600 : 400,
            cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', whiteSpace: 'nowrap' as const,
          }}>
            {tab.icon} {tab.label}
            {tab.badge !== undefined && tab.badge > 0 && (
              <span style={{ backgroundColor: '#E8472A', color: 'white', borderRadius: '9999px', fontSize: '0.65rem', padding: '0.1rem 0.5rem', fontWeight: 700 }}>{tab.badge}</span>
            )}
          </button>
        ))}
      </div>

      <div style={{ padding: '2.5rem 4rem 5rem' }}>

        {/* OVERVIEW */}
        {activeTab === 'overview' && (
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '2rem' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.25rem' }}>
              {[
                { label: 'Total Events', value: events.length, icon: '🎪', sub: 'Posted by you' },
                { label: 'Total Bookings', value: rsvps.length, icon: '🎟️', sub: 'Across all events' },
                { label: 'Pending Requests', value: pendingCount, icon: '💍', sub: pendingCount > 0 ? '⚠️ Action needed!' : 'All reviewed', highlight: pendingCount > 0 },
                { label: 'Total Requests', value: customRequests.length, icon: '📋', sub: `${approvedCount} approved · ${rejectedCount} rejected` },
              ].map((stat, i) => (
                <div key={i} style={{ backgroundColor: 'white', borderRadius: '1.25rem', padding: '1.75rem', boxShadow: stat.highlight ? '0 4px 20px rgba(232,71,42,0.2)' : '0 4px 20px rgba(0,0,0,0.06)', border: stat.highlight ? '1.5px solid rgba(232,71,42,0.4)' : '1.5px solid rgba(232,71,42,0.08)' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{stat.icon}</div>
                  <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', color: '#E8472A', fontWeight: 800, margin: 0, lineHeight: 1 }}>{stat.value}</p>
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', color: '#2C1A1A', fontWeight: 600, margin: '0.4rem 0 0.2rem' }}>{stat.label}</p>
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', color: stat.highlight ? '#E8472A' : '#7a5c5c', margin: 0 }}>{stat.sub}</p>
                </div>
              ))}
            </div>
            {pendingCount > 0 && (
              <div onClick={() => setActiveTab('requests')} style={{ backgroundColor: 'white', borderRadius: '1.25rem', padding: '1.5rem 2rem', boxShadow: '0 4px 20px rgba(232,71,42,0.12)', border: '1.5px solid rgba(232,71,42,0.25)', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 0.25rem' }}>⚠️ {pendingCount} Request{pendingCount > 1 ? 's' : ''} Awaiting Review</p>
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', color: '#7a5c5c', margin: 0 }}>Click to review and respond to client requests.</p>
                </div>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', color: '#E8472A', fontWeight: 600 }}>Review Now →</span>
              </div>
            )}
          </div>
        )}

        {/* ALL EVENTS */}
        {activeTab === 'events' && (
          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.25rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: '#2C1A1A', fontWeight: 700, margin: 0 }}>All Events ({events.length})</h2>
              <button onClick={() => setActiveTab('create')} style={{ padding: '0.75rem 1.5rem', borderRadius: '9999px', border: 'none', backgroundColor: '#E8472A', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>+ Post Event</button>
            </div>
            {events.length === 0 && <p style={{ fontFamily: '"DM Sans", sans-serif', color: '#7a5c5c' }}>No events yet. Post your first event!</p>}
            {events.map(event => {
              const eventRsvps = rsvps.filter(r => r.eventId === event.id)
              return (
                <div key={event.id} style={{ backgroundColor: 'white', borderRadius: '1.25rem', padding: '1.5rem 2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', display: 'grid', gridTemplateColumns: '60px 1fr auto', alignItems: 'center', gap: '1.5rem' }}>
                  <div style={{ width: '60px', height: '60px', borderRadius: '1rem', background: event.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.75rem' }}>{event.emoji}</div>
                  <div>
                    <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.05rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 0.35rem' }}>{event.title}</h3>
                    <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: '#7a5c5c', margin: '0 0 0.5rem' }}>📅 {event.date} | 📍 {event.location} | 💰 {event.price}</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: '120px', height: '5px', backgroundColor: 'rgba(232,71,42,0.1)', borderRadius: '9999px', overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${Math.min((eventRsvps.length / event.totalSpots) * 100, 100)}%`, backgroundColor: '#E8472A', borderRadius: '9999px' }} />
                      </div>
                      <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', color: '#E8472A', fontWeight: 600 }}>{eventRsvps.length}/{event.totalSpots} booked</span>
                    </div>
                  </div>
                  <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.7rem', fontWeight: 600, padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(39,174,96,0.1)', color: '#27AE60' }}>Live ✓</span>
                </div>
              )
            })}
          </div>
        )}

        {/* ALL BOOKINGS */}
        {activeTab === 'bookings' && (
          <div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 1.5rem' }}>All Bookings ({rsvps.length})</h2>
            {rsvps.length === 0 ? (
              <p style={{ fontFamily: '"DM Sans", sans-serif', color: '#7a5c5c' }}>No bookings yet.</p>
            ) : (
              <div style={{ backgroundColor: 'white', borderRadius: '1.25rem', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px', padding: '1rem 1.5rem', backgroundColor: '#FFF0EC', borderBottom: '1px solid rgba(232,71,42,0.1)' }}>
                  {['User ID', 'Event', 'Status'].map(h => (
                    <span key={h} style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', fontWeight: 700, color: '#7a5c5c', letterSpacing: '0.08em', textTransform: 'uppercase' as const }}>{h}</span>
                  ))}
                </div>
                {rsvps.map((rsvp, i) => {
                  const event = events.find(e => e.id === rsvp.eventId)
                  return (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px', padding: '1rem 1.5rem', borderBottom: i < rsvps.length - 1 ? '1px solid rgba(232,71,42,0.06)' : 'none', alignItems: 'center' }}>
                      <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', color: '#2C1A1A', fontWeight: 500 }}>{rsvp.userId.slice(0, 20)}...</span>
                      <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', color: '#7a5c5c' }}>{event?.title || 'Unknown'}</span>
                      <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.7rem', fontWeight: 600, padding: '0.25rem 0.75rem', borderRadius: '9999px', backgroundColor: 'rgba(39,174,96,0.1)', color: '#27AE60', display: 'inline-block' }}>Confirmed</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* CUSTOM REQUESTS — with working filter */}
        {activeTab === 'requests' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem', flexWrap: 'wrap' as const, gap: '1rem' }}>
              <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: '#2C1A1A', fontWeight: 700, margin: 0 }}>Custom Event Requests</h2>
            </div>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', color: '#7a5c5c', margin: '0 0 1.5rem' }}>Accept or reject client requests. They will be notified instantly.</p>

            {/* Working filter tabs */}
            <div style={{ display: 'flex', gap: '0.65rem', marginBottom: '2rem', flexWrap: 'wrap' as const }}>
              {[
                { key: 'all', label: `All (${customRequests.length})`, color: '#2C1A1A' },
                { key: 'pending', label: `⏳ Pending (${pendingCount})`, color: '#E67E22' },
                { key: 'approved', label: `✅ Approved (${approvedCount})`, color: '#27AE60' },
                { key: 'rejected', label: `❌ Rejected (${rejectedCount})`, color: '#C0392B' },
              ].map(f => (
                <button key={f.key} onClick={() => setRequestFilter(f.key)} style={{
                  padding: '0.55rem 1.25rem', borderRadius: '9999px', cursor: 'pointer', transition: 'all 0.2s',
                  border: requestFilter === f.key ? 'none' : '1.5px solid rgba(44,26,26,0.15)',
                  backgroundColor: requestFilter === f.key ? f.color : 'white',
                  color: requestFilter === f.key ? 'white' : '#7a5c5c',
                  fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', fontWeight: requestFilter === f.key ? 700 : 500,
                  boxShadow: requestFilter === f.key ? `0 4px 12px ${f.color}40` : 'none',
                }}>
                  {f.label}
                </button>
              ))}
            </div>

            {filteredRequests.length === 0 ? (
              <div style={{ backgroundColor: 'white', borderRadius: '1.25rem', padding: '3rem', textAlign: 'center' as const }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>💍</div>
                <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A1A', fontWeight: 700, margin: 0 }}>
                  No {requestFilter === 'all' ? '' : requestFilter} requests
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.5rem' }}>
                {filteredRequests.map((req: any) => {
                  const s = statusStyle(req.status || 'pending')
                  const isPending = !req.status || req.status === 'pending'
                  return (
                    <div key={req.id} style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: `1.5px solid ${isPending ? 'rgba(230,126,34,0.3)' : s.color + '25'}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                        <div>
                          <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.15rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 0.25rem', textTransform: 'capitalize' as const }}>{req.eventType} — {req.name}</h3>
                          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: '#7a5c5c', margin: '0 0 0.2rem' }}>📧 {req.email} {req.phone && `| 📱 ${req.phone}`}</p>
                          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', color: '#7a5c5c', margin: 0 }}>🕐 Submitted: {req.submittedAt}{req.reviewedAt && ` | Reviewed: ${req.reviewedAt}`}</p>
                        </div>
                        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', fontWeight: 700, padding: '0.35rem 1rem', borderRadius: '9999px', backgroundColor: s.bg, color: s.color, whiteSpace: 'nowrap' as const }}>{s.label}</span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.75rem', marginBottom: '0.75rem' }}>
                        {[
                          { label: 'Theme', value: req.theme },
                          { label: 'Date', value: req.date },
                          { label: 'Guests', value: req.guests },
                          { label: 'Budget', value: req.budget },
                          { label: 'Venue', value: req.venueType },
                          { label: 'Location', value: req.location },
                          { label: 'Timeline', value: req.timeline },
                          { label: 'Contact Via', value: req.preferredContact },
                        ].filter(f => f.value).map((field, j) => (
                          <div key={j} style={{ padding: '0.5rem 0.75rem', backgroundColor: '#FFF0EC', borderRadius: '0.5rem' }}>
                            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.6rem', color: '#7a5c5c', margin: '0 0 0.15rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const }}>{field.label}</p>
                            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.78rem', color: '#2C1A1A', margin: 0, fontWeight: 500 }}>{field.value}</p>
                          </div>
                        ))}
                      </div>

                      {req.decor && (
                        <div style={{ padding: '0.6rem 0.75rem', backgroundColor: '#FFF0EC', borderRadius: '0.5rem', marginBottom: '0.75rem' }}>
                          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.6rem', color: '#7a5c5c', margin: '0 0 0.2rem', fontWeight: 600, textTransform: 'uppercase' as const }}>🌸 Decor</p>
                          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: '#2C1A1A', margin: 0 }}>{req.decor}</p>
                        </div>
                      )}
                      {req.specialRequests && (
                        <div style={{ padding: '0.6rem 0.75rem', backgroundColor: '#FFF0EC', borderRadius: '0.5rem', marginBottom: '0.75rem' }}>
                          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.6rem', color: '#7a5c5c', margin: '0 0 0.2rem', fontWeight: 600, textTransform: 'uppercase' as const }}>📝 Special Requests</p>
                          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: '#2C1A1A', margin: 0 }}>{req.specialRequests}</p>
                        </div>
                      )}

                      {isPending ? (
                        <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(232,71,42,0.08)' }}>
                          <button onClick={() => handleApprove(req.id)} style={{ flex: 1, padding: '0.85rem', borderRadius: '9999px', border: 'none', backgroundColor: '#27AE60', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 12px rgba(39,174,96,0.3)' }}
                            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)' }}
                            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}>
                            ✅ Accept & Notify Client
                          </button>
                          <button onClick={() => handleReject(req.id)} style={{ flex: 1, padding: '0.85rem', borderRadius: '9999px', border: '1.5px solid rgba(192,57,43,0.4)', backgroundColor: 'transparent', color: '#C0392B', fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer' }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#C0392B'; e.currentTarget.style.color = 'white' }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#C0392B' }}>
                            ❌ Reject Request
                          </button>
                        </div>
                      ) : (
                        <div style={{ paddingTop: '1rem', borderTop: '1px solid rgba(232,71,42,0.08)' }}>
                          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: s.color, margin: 0, fontWeight: 500 }}>
                            {req.status === 'approved' ? '✅ Client has been notified of approval.' : '❌ Client has been notified of rejection.'}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* POST EVENT */}
        {activeTab === 'create' && (
          <div style={{ maxWidth: '700px' }}>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 0.5rem' }}>Post New Event ✨</h2>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', color: '#7a5c5c', margin: '0 0 2rem' }}>This event will be visible to all clients on the events page.</p>
            {showSuccess && (
              <div style={{ backgroundColor: 'rgba(39,174,96,0.1)', border: '1.5px solid #27AE60', borderRadius: '1rem', padding: '1rem 1.5rem', marginBottom: '1.5rem', fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', color: '#27AE60', fontWeight: 600 }}>
                ✅ Event posted! Clients can now see and book it.
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.25rem' }}>
              {[
                { label: 'EVENT TITLE *', key: 'title', placeholder: 'e.g. Summer Rooftop Concert' },
                { label: 'LOCATION *', key: 'location', placeholder: 'Venue name, City' },
                { label: 'PRICE / PACKAGE', key: 'price', placeholder: 'e.g. ₹999 per head or Free' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#2C1A1A', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>{field.label}</label>
                  <input value={form[field.key as keyof typeof form]} onChange={(e) => setForm({ ...form, [field.key]: e.target.value })} placeholder={field.placeholder} style={inputStyle}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#E8472A'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(232,71,42,0.2)'} />
                </div>
              ))}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#2C1A1A', display: 'block', marginBottom: '0.5rem' }}>CATEGORY</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} style={inputStyle}>
                    <option value="">Select</option>
                    {['Concert', 'Party', 'Festival', 'Wedding', 'Birthday', 'Corporate', 'Offer', 'Other'].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#2C1A1A', display: 'block', marginBottom: '0.5rem' }}>MAX CAPACITY</label>
                  <input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} placeholder="e.g. 200" style={inputStyle}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#E8472A'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(232,71,42,0.2)'} />
                </div>
                <div>
                  <label style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#2C1A1A', display: 'block', marginBottom: '0.5rem' }}>DATE *</label>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} style={inputStyle}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#E8472A'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(232,71,42,0.2)'} />
                </div>
                <div>
                  <label style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#2C1A1A', display: 'block', marginBottom: '0.5rem' }}>TIME</label>
                  <input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} style={inputStyle}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#E8472A'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(232,71,42,0.2)'} />
                </div>
              </div>
              <div>
                <label style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 600, color: '#2C1A1A', display: 'block', marginBottom: '0.5rem' }}>DESCRIPTION</label>
                <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Tell clients what to expect..." rows={4} style={{ ...inputStyle, resize: 'vertical' as const }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#E8472A'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(232,71,42,0.2)'} />
              </div>
              <button onClick={handleCreate} style={{ padding: '1rem 2.5rem', borderRadius: '9999px', border: 'none', backgroundColor: '#E8472A', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer', alignSelf: 'flex-start' as const, boxShadow: '0 4px 20px rgba(232,71,42,0.3)' }}>
                POST EVENT ✨
              </button>
            </div>
          </div>
        )}

        {/* DEV LOG */}
        {activeTab === 'devlog' && (
          <div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.5rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 1.5rem' }}>🔔 Activity Log</h2>
            {devLog.length === 0 ? (
              <div style={{ backgroundColor: 'white', borderRadius: '1.25rem', padding: '2rem', textAlign: 'center' as const }}>
                <p style={{ fontFamily: '"DM Sans", sans-serif', color: '#7a5c5c' }}>No activity yet.</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.75rem' }}>
                {devLog.map((log, i) => (
                  <div key={i} style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1rem 1.5rem', boxShadow: '0 2px 12px rgba(0,0,0,0.05)', display: 'flex', alignItems: 'center', gap: '1rem', borderLeft: '4px solid #E8472A' }}>
                    <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.65rem', color: '#7a5c5c', whiteSpace: 'nowrap' as const }}>{log.time}</span>
                    <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.7rem', fontWeight: 700, color: 'white', backgroundColor: '#E8472A', padding: '0.2rem 0.6rem', borderRadius: '9999px', whiteSpace: 'nowrap' as const }}>{log.type}</span>
                    <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', color: '#2C1A1A' }}>{log.message}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
