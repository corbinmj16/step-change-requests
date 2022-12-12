import Link from "next/link";
import Image from "next/image";
import logo from "../public/logo-black.png";

export function Homepage() {
  return (
    <section className="bg-white">
      <div className="px-6 pt-6 lg:px-8">
        <div>
          <nav className="flex h-9 items-center justify-between" aria-label="Global">
            <div className="flex lg:min-w-0 lg:flex-1" aria-label="Global">
              <Link href="/">
                <a className="relative block w-20 h-20 m-auto -m-1.5 p-1.5">
                  <span className="sr-only">Step Change Consulting</span>
                  <Image
                    src={logo}
                    layout="fill"
                    objectFit="contain"
                  />
                </a>
              </Link>
            </div>
            <div className="lg:flex lg:min-w-0 lg:flex-1 lg:justify-end">
              <Link
                href="/login"
              >
                <a className="inline-block rounded-lg px-3 py-1.5 text-sm font-semibold leading-6 text-gray-900 shadow-sm ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Log in
                </a>
              </Link>
            </div>
          </nav>
        </div>
      </div>
      <main>
        <div className="relative px-6 lg:px-8">
          <div className="mx-auto max-w-3xl pt-20 pb-32 sm:pt-48 sm:pb-40">
            <div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-center sm:text-6xl">
                  Welcome to Step Change Consulting
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600 sm:text-center">
                  Step Change Consulting is an experienced Leader for over 30 years with Alcoa/Arconic in Plant Operations and BU & Corporate functions. Specialization in Procurement, Supply Chain Mgmt., Manufacturing, and Engineering.
                </p>
                <div className="mt-8 flex gap-x-4 sm:justify-center">
                  <a
                    href="tel:563-343-4298"
                    className="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-base font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
                  >
                    Call
                    <span className="ml-1 text-indigo-200" aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                  <a
                    href="mailto:craig.kerney@outlook.com"
                    className="inline-block rounded-lg px-4 py-1.5 text-base font-semibold leading-7 text-gray-900 ring-1 ring-gray-900/10 hover:ring-gray-900/20"
                  >
                    Email
                    <span className="ml-1 text-gray-400" aria-hidden="true">
                      &rarr;
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}