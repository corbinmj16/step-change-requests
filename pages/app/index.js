import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {supabase} from "../../utils/supabase";
import {AppLayout, ContentLayout} from "../../layouts";
import {getUser} from '../../utils/helpers';
import {
  Requests,
  PageHeaderTitle,
  Modal,
} from '../../components';

export async function getServerSideProps({req}) {
  const user = await getUser(req);

  if (!user) {
    return { props: {}, redirect: {destination: "/login"} }
  }

  let {data: allRequests, error} = await supabase
    .from('requests')
    .select('*')
    .order('created_at', { ascending: false });

  // show 404 if
  if (!allRequests || error) {
    return {
      notFound: true,
    }
  }

  return {
    props: {
      requests: allRequests,
      user,
    }
  }
}

export default function Dashboard({ requests, user }) {
  const router = useRouter();
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    urlHasSuccess();
  }, [])
  const handleModalClose = () => {
    setShowSuccessModal(false);
    router.replace(`/app`, undefined, { shallow: true });
  }

  const urlHasSuccess = () => {
    if ('request_success' in router.query) {
      setShowSuccessModal(true);
    }
  }

  return (
    <>
      <AppLayout user={user}>
        <Modal
          isOpen={showSuccessModal}
          handleModalClose={handleModalClose}
          message="You've successfully created a request."
        />

        <PageHeaderTitle title='Dashboard' />

        <ContentLayout>
          <Requests requests={requests} />
        </ContentLayout>
      </AppLayout>
    </>
  )
}
