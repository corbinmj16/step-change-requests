import {Menu} from "../components";
import { useUser } from "../context/UserProvider";

export function AppLayout({ children }) {
  const user = useUser();

  const Loading = () => {
    return (
      <div className="min-h-screen min-w-full flex flex-col justify-center items-center">
      </div>
    )
  }

  if (!user) return <Loading />;

  return (
    <>
      <Menu />

      <div className="max-w-6xl mx-auto px-5">
        {children}
      </div>
    </>
  )
}