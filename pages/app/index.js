import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {AppLayout} from "../../layouts";
import {Requests} from '../../components'
import {useUserContext} from "../../context/UserProvider";

export default function AppHome() {
  const router = useRouter();
  const user = useUserContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) router.push('/app/login');

    setLoading(false);
  }, []);

  const Loading = () => {
    return (
      <div className="min-h-screen min-w-full flex flex-col justify-center items-center">
        <p className="text-5xl font-bold">Loading...</p>
      </div>
    )
  }

  return (
    <>
      {loading ? <Loading /> : (
        <AppLayout>
          <Requests />
        </AppLayout>
      )}
    </>
  )


}
