import { NextResponse } from "next/server";

export default middlemare = (req) => {

    const isPublic = req.nextUrl.pathname === '/login' || req.nextUrl.pathname === '/register'

    const token = req.cookies.get('token') || ''

    if (isPublic && token) {
        return NextResponse.redirect(new URL('/overview', req.nextUrl))
    }
    if (!isPublic && !token) {
        return NextResponse.redirect(new URL('/login', req.nextUrl))
    }
}

export const config = {
    matcher: [
        '/overview',
        '/login',
        '/register'
    ]
}