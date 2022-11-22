import {Menu} from "../components";
import Link from "next/link";

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