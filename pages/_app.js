import {useEffect, useState} from "react";
import {createBrowserSupabaseClient, withPageAuth} from "@supabase/auth-helpers-nextjs";
import {SessionContextProvider, useUser} from "@supabase/auth-helpers-react";
import {useRouter} from "next/router";
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  // const router = useRouter();
  const [supabaseClient] = useState(() => createBrowserSupabaseClient())
  const user = useUser();

  console.log('user: ', user);

  // useEffect(() => {
  //   console.log(user);
  //   if (!user) {
  //     router.push('/login');
  //   }
  // }, []);

  return (
    <SessionContextProvider
      supbaseClient={supabaseClient}
      initialSession={pageProps.initialSession}
    >
      <div className="bg-gray-100 min-h-screen">
        <Component {...pageProps} />
      </div>
    </SessionContextProvider>

  )
}

export const getServerSideProps = withPageAuth({ redirectTo: '/login' });