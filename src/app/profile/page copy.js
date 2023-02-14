"use client"

// import { Auth, Typography, Button } from "@supabase/ui";
// const { Text } = Typography
// import { supabase } from '../../api'

import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import { useSupabase } from "../../components/supabase-provider"            // getting the client-side Supabase client
import { useState, useEffect } from "react"

export default async function AuthProfile() {
    const { supabase } = useSupabase()
    const { data: { session } } = await supabase.auth.getSession()

    // As we can't make AuthProfile() function as async function, we have to use useState and useEffect to get the 'session'
    // const [session, setSession] = useState()

    // useEffect(() => {
    //     async function getUserSession() {
    //         try {
    //             const { data: { session } } = await supabase.auth.getSession()
    //             console.log("session before setting", session)
    //             setSession(session)
    //         } catch (err) {
    //             console.log(err)
    //         }
    //     }
    //     getUserSession()
    // }, []);

    console.log("profile page session", session)

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
