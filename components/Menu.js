import { useEffect, useState } from "react";
import Link from "next/link";
import {supabase} from "../utils/supabase";
import {useRouter} from "next/router";
import { useUser } from "../context/UserProvider";

export function Menu() {
  const router = useRouter();
  const user = useUser();

  const handleLogout = async () => {
    let {error} = await supabase.auth.signOut();

    if (error) throw new Error(error.message);

    await router.push('/app/login');
  }

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-screen-xl px-4 py-8 mx-auto sm:py-12 sm:px-6 lg:px-8">
        
        <div className="sm:justify-between sm:items-center sm:flex">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              <Link href={`/app`}>
                  {user ? `Welcome, ${user.email}` : 'Welcome'}
              </Link>
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Lets write a new request! 🎉
            </p>
          </div>

          <div className="flex flex-col gap-4 mt-4 sm:flex-row sm:mt-0 sm:items-center">
            <Link href='/app/requests/new'>
              <a
                className="block px-5 py-3 text-center text-sm font-medium text-white transition bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring">
                New Request
              </a>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center justify-center px-5 py-3 text-gray-500 transition bg-white border border-gray-200 rounded-lg hover:text-gray-700 focus:outline-none focus:ring"
              type="button">
              <span className="text-sm font-medium"> Logout </span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}