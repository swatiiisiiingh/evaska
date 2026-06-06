'use client'

import React, { useState } from 'react'

const contactInfo = [
  {
    icon: '📍',
    title: 'Our Office',
    lines: ['Evaska HQ, 4th Floor', 'Bandra West, Mumbai 400050'],
  },
  {
    icon: '📞',
    title: 'Call Us',
    lines: ['+91 98765 43210', '+91 12345 67890'],
  },
  {
    icon: '✉️',
    title: 'Email Us',
    lines: ['hello@evaska.com', 'support@evaska.com'],
  },
  {
    icon: '🕐',
    title: 'Working Hours',
    lines: ['Mon – Sat: 9am – 7pm', 'Sunday: 10am – 4pm'],
  },
]

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.message) return
    setSubmitted(true)
    setForm({ name: '', email: '', phone: '', eventType: '', message: '' })
    setTimeout(() => setSubmitted(false), 4000)
  }

  return (
    <div style={{ backgroundColor: '#FFF0EC', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <div style={{
        backgroundColor: '#2C1A1A',
        padding: '5rem 7rem 4rem',
        position: 'relative',
        overflow: 'hidden',
        textAlign: 'center' as const,
      }}>
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '350px', height: '350px', borderRadius: '50%',
          background: 'rgba(232,71,42,0.08)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-60px', left: '-60px',
          width: '250px', height: '250px', borderRadius: '50%',
          background: 'rgba(249,197,176,0.05)',
        }} />

        <span style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.75rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase' as const,
          color: '#F9C5B0',
          fontWeight: 600,
          position: 'relative',
          zIndex: 2,
          display: 'block',
          marginBottom: '0.75rem',
        }}>
          Get In Touch
        </span>
        <h1 style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          color: 'white',
          fontWeight: 800,
          margin: '0 0 1rem',
          lineHeight: 1.15,
          position: 'relative',
          zIndex: 2,
        }}>
          Let&apos;s Plan Something<br />
          <span style={{ fontFamily: '"Dancing Script", cursive', color: '#F9C5B0' }}>
            Unforgettable
          </span>
        </h1>
        <p style={{
          fontFamily: '"DM Sans", sans-serif',
          fontSize: '0.95rem',
          color: 'rgba(255,255,255,0.45)',
          margin: '0 auto',
          maxWidth: '480px',
          lineHeight: 1.8,
          position: 'relative',
          zIndex: 2,
        }}>
          Have an event in mind? A question? Or just want to say hello?
          We would love to hear from you.
        </p>
      </div>

      {/* ── Contact Info Cards ── */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '1.25rem',
        padding: '3rem 7rem',
        marginTop: '-2rem',
        position: 'relative',
        zIndex: 10,
      }}>
        {contactInfo.map((info, i) => (
          <div key={i} style={{
            backgroundColor: 'white',
            borderRadius: '1.25rem',
            padding: '1.75rem',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            border: '1.5px solid rgba(232,71,42,0.08)',
            textAlign: 'center' as const,
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{info.icon}</div>
            <h3 style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: '0.95rem',
              color: '#2C1A1A',
              fontWeight: 700,
              margin: '0 0 0.5rem',
            }}>
              {info.title}
            </h3>
            {info.lines.map((line, j) => (
              <p key={j} style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.82rem',
                color: '#7a5c5c',
                margin: '0.15rem 0',
                lineHeight: 1.6,
              }}>
                {line}
              </p>
            ))}
          </div>
        ))}
      </div>

      {/* ── Main Section ── */}
      <div style={{
        padding: '2rem 7rem 6rem',
        display: 'grid',
        gridTemplateColumns: '1fr 1.2fr',
        gap: '4rem',
        alignItems: 'start',
      }}>

        {/* Left — FAQ / Why Us */}
        <div>
          <span style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.75rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase' as const,
            color: '#E8472A',
            fontWeight: 600,
          }}>
            Why Evaska?
          </span>
          <h2 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: 'clamp(1.75rem, 2.5vw, 2.25rem)',
            color: '#C0392B',
            fontWeight: 800,
            margin: '0.5rem 0 1.5rem',
            lineHeight: 1.2,
          }}>
            We Are With You<br />Every Step
          </h2>

          {[
            {
              q: 'How soon should I book?',
              a: 'We recommend booking at least 4–6 weeks in advance for smaller events and 3–6 months for weddings or large corporate events.',
            },
            {
              q: 'Do you handle virtual events?',
              a: 'Absolutely! We manage hybrid and fully virtual events with live streaming, digital décor, and online guest management.',
            },
            {
              q: 'What is your cancellation policy?',
              a: 'Full refund up to 30 days before. 50% refund up to 15 days. No refund within 7 days unless due to force majeure.',
            },
            {
              q: 'Do you work outside Mumbai?',
              a: 'Yes! We are currently operational in Mumbai, Delhi, Bangalore, Pune, and Hyderabad with plans to expand further.',
            },
          ].map((faq, i) => (
            <div key={i} style={{
              borderBottom: '1px solid rgba(232,71,42,0.1)',
              paddingBottom: '1.25rem',
              marginBottom: '1.25rem',
            }}>
              <h4 style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.9rem',
                fontWeight: 700,
                color: '#2C1A1A',
                margin: '0 0 0.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
                <span style={{ color: '#E8472A' }}>+</span>
                {faq.q}
              </h4>
              <p style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.83rem',
                color: '#7a5c5c',
                lineHeight: 1.7,
                margin: 0,
                paddingLeft: '1rem',
              }}>
                {faq.a}
              </p>
            </div>
          ))}

          {/* Social row */}
          <div style={{ marginTop: '2rem' }}>
            <p style={{
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.8rem',
              color: '#7a5c5c',
              fontWeight: 600,
              margin: '0 0 0.75rem',
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
            }}>
              Follow Us
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {['IG', 'FB', 'PT', 'LI'].map((s) => (
                <button
                  key={s}
                  onClick={() => {}}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1.5px solid rgba(232,71,42,0.25)',
                    background: 'transparent',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#E8472A',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    fontFamily: '"DM Sans", sans-serif',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#E8472A'
                    e.currentTarget.style.color = 'white'
                    e.currentTarget.style.borderColor = '#E8472A'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent'
                    e.currentTarget.style.color = '#E8472A'
                    e.currentTarget.style.borderColor = 'rgba(232,71,42,0.25)'
                  }}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right — Contact Form */}
        <div style={{
          backgroundColor: 'white',
          borderRadius: '2rem',
          padding: '2.5rem',
          boxShadow: '0 8px 40px rgba(0,0,0,0.08)',
          border: '1.5px solid rgba(232,71,42,0.08)',
        }}>
          <h3 style={{
            fontFamily: '"Playfair Display", serif',
            fontSize: '1.5rem',
            color: '#2C1A1A',
            fontWeight: 700,
            margin: '0 0 0.35rem',
          }}>
            Send Us a Message
          </h3>
          <p style={{
            fontFamily: '"DM Sans", sans-serif',
            fontSize: '0.83rem',
            color: '#7a5c5c',
            margin: '0 0 2rem',
          }}>
            We typically respond within 24 hours.
          </p>

          {/* Success message */}
          {submitted && (
            <div style={{
              backgroundColor: 'rgba(39,174,96,0.1)',
              border: '1.5px solid #27AE60',
              borderRadius: '1rem',
              padding: '1rem 1.5rem',
              marginBottom: '1.5rem',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '0.875rem',
              color: '#27AE60',
              fontWeight: 600,
            }}>
              ✅ Message sent! We will get back to you shortly.
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '1.1rem' }}>

            {/* Name + Email */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#2C1A1A',
                  display: 'block',
                  marginBottom: '0.4rem',
                  letterSpacing: '0.06em',
                }}>
                  YOUR NAME *
                </label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Priya Sharma"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '0.75rem',
                    border: '1.5px solid rgba(232,71,42,0.18)',
                    backgroundColor: '#FFF0EC',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.875rem',
                    color: '#2C1A1A',
                    outline: 'none',
                    boxSizing: 'border-box' as const,
                    transition: 'border 0.2s',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#E8472A'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(232,71,42,0.18)'}
                />
              </div>
              <div>
                <label style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#2C1A1A',
                  display: 'block',
                  marginBottom: '0.4rem',
                  letterSpacing: '0.06em',
                }}>
                  EMAIL *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@example.com"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '0.75rem',
                    border: '1.5px solid rgba(232,71,42,0.18)',
                    backgroundColor: '#FFF0EC',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.875rem',
                    color: '#2C1A1A',
                    outline: 'none',
                    boxSizing: 'border-box' as const,
                    transition: 'border 0.2s',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#E8472A'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(232,71,42,0.18)'}
                />
              </div>
            </div>

            {/* Phone + Event Type */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div>
                <label style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#2C1A1A',
                  display: 'block',
                  marginBottom: '0.4rem',
                  letterSpacing: '0.06em',
                }}>
                  PHONE
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '0.75rem',
                    border: '1.5px solid rgba(232,71,42,0.18)',
                    backgroundColor: '#FFF0EC',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.875rem',
                    color: '#2C1A1A',
                    outline: 'none',
                    boxSizing: 'border-box' as const,
                    transition: 'border 0.2s',
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#E8472A'}
                  onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(232,71,42,0.18)'}
                />
              </div>
              <div>
                <label style={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#2C1A1A',
                  display: 'block',
                  marginBottom: '0.4rem',
                  letterSpacing: '0.06em',
                }}>
                  EVENT TYPE
                </label>
                <select
                  value={form.eventType}
                  onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1rem',
                    borderRadius: '0.75rem',
                    border: '1.5px solid rgba(232,71,42,0.18)',
                    backgroundColor: '#FFF0EC',
                    fontFamily: '"DM Sans", sans-serif',
                    fontSize: '0.875rem',
                    color: '#2C1A1A',
                    outline: 'none',
                    cursor: 'pointer',
                    boxSizing: 'border-box' as const,
                  }}
                >
                  <option value="">Select type</option>
                  {['Wedding', 'Birthday', 'Corporate', 'Bachelorette', 'Fireworks', 'Other'].map(t => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label style={{
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#2C1A1A',
                display: 'block',
                marginBottom: '0.4rem',
                letterSpacing: '0.06em',
              }}>
                YOUR MESSAGE *
              </label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell us about your event — date, guest count, venue ideas, or anything on your mind..."
                rows={5}
                style={{
                  width: '100%',
                  padding: '0.85rem 1rem',
                  borderRadius: '0.75rem',
                  border: '1.5px solid rgba(232,71,42,0.18)',
                  backgroundColor: '#FFF0EC',
                  fontFamily: '"DM Sans", sans-serif',
                  fontSize: '0.875rem',
                  color: '#2C1A1A',
                  outline: 'none',
                  resize: 'vertical' as const,
                  boxSizing: 'border-box' as const,
                  transition: 'border 0.2s',
                  lineHeight: 1.7,
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = '#E8472A'}
                onBlur={(e) => e.currentTarget.style.borderColor = 'rgba(232,71,42,0.18)'}
              />
            </div>

            {/* Submit */}
            <button
              onClick={handleSubmit}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: '9999px',
                border: 'none',
                backgroundColor: '#E8472A',
                color: 'white',
                fontFamily: '"DM Sans", sans-serif',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.1em',
                transition: 'all 0.3s',
                boxShadow: '0 4px 20px rgba(232,71,42,0.3)',
                marginTop: '0.5rem',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#C0392B'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 8px 28px rgba(232,71,42,0.45)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#E8472A'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(232,71,42,0.3)'
              }}
            >
              SEND MESSAGE →
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) {
          div[style*="gridTemplateColumns: 'repeat(4, 1fr)'"] {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 768px) {
          div[style*="padding: '5rem 7rem 4rem'"] {
            padding: 3rem 1.5rem 2.5rem !important;
          }
          div[style*="padding: '3rem 7rem'"] {
            padding: 1.5rem !important;
          }
          div[style*="padding: '2rem 7rem 6rem'"] {
            padding: 2rem 1.5rem 4rem !important;
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}