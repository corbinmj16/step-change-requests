import {createContext, useContext, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {supabase} from "../utils/supabase";

const UserContext = createContext();

export function UserProvider({children}) {
  const [user, setUser] = useState(supabase.auth.session());

  useEffect(() => {
    // when auth changes set the user to the session
    supabase.auth.onAuthStateChange((event, session) => {
      console.log('auth changed: ', session);
      // if logged out -> session=null, if logged in -> session = user object
      setUser(session);
    });
  }, [user]);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext);
}