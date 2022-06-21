import {useRouter} from 'next/router';
import {useEffect, useState} from 'react';
import {Menu} from "../components";
import {supabase} from "../utils/supabase";

export function AppLayout({children}) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (supabase.auth.user()) {
      setUser(supabase.auth.user());
    } else {
      router.push('/app/login')
    }
    
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('auth changed: ', session);
      if (session === null) router.push('/app/login');
      // if logged out -> session=null, if logged in -> session = user object
      setUser(session);
    });
  }, []);

  const Loading = () => {
    return (
      <div className="min-h-screen min-w-full flex flex-col justify-center items-center">
      </div>
    )
  }

  if (!user) return <Loading />;

  return (
    <>
      <Menu />

      <div className="max-w-6xl mx-auto px-5">
        {children}
      </div>
    </>
  )
}