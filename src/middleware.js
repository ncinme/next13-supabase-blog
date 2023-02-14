// We need a middleware file to refresh the user's session on navigation.

// As an alternative to protecting individual pages you can use a Next.js Middleware 
// to protect the entire directory or those that match the config object.

import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'

export async function middleware(req) {
    const res = NextResponse.next()

    const supabase = createMiddlewareSupabaseClient({ req, res })

    const {
        data: { session },
    } = await supabase.auth.getSession()

    // console.log("middleware session", session)


    // // Check auth condition
    // if (!session && req.nextUrl.pathname.startsWith("/required-session")) {
    //     // Auth condition not met, redirect to home page.
    //     const redirectUrl = req.nextUrl.clone();
    //     redirectUrl.pathname = "/";
    //     redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname);
    //     return NextResponse.redirect(redirectUrl);
    // }


    return res
}