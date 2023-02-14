'use client'
import { useSupabase } from "./supabase-provider"            // getting the client-side Supabase client

const SignOut = ({ session }) => {

    const { supabase } = useSupabase()

    return <div>
        {session && <button class="rounded-md bg-sky-500/100 p-1 px-2 hover:bg-blue-600 hover:text-white" onClick={async () => await supabase.auth.signOut()}>
            Sign out
        </button>}
    </div>
};

export default SignOut;

