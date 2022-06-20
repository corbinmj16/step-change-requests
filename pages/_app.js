import '../styles/globals.css';
import {UserProvider} from "../context/UserProvider";

function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <div className="bg-gray-50 min-h-screen">
        <Component {...pageProps} />
      </div>
    </UserProvider>

  )
}

export default MyApp
