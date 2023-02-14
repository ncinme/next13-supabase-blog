"use client"

import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSupabase } from "../../components/supabase-provider"            // getting the client-side Supabase client

export default function Profile({ session }) {
    const { supabase } = useSupabase()

    console.log("Profile page session", session)

    return (
        <div className="container" style={{ padding: '50px 0 100px 0' }}>
            {!session ? (
                <Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} />
            ) : (
                <p>Account page will go here.</p>
            )}
        </div>
    )
}
