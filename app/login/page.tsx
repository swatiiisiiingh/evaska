'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useApp } from '@/context/AppContext'
import { useFirebaseAuth } from '@/lib/useFirebaseAuth'

export default function LoginPage() {
  const [googleLoading, setGoogleLoading] = useState(false)
  const [error, setError] = useState('')
  const { setCurrentUser, currentUser } = useApp()
  const { signInWithGoogle } = useFirebaseAuth()
  const router = useRouter()

  useEffect(() => {
    if (currentUser) router.push('/events')
  }, [currentUser, router])

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true)
    setError('')
    try {
      const user = await signInWithGoogle()
      if (user) {
        const userData = {
          id: `user-${user.uid}`,
          name: user.displayName || user.email?.split('@')[0] || 'Guest',
          email: user.email || '',
          role: 'attendee' as const,
        }
        localStorage.setItem('evaska_user', JSON.stringify(userData))
        setCurrentUser(userData)
        router.push('/events')
      }
    } catch {
      setError('Google sign in failed. Please try again.')
    }
    setGoogleLoading(false)
  }

  return (
    <div style={{ backgroundColor: '#FFF0EC', minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>

      {/* LEFT decorative */}
      <div style={{ background: 'linear-gradient(160deg, #2C1A1A 0%, #4a2020 50%, #C0392B 100%)', display: 'flex', flexDirection: 'column' as const, justifyContent: 'space-between', padding: '4rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-80px', right: '-80px', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(232,71,42,0.2)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-60px', width: '280px', height: '280px', borderRadius: '50%', background: 'rgba(249,197,176,0.1)' }} />
        <Link href="/" style={{ textDecoration: 'none', zIndex: 2 }}>
          <span style={{ fontFamily: '"Dancing Script", cursive', fontSize: '2.5rem', color: '#F9C5B0', fontWeight: 700 }}>Evaska</span>
        </Link>
        <div style={{ zIndex: 2 }}>
          <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎉</div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: 'white', fontWeight: 800, margin: '0 0 1rem', lineHeight: 1.2 }}>
            Where Every<br />Event Comes<br />Alive
          </h2>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.8, margin: 0, maxWidth: '320px' }}>
            Sign in to browse events, plan your dream celebration, and book with ease.
          </p>
        </div>
        <div style={{ zIndex: 2, backgroundColor: 'rgba(255,255,255,0.07)', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.1)' }}>
          <p style={{ fontFamily: '"Playfair Display", serif', fontSize: '1rem', color: 'white', fontStyle: 'italic', margin: '0 0 0.75rem', lineHeight: 1.6 }}>
            "Evaska turned our wedding vision into reality. Absolutely magical!"
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#E8472A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', fontWeight: 700 }}>P</div>
            <div>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: 'white', fontWeight: 600, margin: 0 }}>Priya Sharma</p>
              <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', margin: 0 }}>Wedding Client, 2025</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT */}
      <div style={{ display: 'flex', flexDirection: 'column' as const, justifyContent: 'center', padding: '4rem 5rem' }}>
        <div style={{ marginBottom: '2.5rem' }}>
          <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '3rem', color: '#2C1A1A', fontWeight: 800, margin: '0 0 0.5rem', textTransform: 'uppercase' as const }}>
            Welcome
          </h1>
          <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: '#7a5c5c', margin: 0 }}>
            Sign in to discover & book amazing events
          </p>
        </div>

        {/* What you get */}
        <div style={{ display: 'flex', flexDirection: 'column' as const, gap: '0.75rem', marginBottom: '2.5rem' }}>
          {[
            { icon: '🎪', text: 'Browse all public events & offers' },
            { icon: '🎟️', text: 'RSVP & book events instantly' },
            { icon: '💍', text: 'Plan custom weddings, birthdays & more' },
            { icon: '📋', text: 'Track all your bookings in one place' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 1rem', backgroundColor: 'white', borderRadius: '0.75rem', border: '1.5px solid rgba(232,71,42,0.08)' }}>
              <span style={{ fontSize: '1.2rem' }}>{item.icon}</span>
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.85rem', color: '#2C1A1A', fontWeight: 500 }}>{item.text}</span>
            </div>
          ))}
        </div>

        {error && (
          <div style={{ backgroundColor: 'rgba(192,57,43,0.1)', border: '1.5px solid #C0392B', borderRadius: '0.75rem', padding: '0.75rem 1rem', marginBottom: '1.25rem', fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', color: '#C0392B' }}>
            ⚠️ {error}
          </div>
        )}

        <button
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          style={{
            width: '100%', padding: '1.1rem', borderRadius: '9999px',
            border: '1.5px solid rgba(44,26,26,0.15)', backgroundColor: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '0.85rem', cursor: googleLoading ? 'not-allowed' : 'pointer',
            fontFamily: '"DM Sans", sans-serif', fontSize: '0.95rem', fontWeight: 700,
            color: '#2C1A1A', boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
            transition: 'all 0.2s', opacity: googleLoading ? 0.7 : 1,
          }}
          onMouseEnter={(e) => {
            if (!googleLoading) {
              e.currentTarget.style.boxShadow = '0 8px 24px rgba(232,71,42,0.2)'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.08)'
            e.currentTarget.style.transform = 'translateY(0)'
          }}
        >
          {googleLoading ? <span>⏳</span> : (
            <svg width="22" height="22" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
          )}
          {googleLoading ? 'Signing in...' : 'Continue with Google'}
        </button>

        <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.78rem', color: 'rgba(122,92,92,0.5)', textAlign: 'center' as const, marginTop: '1.5rem', lineHeight: 1.6 }}>
          🔒 Secured by Google & Firebase. We never store your password.
        </p>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="gridTemplateColumns: '1fr 1fr'"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  )
}
