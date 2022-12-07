import {Menu, SignUpForm} from "../components";
import {getUser} from "../utils/helpers";

export async function getServerSideProps({req}) {
  const user = await getUser(req);

  if (user) {
    return { props: {}, redirect: { destination: '/app'} };
  }

  return { props: {}};
}

export default function Signup() {
  return (
    <>
      <Menu />
      <div className="min-h-screen flex flex-col justify-center items-center">
        <SignUpForm />
      </div>
    </>
  )
}