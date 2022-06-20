import {Menu} from "../components";

export function AppLayout({children}) {
  return (
    <>
      <Menu />

      <div className="max-w-6xl mx-auto px-5">
        {children}
      </div>
    </>
  )
}