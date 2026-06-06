import './globals.css'
import { AppProvider } from '@/context/AppContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

export const metadata = {
  title: 'Evaska — Plan The Perfect Event',
  description: 'Discover, create, and manage events seamlessly with Evaska.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#FFF0EC',
                color: '#C0392B',
                border: '1px solid #E8472A',
              },
            }}
          />
        </AppProvider>
      </body>
    </html>
  )
}
