import {getUser} from "../utils/helpers";
import {LoginForm} from "../components";
import {AppLayout} from "../layouts";

export async function getServerSideProps({req}) {
  const user = await getUser(req);

  if (user) {
    return { props: {}, redirect: { destination: '/app'} };
  }

  return { props: {}};
}

export default function Login() {
  return (
    <AppLayout>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <LoginForm />
      </div>
    </AppLayout>
  );
}