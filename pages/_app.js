import {UserProvider} from '../context/UserProvider';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <UserProvider>
      <div className="bg-gray-100 min-h-screen">
        <Component {...pageProps} />
      </div>
    </UserProvider>

  )
}