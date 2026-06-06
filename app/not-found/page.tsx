export default function NotFound() {
  return (
    <div style={{ backgroundColor: '#FFF0EC', minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' as const, gap: '1rem' }}>
      <div style={{ fontSize: '5rem' }}>404</div>
      <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: '2rem', color: '#C0392B', fontWeight: 800, margin: 0 }}>Page Not Found</h1>
      <p style={{ fontFamily: '"DM Sans", sans-serif', fontSize: '1rem', color: '#7a5c5c', margin: 0 }}>The page you are looking for does not exist.</p>
      <a href="/" style={{ marginTop: '1rem', backgroundColor: '#E8472A', color: 'white', fontFamily: '"DM Sans", sans-serif', fontSize: '0.875rem', fontWeight: 600, padding: '0.85rem 2rem', borderRadius: '9999px', textDecoration: 'none' }}>
        Go Home
      </a>
    </div>
  )
}
