// This will be used any time we need to create a 'Supabase client server-side' - in a Server Component.

import { headers, cookies } from 'next/headers'
import { createServerComponentSupabaseClient } from '@supabase/auth-helpers-nextjs'

export const createServerClient = () =>
    createServerComponentSupabaseClient({
        headers,
        cookies,
    })