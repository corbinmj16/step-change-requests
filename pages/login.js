import {LoginForm} from "../components";
import {supabase} from "../utils/supabase";
import {getUser} from "../utils/helpers";

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