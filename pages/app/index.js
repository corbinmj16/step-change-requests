import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {supabase} from "../../utils/supabase";
import {AppLayout, ContentLayout} from "../../layouts";
import {getUser, urlHasQuery} from '../../utils/helpers';
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    checkModalToShow();
  }, [])
  const handleModalClose = () => {
    setShowSuccessModal(false);
    setShowDeleteModal(false);
    router.replace(`/app`, undefined, { shallow: true });
  }

  const checkModalToShow = () => {
    if (urlHasQuery('request_success', router.query)) {
      setShowSuccessModal(true);
    }

    if (urlHasQuery('deleted', router.query)) {
      setShowDeleteModal(true);
    }
  }

  const AlertModals = () => {
    return (
      <>
        <Modal
          isOpen={showSuccessModal}
          handleModalClose={handleModalClose}
          message="You've successfully created a request."
        />

        <Modal
          isOpen={showDeleteModal}
          handleModalClose={handleModalClose}
          title="Request Deleted"
          message="You've successfully deleted a request."
        />
      </>
    )
  }

  return (
    <>
      <AppLayout user={user}>
        <AlertModals />

        <PageHeaderTitle title='Dashboard' />

        <ContentLayout>
          <Requests requests={requests} />
        </ContentLayout>
      </AppLayout>
    </>
  )
}
