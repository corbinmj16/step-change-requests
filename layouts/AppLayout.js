import {Menu} from "../components";

export function AppLayout({ children, user }) {
  return (
    <>
      <Menu user={user} />
      <main>
          {children}
      </main>
    </>
  )
}