import {useRouter} from "next/router";
import { supabase } from "../utils/supabase";
import {AppLayout, ContentLayout} from "../layouts";
import {getUser} from "../utils/helpers";
import {
  Requests,
  PageHeaderTitle,
  Modal,
  Homepage,
} from '../components'

export async function getServerSideProps({req, query}) {
  const user = await getUser(req);

  if (!user) {
    return { props: {}, redirect: {destination: "/login"} }
  }

  const {request_success} = query;

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
      showSuccessModal: request_success === 'true' ? true : false,
    }
  }
}

export default function Dashboard({ requests, user, showSuccessModal }) {
  const router = useRouter();

  const handleModalClose = () => {
    router.replace(`/`, undefined, { shallow: true });
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

      {/*<Homepage />*/}
    </>
  )
}
