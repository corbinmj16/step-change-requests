import {LoginForm} from "../../components";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {useUserContext} from "../../context/UserProvider";

export default function Login() {
  const user = useUserContext()
  const router = useRouter();

  useEffect(() => {
    if (user) router.push('/app');
  }, [user]);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <LoginForm />
    </main>
  );
}