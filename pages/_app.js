import '../styles/globals.css';
import {Menu} from "../components";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Menu />
      <div className="bg-gray-100 min-h-screen">
        <Component {...pageProps} />
      </div>
    </>
  )
}

