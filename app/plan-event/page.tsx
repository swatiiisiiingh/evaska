'use client'

import React, { useState } from 'react'
import { useApp } from '@/context/AppContext'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

const eventTypes = [
  { id: 'wedding', label: 'Wedding', emoji: '💍', desc: 'Ceremonies, receptions & sangeet nights', color: 'linear-gradient(135deg, #F9C5B0, #E8472A)' },
  { id: 'birthday', label: 'Birthday', emoji: '🎂', desc: 'Milestone parties & surprise setups', color: 'linear-gradient(135deg, #FF6B35, #FFD700)' },
  { id: 'corporate', label: 'Corporate', emoji: '🏆', desc: 'Galas, launches & award ceremonies', color: 'linear-gradient(135deg, #2C3E50, #3498DB)' },
  { id: 'bachelorette', label: 'Bachelorette', emoji: '🥂', desc: 'Pre-wedding brunches & night outs', color: 'linear-gradient(135deg, #fd79a8, #e84393)' },
  { id: 'anniversary', label: 'Anniversary', emoji: '💕', desc: 'Romantic & intimate celebrations', color: 'linear-gradient(135deg, #C0392B, #E8472A)' },
  { id: 'concert', label: 'Concert / Show', emoji: '🎵', desc: 'Live performances & music events', color: 'linear-gradient(135deg, #9B59B6, #3498DB)' },
  { id: 'festival', label: 'Festival', emoji: '🎆', desc: 'Cultural & seasonal celebrations', color: 'linear-gradient(135deg, #F7931E, #FFD700)' },
  { id: 'other', label: 'Something Else', emoji: '🎉', desc: 'Tell us your vision — we will create it', color: 'linear-gradient(135deg, #2C1A1A, #7a5c5c)' },
]

const themesByType: Record<string, string[]> = {
  wedding: ['Royal & Grand', 'Boho Rustic', 'Garden Floral', 'Minimalist Chic', 'Traditional Indian', 'Destination Beach', 'Vintage Old World', 'Luxury Contemporary'],
  birthday: ['Neon & Glow Party', 'Luxury Rooftop', 'Garden Picnic', 'Retro 80s/90s', 'Princess Royal', 'Hollywood Glam', 'Tropical Paradise', 'Masquerade Ball'],
  corporate: ['Black Tie Gala', 'Modern Startup', 'Luxury Networking', 'Award Ceremony', 'Product Launch', 'Team Retreat', 'Conference & Summit', 'Cocktail Evening'],
  bachelorette: ['Brunch & Bloom', 'Neon Night Out', 'Spa & Wellness', 'Garden Tea Party', 'Rooftop Sunset', 'Casino Night', 'Beach Getaway', 'Murder Mystery'],
  anniversary: ['Candlelit Romance', 'Garden Soiree', 'Luxury Dinner', 'Beach Sunset', 'Old Hollywood', 'Rustic Vineyard', 'Starry Night', 'Travel Theme'],
  concert: ['Acoustic Evening', 'DJ Night', 'Classical Concert', 'Open Mic', 'Bollywood Night', 'Rock Show', 'Sufi Night', 'Jazz & Blues'],
  festival: ['Navratri Special', 'Diwali Gala', 'Christmas Party', 'New Year Bash', 'Holi Celebration', 'Eid Festivity', 'Harvest Festival', 'Cultural Mela'],
  other: ['Surprise Us', 'Tell Us Below', 'Mix & Match', 'Completely Custom'],
}

const decorCategories = [
  {
    category: '🌸 Florals & Greenery',
    items: ['Fresh Flower Arrangements', 'Rose Petal Pathways', 'Floral Arch / Mandap', 'Hanging Floral Ceiling', 'Potted Plants & Succulents', 'Tropical Leaves Setup'],
  },
  {
    category: '✨ Lighting',
    items: ['Fairy String Lights', 'Neon Signs & Letters', 'Candle & Lantern Setup', 'Uplighting & Spotlights', 'Projection Mapping', 'Disco Ball & Dance Lights'],
  },
  {
    category: '🎈 Fun & Festive',
    items: ['Balloon Arch & Columns', 'Confetti Cannons', 'Giant Letter Balloons', 'Photo Booth Setup', 'Bubble Machine', 'Dry Ice & Fog Effect'],
  },
  {
    category: '🍽️ Tables & Staging',
    items: ['Luxury Table Settings', 'Centerpiece Arrangements', 'Custom Stage & Backdrop', 'Entrance Gate Decor', 'Red Carpet Setup', 'Throne / Sofa Seating'],
  },
  {
    category: '📸 Memories',
    items: ['Professional Photography', 'Videography & Reels', 'Drone Coverage', 'Live Streaming', 'Selfie Mirror Booth', 'Caricature Artist'],
  },
  {
    category: '🎭 Entertainment',
    items: ['Live Band / DJ', 'Dance Performance', 'Anchor / Emcee', 'Fireworks Display', 'Magician / Illusionist', 'Photo Slideshow'],
  },
]

const cateringOptions = ['Full Buffet', 'Plated Fine Dining', 'Cocktail & Mocktails Bar', 'Live Food Stations', 'Dessert & Cake Station', 'Customised Menu', 'Veg Only', 'Non-Veg Available', 'International Cuisine', 'Traditional Indian Thali']
const venueTypes = ['Hotel Banquet Hall', 'Outdoor Garden / Farmhouse', 'Rooftop Venue', 'Beach / Lakeside', 'Heritage / Palace Venue', 'Convention Center', 'Private Villa / Resort', 'Restaurant Buyout', 'Home / Backyard', 'Virtual / Online']
const budgetRanges = ['Under ₹50,000', '₹50K – ₹1L', '₹1L – ₹3L', '₹3L – ₹5L', '₹5L – ₹10L', '₹10L – ₹25L', 'Above ₹25L', 'Discuss with Evaska']
const guestCounts = ['Under 25', '25 – 50', '50 – 100', '100 – 200', '200 – 500', '500+', 'Intimate (under 10)', 'Discuss Later']
const timelines = ['This week', 'Within a month', '1–3 months away', '3–6 months away', '6–12 months away', 'More than a year', 'Not sure yet']

export default function PlanEventPage() {
  const { currentUser } = useApp()
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [selectedDecor, setSelectedDecor] = useState<string[]>([])
  const [selectedCatering, setSelectedCatering] = useState<string[]>([])
  const [form, setForm] = useState({
    eventType: '',
    theme: '',
    venueType: '',
    guests: '',
    budget: '',
    timeline: '',
    date: '',
    location: '',
    catering: [] as string[],
    decor: [] as string[],
    specialRequests: '',
    inspiration: '',
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    phone: '',
    preferredContact: 'WhatsApp',
  })

  const toggleItem = (item: string, list: string[], setList: (l: string[]) => void) => {
    setList(list.includes(item) ? list.filter(d => d !== item) : [...list, item])
  }

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.eventType) {
      toast.error('Please fill all required fields!')
      return
    }
    const requests = JSON.parse(localStorage.getItem('evaska_custom_requests') || '[]')
    const newRequest = {
      ...form,
      decor: selectedDecor.join(', '),
      catering: selectedCatering.join(', '),
      submittedAt: new Date().toLocaleString(),
      id: Date.now(),
    }
    requests.push(newRequest)
    localStorage.setItem('evaska_custom_requests', JSON.stringify(requests))
    setSubmitted(true)
    toast.success('Request submitted! 🎉')
  }

  const stepTitles = ['Event Type & Theme', 'Venue & Guest Details', 'Decor & Experience', 'Finalize & Submit']

  if (submitted) {
    return (
      <div style={{ backgroundColor: '#FFF0EC', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ backgroundColor: 'white', borderRadius: '2rem', padding: '4rem', textAlign: 'center' as const, maxWidth: '560px', boxShadow: '0 8px 40px rgba(0,0,0,0.1)' }}>
          <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>🎉</div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2.25rem', color: '#C0392B', fontWeight: 800, margin: '0 0 1rem' }}>We Got Your Request!</h2>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.95rem', color: '#7a5c5c', lineHeight: 1.8, margin: '0 0 1.5rem' }}>
            Thank you, <strong>{form.name}</strong>! Your <strong>{form.eventType}</strong> planning request has been received. Our team will reach out via <strong>{form.preferredContact}</strong> within 24 hours with a personalised proposal! ✨
          </p>
          <div style={{ backgroundColor: '#FFF0EC', borderRadius: '1rem', padding: '1rem 1.5rem', marginBottom: '2rem', textAlign: 'left' as const }}>
            {[
              { label: 'Event', value: `${form.eventType} — ${form.theme}` },
              { label: 'Date', value: form.date || 'TBD' },
              { label: 'Guests', value: form.guests || 'TBD' },
              { label: 'Budget', value: form.budget || 'TBD' },
            ].map((item, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.35rem 0', borderBottom: i < 3 ? '1px solid rgba(232,71,42,0.08)' : 'none' }}>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: '#7a5c5c' }}>{item.label}</span>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: '#2C1A1A', fontWeight: 600, textTransform: 'capitalize' as const }}>{item.value}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' as const }}>
            <button onClick={() => router.push('/my-events')} style={{ padding: '0.85rem 2rem', borderRadius: '9999px', border: 'none', backgroundColor: '#E8472A', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
              View My Requests
            </button>
            <button onClick={() => router.push('/events')} style={{ padding: '0.85rem 2rem', borderRadius: '9999px', border: '1.5px solid #E8472A', backgroundColor: 'transparent', color: '#E8472A', fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
              Browse Events
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ backgroundColor: '#FFF0EC', minHeight: '100vh' }}>

      {/* Hero */}
      <div style={{ backgroundColor: '#2C1A1A', padding: '4rem 7rem 3rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-40px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(232,71,42,0.08)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '40%', width: '200px', height: '200px', borderRadius: '50%', background: 'rgba(249,197,176,0.05)' }} />
        <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', letterSpacing: '0.15em', textTransform: 'uppercase' as const, color: '#F9C5B0', fontWeight: 600, display: 'block', marginBottom: '0.75rem', zIndex: 2, position: 'relative' }}>Custom Event Planning</span>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 4vw, 3.5rem)', color: 'white', fontWeight: 800, margin: '0 0 0.75rem', lineHeight: 1.15, position: 'relative', zIndex: 2 }}>
          Plan Your Dream Event ✨
        </h1>
        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.95rem', color: 'rgba(255,255,255,0.45)', margin: '0 0 2rem', maxWidth: '520px', lineHeight: 1.7, position: 'relative', zIndex: 2 }}>
          Fill in the details below and our team will craft a completely personalised proposal — decor, catering, entertainment and more.
        </p>

        {/* Progress Steps */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', position: 'relative', zIndex: 2 }}>
          {[1, 2, 3, 4].map((s, i) => (
            <React.Fragment key={s}>
              <div style={{ display: 'flex', flexDirection: 'column' as const, alignItems: 'center', gap: '0.4rem' }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  backgroundColor: step >= s ? '#E8472A' : 'rgba(255,255,255,0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', fontWeight: 700,
                  color: 'white', transition: 'all 0.3s',
                  boxShadow: step >= s ? '0 4px 12px rgba(232,71,42,0.4)' : 'none',
                }}>
                  {step > s ? '✓' : s}
                </div>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.62rem', color: step >= s ? '#F9C5B0' : 'rgba(255,255,255,0.25)', whiteSpace: 'nowrap' as const, fontWeight: step === s ? 600 : 400 }}>
                  {stepTitles[i]}
                </span>
              </div>
              {i < 3 && <div style={{ height: '2px', flex: 1, backgroundColor: step > s ? '#E8472A' : 'rgba(255,255,255,0.1)', margin: '0 0.5rem', marginBottom: '1.2rem', transition: 'all 0.3s', maxWidth: '80px' }} />}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div style={{ padding: '3rem 7rem 6rem' }}>

        {/* STEP 1 — Event Type & Theme */}
        {step === 1 && (
          <div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.75rem', color: '#2C1A1A', fontWeight: 800, margin: '0 0 0.5rem' }}>What are we celebrating? 🎊</h2>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', color: '#7a5c5c', margin: '0 0 2rem' }}>Choose your event type and we will tailor everything around it.</p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
              {eventTypes.map(type => (
                <div key={type.id}
                  onClick={() => setForm({ ...form, eventType: type.id, theme: '' })}
                  style={{
                    borderRadius: '1.25rem', overflow: 'hidden', cursor: 'pointer',
                    border: form.eventType === type.id ? '2.5px solid #E8472A' : '2.5px solid transparent',
                    boxShadow: form.eventType === type.id ? '0 12px 32px rgba(232,71,42,0.25)' : '0 4px 16px rgba(0,0,0,0.06)',
                    transform: form.eventType === type.id ? 'translateY(-4px)' : 'none',
                    transition: 'all 0.25s', backgroundColor: 'white',
                  }}>
                  <div style={{ height: '80px', background: type.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem' }}>
                    {type.emoji}
                  </div>
                  <div style={{ padding: '1rem' }}>
                    <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '0.95rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 0.25rem' }}>{type.label}</h3>
                    <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.72rem', color: '#7a5c5c', margin: 0, lineHeight: 1.4 }}>{type.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {form.eventType && themesByType[form.eventType] && (
              <div style={{ marginBottom: '2.5rem' }}>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.25rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 1rem' }}>Pick your theme 🎨</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.75rem' }}>
                  {themesByType[form.eventType].map(theme => (
                    <button key={theme} onClick={() => setForm({ ...form, theme })} style={{
                      padding: '0.65rem 1.35rem', borderRadius: '9999px',
                      border: form.theme === theme ? 'none' : '1.5px solid rgba(232,71,42,0.25)',
                      backgroundColor: form.theme === theme ? '#E8472A' : 'white',
                      color: form.theme === theme ? 'white' : '#7a5c5c',
                      fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                      boxShadow: form.theme === theme ? '0 4px 12px rgba(232,71,42,0.3)' : 'none',
                    }}>{theme}</button>
                  ))}
                </div>
              </div>
            )}

            <button onClick={() => { if (!form.eventType) { toast.error('Please select an event type!'); return } setStep(2) }}
              style={{ padding: '1rem 2.5rem', borderRadius: '9999px', border: 'none', backgroundColor: '#E8472A', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(232,71,42,0.3)', letterSpacing: '0.05em' }}>
              Next: Venue & Guests →
            </button>
          </div>
        )}

        {/* STEP 2 — Venue & Guest Details */}
        {step === 2 && (
          <div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.75rem', color: '#2C1A1A', fontWeight: 800, margin: '0 0 0.5rem' }}>Venue & Guest Details 📍</h2>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', color: '#7a5c5c', margin: '0 0 2rem' }}>Help us understand the scale and setting of your event.</p>

            {/* Venue Type */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 1rem' }}>Preferred Venue Type</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.75rem' }}>
                {venueTypes.map(v => (
                  <button key={v} onClick={() => setForm({ ...form, venueType: v })} style={{
                    padding: '0.65rem 1.35rem', borderRadius: '9999px',
                    border: form.venueType === v ? 'none' : '1.5px solid rgba(232,71,42,0.25)',
                    backgroundColor: form.venueType === v ? '#2C1A1A' : 'white',
                    color: form.venueType === v ? 'white' : '#7a5c5c',
                    fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                  }}>{v}</button>
                ))}
              </div>
            </div>

            {/* Guest Count */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 1rem' }}>Expected Guest Count</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.75rem' }}>
                {guestCounts.map(g => (
                  <button key={g} onClick={() => setForm({ ...form, guests: g })} style={{
                    padding: '0.65rem 1.35rem', borderRadius: '9999px',
                    border: form.guests === g ? 'none' : '1.5px solid rgba(232,71,42,0.25)',
                    backgroundColor: form.guests === g ? '#E8472A' : 'white',
                    color: form.guests === g ? 'white' : '#7a5c5c',
                    fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                  }}>{g}</button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 1rem' }}>Your Budget Range</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.75rem' }}>
                {budgetRanges.map(b => (
                  <button key={b} onClick={() => setForm({ ...form, budget: b })} style={{
                    padding: '0.65rem 1.35rem', borderRadius: '9999px',
                    border: form.budget === b ? 'none' : '1.5px solid rgba(232,71,42,0.25)',
                    backgroundColor: form.budget === b ? '#2C1A1A' : 'white',
                    color: form.budget === b ? 'white' : '#7a5c5c',
                    fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                  }}>{b}</button>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 1rem' }}>When is this event?</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.75rem', marginBottom: '1rem' }}>
                {timelines.map(t => (
                  <button key={t} onClick={() => setForm({ ...form, timeline: t })} style={{
                    padding: '0.65rem 1.35rem', borderRadius: '9999px',
                    border: form.timeline === t ? 'none' : '1.5px solid rgba(232,71,42,0.25)',
                    backgroundColor: form.timeline === t ? '#E8472A' : 'white',
                    color: form.timeline === t ? 'white' : '#7a5c5c',
                    fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                  }}>{t}</button>
                ))}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#2C1A1A', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.06em' }}>EXACT DATE (if known)</label>
                  <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
                    style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '0.75rem', border: '1.5px solid rgba(232,71,42,0.2)', backgroundColor: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: '#2C1A1A', outline: 'none', boxSizing: 'border-box' as const }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#E8472A'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(232,71,42,0.2)'} />
                </div>
                <div>
                  <label style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#2C1A1A', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.06em' }}>PREFERRED CITY / LOCATION</label>
                  <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} placeholder="e.g. Mumbai, Delhi, Jaipur"
                    style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '0.75rem', border: '1.5px solid rgba(232,71,42,0.2)', backgroundColor: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: '#2C1A1A', outline: 'none', boxSizing: 'border-box' as const }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#E8472A'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(232,71,42,0.2)'} />
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setStep(1)} style={{ padding: '1rem 2rem', borderRadius: '9999px', border: '1.5px solid rgba(44,26,26,0.2)', backgroundColor: 'transparent', color: '#2C1A1A', fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>← Back</button>
              <button onClick={() => setStep(3)} style={{ padding: '1rem 2.5rem', borderRadius: '9999px', border: 'none', backgroundColor: '#E8472A', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(232,71,42,0.3)' }}>
                Next: Decor & Extras →
              </button>
            </div>
          </div>
        )}

        {/* STEP 3 — Decor & Experience */}
        {step === 3 && (
          <div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.75rem', color: '#2C1A1A', fontWeight: 800, margin: '0 0 0.5rem' }}>Decor & Experience 🌸</h2>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', color: '#7a5c5c', margin: '0 0 2rem' }}>Select everything you want — mix and match freely. We will make it work!</p>

            {decorCategories.map((cat, ci) => (
              <div key={ci} style={{ marginBottom: '2rem' }}>
                <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.05rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 0.75rem' }}>{cat.category}</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.65rem' }}>
                  {cat.items.map(item => (
                    <button key={item} onClick={() => toggleItem(item, selectedDecor, setSelectedDecor)} style={{
                      padding: '0.55rem 1.1rem', borderRadius: '9999px',
                      border: selectedDecor.includes(item) ? 'none' : '1.5px solid rgba(232,71,42,0.2)',
                      backgroundColor: selectedDecor.includes(item) ? '#E8472A' : 'white',
                      color: selectedDecor.includes(item) ? 'white' : '#7a5c5c',
                      fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                    }}>{selectedDecor.includes(item) ? '✓ ' : ''}{item}</button>
                  ))}
                </div>
              </div>
            ))}

            {/* Catering */}
            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.05rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 0.75rem' }}>🍽️ Catering Preferences</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap' as const, gap: '0.65rem' }}>
                {cateringOptions.map(item => (
                  <button key={item} onClick={() => toggleItem(item, selectedCatering, setSelectedCatering)} style={{
                    padding: '0.55rem 1.1rem', borderRadius: '9999px',
                    border: selectedCatering.includes(item) ? 'none' : '1.5px solid rgba(232,71,42,0.2)',
                    backgroundColor: selectedCatering.includes(item) ? '#2C1A1A' : 'white',
                    color: selectedCatering.includes(item) ? 'white' : '#7a5c5c',
                    fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                  }}>{selectedCatering.includes(item) ? '✓ ' : ''}{item}</button>
                ))}
              </div>
            </div>

            {/* Selected summary */}
            {(selectedDecor.length > 0 || selectedCatering.length > 0) && (
              <div style={{ backgroundColor: 'white', borderRadius: '1rem', padding: '1.25rem 1.5rem', marginBottom: '2rem', border: '1.5px solid rgba(232,71,42,0.12)' }}>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.78rem', color: '#7a5c5c', margin: '0 0 0.5rem', fontWeight: 600 }}>SELECTED ({selectedDecor.length + selectedCatering.length} items)</p>
                <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', color: '#2C1A1A', margin: 0, lineHeight: 1.6 }}>
                  {[...selectedDecor, ...selectedCatering].join(' • ')}
                </p>
              </div>
            )}

            {/* Special requests */}
            <div style={{ marginBottom: '2rem' }}>
              <label style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.78rem', fontWeight: 600, color: '#2C1A1A', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.06em' }}>SPECIAL REQUESTS / INSPIRATION</label>
              <textarea value={form.specialRequests} onChange={(e) => setForm({ ...form, specialRequests: e.target.value })}
                placeholder="Share any Pinterest boards, Instagram inspo, color palettes, specific requirements, or anything you want us to know..."
                rows={4}
                style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '0.75rem', border: '1.5px solid rgba(232,71,42,0.2)', backgroundColor: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: '#2C1A1A', outline: 'none', boxSizing: 'border-box' as const, resize: 'vertical' as const }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#E8472A'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(232,71,42,0.2)'} />
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setStep(2)} style={{ padding: '1rem 2rem', borderRadius: '9999px', border: '1.5px solid rgba(44,26,26,0.2)', backgroundColor: 'transparent', color: '#2C1A1A', fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>← Back</button>
              <button onClick={() => setStep(4)} style={{ padding: '1rem 2.5rem', borderRadius: '9999px', border: 'none', backgroundColor: '#E8472A', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(232,71,42,0.3)' }}>
                Next: Finalize →
              </button>
            </div>
          </div>
        )}

        {/* STEP 4 — Contact & Submit */}
        {step === 4 && (
          <div>
            <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.75rem', color: '#2C1A1A', fontWeight: 800, margin: '0 0 0.5rem' }}>Almost There! 🎯</h2>
            <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', color: '#7a5c5c', margin: '0 0 2rem' }}>Leave your details and we will get back to you within 24 hours.</p>

            {/* Full Summary */}
            <div style={{ backgroundColor: 'white', borderRadius: '1.5rem', padding: '2rem', marginBottom: '2rem', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', border: '1.5px solid rgba(232,71,42,0.1)' }}>
              <h3 style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.1rem', color: '#2C1A1A', fontWeight: 700, margin: '0 0 1.25rem' }}>📋 Your Event Summary</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
                {[
                  { label: 'Event Type', value: form.eventType },
                  { label: 'Theme', value: form.theme || '—' },
                  { label: 'Venue Type', value: form.venueType || '—' },
                  { label: 'Guests', value: form.guests || '—' },
                  { label: 'Budget', value: form.budget || '—' },
                  { label: 'Timeline', value: form.timeline || '—' },
                  { label: 'Date', value: form.date || '—' },
                  { label: 'Location', value: form.location || '—' },
                ].map((item, i) => (
                  <div key={i} style={{ padding: '0.6rem 0.75rem', backgroundColor: '#FFF0EC', borderRadius: '0.5rem' }}>
                    <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.65rem', color: '#7a5c5c', margin: '0 0 0.15rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{item.label}</p>
                    <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', color: '#2C1A1A', margin: 0, fontWeight: 500, textTransform: 'capitalize' as const }}>{item.value}</p>
                  </div>
                ))}
              </div>
              {selectedDecor.length > 0 && (
                <div style={{ padding: '0.6rem 0.75rem', backgroundColor: '#FFF0EC', borderRadius: '0.5rem', marginBottom: '0.5rem' }}>
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.65rem', color: '#7a5c5c', margin: '0 0 0.25rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Decor ({selectedDecor.length})</p>
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.78rem', color: '#2C1A1A', margin: 0 }}>{selectedDecor.join(', ')}</p>
                </div>
              )}
              {selectedCatering.length > 0 && (
                <div style={{ padding: '0.6rem 0.75rem', backgroundColor: '#FFF0EC', borderRadius: '0.5rem' }}>
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.65rem', color: '#7a5c5c', margin: '0 0 0.25rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>Catering ({selectedCatering.length})</p>
                  <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.78rem', color: '#2C1A1A', margin: 0 }}>{selectedCatering.join(', ')}</p>
                </div>
              )}
            </div>

            {/* Contact Info */}
            <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#2C1A1A', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.06em' }}>YOUR NAME *</label>
                  <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name"
                    style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '0.75rem', border: '1.5px solid rgba(232,71,42,0.2)', backgroundColor: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: '#2C1A1A', outline: 'none', boxSizing: 'border-box' as const }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#E8472A'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(232,71,42,0.2)'} />
                </div>
                <div>
                  <label style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#2C1A1A', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.06em' }}>PHONE NUMBER</label>
                  <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210"
                    style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '0.75rem', border: '1.5px solid rgba(232,71,42,0.2)', backgroundColor: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: '#2C1A1A', outline: 'none', boxSizing: 'border-box' as const }}
                    onFocus={(e) => e.currentTarget.style.borderColor = '#E8472A'}
                    onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(232,71,42,0.2)'} />
                </div>
              </div>
              <div>
                <label style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#2C1A1A', display: 'block', marginBottom: '0.5rem', letterSpacing: '0.06em' }}>EMAIL ADDRESS *</label>
                <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@example.com"
                  style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '0.75rem', border: '1.5px solid rgba(232,71,42,0.2)', backgroundColor: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: '#2C1A1A', outline: 'none', boxSizing: 'border-box' as const }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#E8472A'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(232,71,42,0.2)'} />
              </div>

              {/* Preferred contact */}
              <div>
                <label style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', fontWeight: 600, color: '#2C1A1A', display: 'block', marginBottom: '0.75rem', letterSpacing: '0.06em' }}>HOW SHOULD WE CONTACT YOU?</label>
                <div style={{ display: 'flex', gap: '0.75rem' }}>
                  {['WhatsApp', 'Phone Call', 'Email', 'Any'].map(c => (
                    <button key={c} onClick={() => setForm({ ...form, preferredContact: c })} style={{
                      padding: '0.6rem 1.25rem', borderRadius: '9999px',
                      border: form.preferredContact === c ? 'none' : '1.5px solid rgba(232,71,42,0.25)',
                      backgroundColor: form.preferredContact === c ? '#E8472A' : 'white',
                      color: form.preferredContact === c ? 'white' : '#7a5c5c',
                      fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s',
                    }}>{c}</button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <button onClick={() => setStep(3)} style={{ padding: '1rem 2rem', borderRadius: '9999px', border: '1.5px solid rgba(44,26,26,0.2)', backgroundColor: 'transparent', color: '#2C1A1A', fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', fontWeight: 600, cursor: 'pointer' }}>← Back</button>
              <button onClick={handleSubmit} style={{ padding: '1rem 3rem', borderRadius: '9999px', border: 'none', backgroundColor: '#E8472A', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer', boxShadow: '0 4px 20px rgba(232,71,42,0.35)', letterSpacing: '0.05em' }}>
                SUBMIT REQUEST ✨
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="4rem 7rem 3rem"] { padding: 3rem 1.5rem 2rem !important; }
          div[style*="3rem 7rem 6rem"] { padding: 2rem 1.5rem 4rem !important; }
          div[style*="repeat(4, 1fr)"] { grid-template-columns: repeat(2,1fr) !important; }
          div[style*="repeat(2, 1fr)"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
