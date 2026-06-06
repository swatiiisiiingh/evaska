'use client'

import React from 'react'
import Link from 'next/link'
import { useApp } from '@/context/AppContext'
import { useRouter } from 'next/navigation'

export default function Navbar() {
  const { currentUser, logout } = useApp()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <nav style={{ backgroundColor: '#FFF0EC', borderBottom: '1px solid rgba(232,71,42,0.1)', position: 'sticky', top: 0, zIndex: 50 }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '1rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: '"Dancing Script", cursive', fontSize: '2rem', color: '#E8472A', fontWeight: 700 }}>Evaska</span>
        </Link>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {[
            { label: 'HOME', href: '/' },
            { label: 'EVENTS', href: '/events' },
            { label: 'PLAN EVENT', href: '/plan-event' },
            { label: 'ABOUT', href: '/about' },
            { label: 'CONTACT', href: '/contact' },
          ].map((link) => (
            <Link key={link.href} href={link.href}
              style={{ textDecoration: 'none', color: '#2C1A1A', fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', fontWeight: 500, letterSpacing: '0.08em' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = '#E8472A' }}
              onMouseLeave={(e) => { e.currentTarget.style.color = '#2C1A1A' }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {/* Profile button */}
              <Link href="/profile" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', borderRadius: '9999px', backgroundColor: 'rgba(232,71,42,0.08)', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(232,71,42,0.15)' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(232,71,42,0.08)' }}
              >
                <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: '#E8472A', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', color: 'white', fontWeight: 700 }}>
                  {currentUser.name[0].toUpperCase()}
                </div>
                <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.82rem', color: '#2C1A1A', fontWeight: 600 }}>
                  {currentUser.name.split(' ')[0]}
                </span>
              </Link>
              <button onClick={handleLogout}
                style={{ padding: '0.5rem 1.25rem', borderRadius: '9999px', border: '1.5px solid #E8472A', backgroundColor: 'transparent', color: '#E8472A', fontFamily: '"DM Sans", sans-serif', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s' }}
                onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#E8472A'; e.currentTarget.style.color = 'white' }}
                onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#E8472A' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <span style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.8rem', color: '#2C1A1A', fontWeight: 500, whiteSpace: 'nowrap' as const }}>CALL +123 456 789</span>
              <Link href="/login" style={{ textDecoration: 'none' }}>
                <div style={{ width: '40px', height: '40px', backgroundColor: '#E8472A', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
