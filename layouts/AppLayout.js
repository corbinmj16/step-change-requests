import {Menu, NewMenu} from "../components";

export function AppLayout({ children, user }) {
  return (
    <>
      {/*<Menu user={user} />*/}
      <NewMenu user={user} />
      <main className="bg-gray-100 min-h-screen">
          {children}
      </main>
    </>
  )
}