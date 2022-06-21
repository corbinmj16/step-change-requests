import {LoginForm} from "../../components";
import {useEffect} from "react";
import {useRouter} from "next/router";
import { supabase } from "../../utils/supabase";
import { useUser } from "../../context/UserProvider";

export default function Login() {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user) {
      router.push('/app/')
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <LoginForm />
    </div>
  );
}