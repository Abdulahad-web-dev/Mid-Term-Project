import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  try {
    let supabaseResponse = NextResponse.next()
    const pathname = request.nextUrl.pathname

    const isAuthPage =
      pathname === '/login' ||
      pathname === '/register' ||
      pathname === '/admin/login'

    const isProtectedPath =
      (pathname.startsWith('/dashboard') ||
        pathname.startsWith('/seller') ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/moderator')) &&
      !isAuthPage

    // ONLY process Supabase authentication if it's a protected path or an auth page
    // By skipping Supabase initialization on purely public pages, proxy avoids timeout
    if (!isProtectedPath && !isAuthPage) {
      return supabaseResponse
    }

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '',
      {
        cookies: {
          getAll() {
            return request.cookies.getAll()
          },
          setAll(cookiesToSet) {
            supabaseResponse = NextResponse.next()
            cookiesToSet.forEach(({ name, value, options }) => {
              try {
                supabaseResponse.cookies.set(name, value, options)
              } catch (e) {
                console.error('Failed to set cookie on response', name, e)
              }
            })
          },
        },
      }
    )

    // Use getUser() for secure session validation
    let user: { email?: string; app_metadata?: Record<string, string>; user_metadata?: Record<string, string> } | null = null
    try {
      const result = await supabase.auth.getUser()
      user = result?.data?.user ?? null
    } catch (e) {
      console.error('supabase.auth.getUser error in proxy:', e)
      user = null
    }

    const hasAdminBypass = request.cookies.get('Adflow-Admin-Bypass')?.value === 'true'

    if (hasAdminBypass && pathname.startsWith('/admin')) {
      if (pathname === '/admin/login') {
        const url = request.nextUrl.clone()
        url.pathname = '/admin'
        return NextResponse.redirect(url)
      }
      return supabaseResponse
    }

    if (!user && isProtectedPath) {
      const redirectUrl = pathname.startsWith('/admin') ? '/admin/login' : '/login'
      const url = request.nextUrl.clone()
      url.pathname = redirectUrl
      return NextResponse.redirect(url)
    }

    if (user && isProtectedPath) {
      const role = user.app_metadata?.role || user.user_metadata?.role
      const isOwner = user.email === 'abdulahadwarraich.web@gmail.com'

      if (pathname.startsWith('/admin') && role !== 'admin' && !isOwner) {
        const url = request.nextUrl.clone()
        url.pathname = role === 'seller' ? '/seller' : '/dashboard'
        return NextResponse.redirect(url)
      }

      if (pathname.startsWith('/seller') && role !== 'seller' && role !== 'admin') {
        const url = request.nextUrl.clone()
        url.pathname = role === 'admin' ? '/admin' : '/dashboard'
        return NextResponse.redirect(url)
      }
    }

    if (user && isAuthPage) {
      const url = request.nextUrl.clone()
      const role = user.app_metadata?.role || user.user_metadata?.role
      const isOwner = user.email === 'abdulahadwarraich.web@gmail.com'
      if (role === 'admin' || isOwner) {
        url.pathname = '/admin'
      } else if (role === 'seller') {
        url.pathname = '/seller'
      } else {
        url.pathname = '/dashboard'
      }
      return NextResponse.redirect(url)
    }

    return supabaseResponse
  } catch (err) {
    console.error('Proxy unexpected error:', err)
    return NextResponse.next()
  }
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
