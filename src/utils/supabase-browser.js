/*
We still need a Supabase instance client-side for 'authentication' and 'realtime subscriptions'. 
It is important, when using Supabase client-side, to have a single instance of a client. 
We can share this singleton instance across our components using providers and React context.
*/

import { createBrowserSupabaseClient } from '@supabase/auth-helpers-nextjs'

export const createBrowserClient = () => createBrowserSupabaseClient()