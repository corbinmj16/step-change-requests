import {withPageAuth} from "@supabase/auth-helpers-nextjs";
import {LoginForm} from "../components";
import {useEffect} from "react";
import {useRouter} from "next/router";

export const getServerSideProps = withPageAuth({ redirectTo: '/login' })

export default function Login() {
  const router = useRouter();

  // useEffect(() => {
  //   if (user) {
  //     router.push('/')
  //   }
  // }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <LoginForm />
    </div>
  );
}