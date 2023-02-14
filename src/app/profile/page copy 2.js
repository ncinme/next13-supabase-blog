// import { useSupabase } from "../../components/supabase-provider"            // getting the client-side Supabase client
import Profile from './Profile'
import { createServerClient } from '../../utils/supabase-server'

export default async function AuthProfile() {
    const supabase = createServerClient()

    const { data: { session } } = await supabase.auth.getSession()
    return (
        <Profile session={session} />
    )
}