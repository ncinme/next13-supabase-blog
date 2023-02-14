/*
Modify our root layout to 
1. fetch the user's server-side session, 
2. wrap our application in our Supabase Provider, 
3. and pass the server access token as a prop to the <SupabaseListener /> component 
*/

import 'server-only'

import SupabaseListener from '../components/supabase-listener'
import SupabaseProvider from '../components/supabase-provider'
import './globals.css'
import { createServerClient } from '../utils/supabase-server'
import Navigation from '@/components/Navigation'
import { Suspense } from 'react'
import Loading from './loading'

// do not cache this layout
export const revalidate = 0

export default async function RootLayout({ children }) {
  // this is server-side Supabase client, defined in /utils/supabase-server)
  const supabase = createServerClient()

  //  1. fetch the user's server-side session, 
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // console.log("layout session", session)

  return (
    <html lang="en">
      {/*
      <head /> will contain the components returned by the nearest parent
      head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
    */}
      <head />
      <body>
        {/* 2. wrap our application in our Supabase Provider. now the 'client-side Supbase client' will be 
      available to all the children, and it can be access either by using useContext(Context) or useSupabase hook. */}
        <SupabaseProvider>
          {/* 3. and pass the server access token as a prop to the <SupabaseListener /> component  */}
          <SupabaseListener serverAccessToken={session?.access_token} />
          <header>
            <Navigation session={session} />
          </header>
          <Suspense fallback={<Loading />}>
            {children}
          </Suspense>
        </SupabaseProvider>
      </body>
    </html>
  )
}