import {useEffect, useState} from "react";
import {useSessionStore} from "../store/useSessionStore";
import {useRouter} from "next/router";

export function ContentLayout({children}) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const session = useSessionStore((state) => state.session);

  useEffect(() => {
    if (session !== null) {
      setLoading(false);
    } else {
      router.push('/login');
    }
  },[]);

  if (loading) return <h1>Loading...</h1>;

  return (
    <div className="container flex flex-col mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
      {children}
    </div>
  )
}