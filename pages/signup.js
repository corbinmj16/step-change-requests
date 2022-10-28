import { useRouter } from "next/router";
import { useEffect } from "react";
import {SignUpForm} from "../components";
import { useUser } from "../context/UserProvider";

export default function Signup() {
  const router = useRouter();
  const user = useUser();

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <SignUpForm />
    </div>
  )
}