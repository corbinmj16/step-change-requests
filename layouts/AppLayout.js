import {Menu} from "../components";

export function AppLayout({ children }) {
  return (
    <>
      <Menu />

      <main>
          {children}
      </main>
    </>
  )
}