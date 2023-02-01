import {getUser} from "../utils/helpers";
import {LoginForm, Modal} from "../components";
import {AppLayout} from "../layouts";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

export async function getServerSideProps({req}) {
  const user = await getUser(req);

  if (user) {
    return { props: {}, redirect: { destination: '/app'} };
  }

  return { props: {}};
}

export default function Login() {
  const router = useRouter();
  const [showNewAccountModal, setShowNewAccountModal] = useState(false);

  useEffect(() => {
    if ('new_account' in router.query) {
      setShowNewAccountModal(true);
    }
  }, [])

  const handleAccountModalClose = () => {
    setShowNewAccountModal(false);
    router.replace(`/login`, undefined, { shallow: true });
  }

  return (
    <AppLayout>
      <div className="min-h-screen flex flex-col justify-center items-center">
        <Modal
          title={`Please Verify Account`}
          isOpen={showNewAccountModal}
          handleModalClose={handleAccountModalClose}
          message={`Check your email to verify your account.`}
        />
        <LoginForm />
      </div>
    </AppLayout>
  );
}