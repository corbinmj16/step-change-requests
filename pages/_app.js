import { UserProvider } from '../context/UserProvider';
import '../styles/globals.css';

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
