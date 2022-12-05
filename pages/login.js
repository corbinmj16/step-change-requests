import {LoginForm} from "../components";
import {getUser} from "../utils/helpers";
import logo from '../public/logo-black.png';
import Image from "next/image";

export async function getServerSideProps({req}) {
  const user = await getUser(req);

  if (user) {
    return { props: {}, redirect: { destination: '/'} };
  }

  return { props: {}};
}

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <LoginForm />
    </div>
  );
}