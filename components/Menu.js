import {Disclosure} from '@headlessui/react'
import {Bars3Icon, XMarkIcon} from '@heroicons/react/24/outline'
import Link from "next/link";
import {supabase} from "../utils/supabase";
import {useRouter} from "next/router";
import {useSessionStore} from "../store/useSessionStore";

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export function Menu() {
  const router = useRouter();
  const sessionStore = useSessionStore();

  const handleLogout = async () => {
    let {error} = await supabase.auth.signOut();

    if (error) throw new Error(error.message);

    sessionStore.setSession(null);

    await router.push('/login');
  }

  const isLoggedOut = sessionStore.session === null;

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
                      <img
                        className="h-8 w-8"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                        alt="Your Company"
                      />
                    </Link>
                  </div>
                  {/*<div className={isLoggedOut ? 'hidden' : 'hidden md:block'}>*/}
                  <div className='hidden md:block'>
                    <div className="ml-10 flex items-baseline space-x-4">
                      <Link href="/">
                        <a className='hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-white'>
                          Dashboard
                        </a>
                      </Link>
                      <Link href="/requests/new">
                        <a className='hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-white'>
                          New Request
                        </a>
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-white"
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

            <Disclosure.Panel className={isLoggedOut ? 'hidden' : 'md:hidden'}>
              <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
                <Link href="/">
                  <a className='hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-white'>
                    Dashboard
                  </a>
                </Link>
                <Link href="/requests/new">
                  <a className='hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium text-white'>
                    New Request
                  </a>
                </Link>
                {/*{navigation.map((item) => (*/}
                {/*  <Disclosure.Button*/}
                {/*    key={item.name}*/}
                {/*    as="a"*/}
                {/*    href={item.href}*/}
                {/*    className={classNames(*/}
                {/*      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',*/}
                {/*      'block px-3 py-2 rounded-md text-base font-medium'*/}
                {/*    )}*/}
                {/*    aria-current={item.current ? 'page' : undefined}*/}
                {/*  >*/}
                {/*    {item.name}*/}
                {/*  </Disclosure.Button>*/}
                {/*))}*/}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>

    </div>
  );
}