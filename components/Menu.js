import {Disclosure} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import Image from 'next/image';
import Link from "next/link";
import {supabase} from "../utils/supabase";
import {useRouter} from "next/router";
import logo from "../public/logo-white.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Menu({user}) {
  const router = useRouter();

  const handleLogout = async () => {
    let {error} = await supabase.auth.signOut();

    router.push('/login');
  }

  return (
    <div>
      <Disclosure as="nav" className='bg-gray-800'>
        {({open}) => (
          <>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                      <Link href="/">
                        <a className="relative block w-16 h-16 m-auto">
                          <Image
                            src={logo}
                            layout="fill"
                            objectFit="contain"
                          />
                        </a>
                      </Link>
                  </div>

                  <div className={!user ? 'hidden' : 'hidden md:block'}>
                    <div className="ml-10 flex items-baseline space-x-4">
                      <Link href="/app">
                        <a className='hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-white'>
                          Dashboard
                        </a>
                      </Link>
                      <Link href="/app/requests/new">
                        <a className='hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-white'>
                          New Request
                        </a>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="justify-end hover:bg-blue-600 bg-blue-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-white"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>

                <div className="-mr-2 flex md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button
                    className="inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                    )}
                  </Disclosure.Button>
                </div>
              </div>
            </div>

            <Disclosure.Panel className={!user ? 'hidden' : 'md:hidden'}>
              <div className="flex flex-col space-y-1 px-2 pt-2 pb-3 sm:px-3">

                <Link href="/">
                  <a className='hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-white'>
                    Dashboard
                  </a>
                </Link>
                <Link href="/app/requests/new">
                  <a className='hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-white'>
                    New Request
                  </a>
                </Link>
                <Link href="/signup">
                  <button onClick={handleLogout} className='hover:bg-blue-600 bg-blue-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-white'>
                    Logout
                  </button>
                </Link>
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

    </div>
  );
}