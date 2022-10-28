import {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {supabase} from "../utils/supabase";

const UserContext = createContext();

export function UserProvider({children}) {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (supabase.auth.user()) {
      setUser(supabase.auth.user());
    } else {
      router.push('/login')
    }
    
    supabase.auth.onAuthStateChange((event, session) => {
      if (session === null) {
        router.push('/login')
        setUser(session);
        return;
      }

      // if logged out -> session=null, if logged in -> session = user object
      setUser(session.user);      
    });
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext);
}