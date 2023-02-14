/*
Client-side#
We still need a Supabase instance client-side for authentication and realtime subscriptions. 
It is important, when using Supabase client-side, to have a single instance of a client. 
We can share this singleton instance across our components using providers and React context.
*/

// Next, we need to create a single instance of Supabase to use client-side. Let's create a new Provider for Supabase
// The idea is that we should be able to use our 'useSupabase' hook throughout our client-side components.
"use client";

import { createContext, useContext, useState } from "react";
import { createBrowserClient } from "../utils/supabase-browser";

const Context = createContext();

export default function SupabaseProvider({ children }) {
  // this is client-side Supabase client, defined in /utils/supabase-browser)
  const [supabase] = useState(() => createBrowserClient());

  // I think this userEffect is not needed. The event listner is defined in supabase-listener.jsx.
  // useEffect(() => {
  //   const {
  //     data: { subscription },
  //   } = supabase.auth.onAuthStateChange((event, session) => {
  //     if (session?.access_token !== accessToken) {
  //       router.refresh();
  //     }
  //   });

  //   return () => subscription.unsubscribe();
  // }, [accessToken]);

  return (
    <Context.Provider value={{ supabase }}>
      <>{children}</>
    </Context.Provider>
  );
}

// defines the useSupabase hook
export const useSupabase = () => useContext(Context);
