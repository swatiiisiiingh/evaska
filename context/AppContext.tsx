'use client'

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react'

export type Role = 'attendee' | 'organizer' | null

export interface User {
  id: string
  name: string
  email: string
  role: Role
}

export interface Event {
  id: number
  organizerId: string
  organizerName: string
  title: string
  category: string
  date: string
  time: string
  location: string
  spots: number
  totalSpots: number
  emoji: string
  color: string
  tag: string
  tagColor: string
  price: string
  description: string
}

export interface RSVP {
  userId: string
  eventId: number
}

export interface Organizer {
  id: string
  name: string
  email: string
  bio: string
  eventsCount: number
  joinedDate: string
}

interface AppContextType {
  currentUser: User | null
  setCurrentUser: (user: User | null) => void
  events: Event[]
  setEvents: (events: Event[]) => void
  rsvps: RSVP[]
  setRsvps: (rsvps: RSVP[]) => void
  organizers: Organizer[]
  setOrganizers: (organizers: Organizer[]) => void
  addEvent: (event: Event) => void
  addRsvp: (rsvp: RSVP) => void
  cancelRsvp: (userId: string, eventId: number) => void
  registerOrganizer: (org: Organizer) => void
  logout: () => void
  devLog: { type: string; message: string; time: string }[]
}

const AppContext = createContext<AppContextType | null>(null)

const initialOrganizers: Organizer[] = [
  { id: 'org-1', name: 'Priya Events Co.', email: 'priya@evaska.com', bio: 'Specializing in weddings and luxury events since 2018.', eventsCount: 3, joinedDate: 'Jan 2024' },
  { id: 'org-2', name: 'Rahul Celebrations', email: 'rahul@evaska.com', bio: 'Corporate and birthday event experts based in Delhi.', eventsCount: 2, joinedDate: 'Mar 2024' },
]

const initialEvents: Event[] = [
  { id: 1, organizerId: 'org-1', organizerName: 'Priya Events Co.', title: 'Royal Wedding Setup', category: 'Wedding', date: 'June 15, 2026', time: '6:00 PM', location: 'Grand Ballroom, Mumbai', spots: 8, totalSpots: 50, emoji: '💍', color: 'linear-gradient(135deg, #F9C5B0 0%, #e8a090 50%, #d4756a 100%)', tag: 'Premium', tagColor: '#9B59B6', price: '₹85,000', description: 'An elegant wedding setup with floral arches and fairy lights.' },
  { id: 2, organizerId: 'org-2', organizerName: 'Rahul Celebrations', title: 'Neon Birthday Bash', category: 'Birthday', date: 'June 22, 2026', time: '8:00 PM', location: 'Rooftop Venue, Delhi', spots: 15, totalSpots: 30, emoji: '🎂', color: 'linear-gradient(135deg, #FF6B35 0%, #F7931E 50%, #FFD700 100%)', tag: 'Most Popular', tagColor: '#E8472A', price: '₹45,000', description: 'Neon lights, confetti cannons and a night to remember.' },
  { id: 3, organizerId: 'org-1', organizerName: 'Priya Events Co.', title: 'Corporate Gala Night', category: 'Corporate', date: 'July 5, 2026', time: '7:00 PM', location: 'Convention Centre, Bangalore', spots: 40, totalSpots: 200, emoji: '🏆', color: 'linear-gradient(135deg, #C0392B 0%, #E8472A 60%, #F9C5B0 100%)', tag: 'New', tagColor: '#27AE60', price: '₹1,20,000', description: 'Sophisticated gala for product launches and award nights.' },
  { id: 4, organizerId: 'org-2', organizerName: 'Rahul Celebrations', title: 'Bachelorette Brunch', category: 'Bachelorette', date: 'July 12, 2026', time: '11:00 AM', location: 'Garden Villa, Pune', spots: 5, totalSpots: 20, emoji: '🥂', color: 'linear-gradient(135deg, #fd79a8 0%, #e84393 50%, #c0392b 100%)', tag: 'Almost Full', tagColor: '#E67E22', price: '₹35,000', description: 'Brunch, balloons and bachelorette fun in a beautiful garden.' },
  { id: 5, organizerId: 'org-1', organizerName: 'Priya Events Co.', title: 'Fireworks Spectacular', category: 'Fireworks', date: 'August 1, 2026', time: '9:00 PM', location: 'Open Grounds, Hyderabad', spots: 120, totalSpots: 500, emoji: '🎆', color: 'linear-gradient(135deg, #2C3E50 0%, #3498DB 50%, #9B59B6 100%)', tag: 'Grand', tagColor: '#3498DB', price: '₹2,50,000', description: 'A grand fireworks display with dry ice and live music.' },
]

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUserState] = useState<User | null>(null)
  const [events, setEvents] = useState<Event[]>(initialEvents)
  const [rsvps, setRsvps] = useState<RSVP[]>([])
  const [organizers, setOrganizers] = useState<Organizer[]>(initialOrganizers)
  const [devLog, setDevLog] = useState<{ type: string; message: string; time: string }[]>([])

  // Restore user + rsvps from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('evaska_user')
      if (saved) setCurrentUserState(JSON.parse(saved))
      const savedRsvps = localStorage.getItem('evaska_rsvps')
      if (savedRsvps) setRsvps(JSON.parse(savedRsvps))
      const savedOrgs = localStorage.getItem('evaska_organizers')
      if (savedOrgs) setOrganizers(JSON.parse(savedOrgs))
      const savedEvents = localStorage.getItem('evaska_events')
      if (savedEvents) setEvents(JSON.parse(savedEvents))
    } catch {}
  }, [])

  const setCurrentUser = (user: User | null) => {
    setCurrentUserState(user)
    if (user) localStorage.setItem('evaska_user', JSON.stringify(user))
    else localStorage.removeItem('evaska_user')
  }

  const pushLog = (type: string, message: string) => {
    const entry = { type, message, time: new Date().toLocaleTimeString() }
    setDevLog(prev => [entry, ...prev.slice(0, 19)])
    console.log(`[EVASKA ${type.toUpperCase()}]`, message)
  }

  const addEvent = (event: Event) => {
    setEvents(prev => {
      const updated = [...prev, event]
      localStorage.setItem('evaska_events', JSON.stringify(updated))
      return updated
    })
    pushLog('NEW EVENT', `"${event.title}" listed by ${event.organizerName}`)
  }

  const addRsvp = (rsvp: RSVP) => {
    setRsvps(prev => {
      const updated = [...prev, rsvp]
      localStorage.setItem('evaska_rsvps', JSON.stringify(updated))
      return updated
    })
    const event = events.find(e => e.id === rsvp.eventId)
    pushLog('NEW RSVP', `User ${rsvp.userId} RSVP to "${event?.title}"`)
  }

  const cancelRsvp = (userId: string, eventId: number) => {
    setRsvps(prev => {
      const updated = prev.filter(r => !(r.userId === userId && r.eventId === eventId))
      localStorage.setItem('evaska_rsvps', JSON.stringify(updated))
      return updated
    })
    const event = events.find(e => e.id === eventId)
    pushLog('CANCELLED', `User ${userId} cancelled RSVP to "${event?.title}"`)
  }

  const registerOrganizer = (org: Organizer) => {
    setOrganizers(prev => {
      const updated = [...prev, org]
      localStorage.setItem('evaska_organizers', JSON.stringify(updated))
      return updated
    })
    pushLog('NEW ORGANIZER', `${org.name} (${org.email}) joined Evaska!`)
  }

  const logout = () => {
    pushLog('LOGOUT', `${currentUser?.name} logged out`)
    setCurrentUser(null)
  }

  return (
    <AppContext.Provider value={{
      currentUser, setCurrentUser,
      events, setEvents,
      rsvps, setRsvps,
      organizers, setOrganizers,
      addEvent, addRsvp, cancelRsvp,
      registerOrganizer, logout,
      devLog,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
