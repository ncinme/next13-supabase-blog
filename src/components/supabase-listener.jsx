/*
We need to set up a listener to fetch fresh data whenever our user logs in or out. 
For this we need to check whether our client and server sessions match. 

The function we pass to onAuthStateChange is automatically called by Supabase whenever a user's session changes. 
This component takes an serverAccessToken prop, which is the server's state for our user (definied in /app/layout.jsx). 
If the serverAccessToken and the new session's access_token do not match then the client and server are out of sync, 
therefore, we want to reload the active route.

Now we can use our useSupabase hook throughout our client-side components.
*/
"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSupabase } from "./supabase-provider";

// this component handles refreshing server data when the user logs in or out
// this method avoids the need to pass a session down to child components
// in order to re-render when the user's session changes

export default function SupabaseListener({ serverAccessToken }) {
  // this is cliet-side Supabase client, created using useSupabase hook (defined in supabase-provider.js)
  const { supabase } = useSupabase();
  const router = useRouter();

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.access_token !== serverAccessToken) {
        // server (session) and client (session) are out of sync
        // reload the page to fetch fresh server data
        // https://beta.nextjs.org/docs/data-fetching/mutating
        router.refresh();
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [serverAccessToken, router, supabase]);

  return null;
}
