import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (pathname.startsWith('/admin')) {
    const token = request.nextUrl.searchParams.get('key')
    const cookie = request.cookies.get('evaska_admin_key')?.value

    if (token === 'ev@sk@0wner2026' || cookie === 'ev@sk@0wner2026') {
      const response = NextResponse.next()
      response.cookies.set('evaska_admin_key', 'ev@sk@0wner2026', {
        httpOnly: false,
        maxAge: 60 * 60 * 24 * 7,
        sameSite: 'lax',
        path: '/',
      })
      return response
    }

    return NextResponse.rewrite(new URL('/not-found', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/admin/:path*',
}
