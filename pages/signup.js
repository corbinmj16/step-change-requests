import { useRouter } from "next/router";
import { useEffect } from "react";
import {SignUpForm} from "../components";

export default function Signup() {
  const router = useRouter();

  // useEffect(() => {
  //   if (user) {
  //     router.push('/')
  //   }
  // }, []);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <SignUpForm />
    </div>
  )
}