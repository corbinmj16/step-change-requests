import {useRouter} from "next/router";
import {supabase} from "../../utils/supabase";
import {AppLayout, ContentLayout} from "../../layouts";
import {getUser} from '../../utils/helpers';
import {useAppModalStore} from "../../store/useAppModalStore";
import {
  Requests,
  PageHeaderTitle,
  Modal,
} from '../../components';

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
      showSuccessModal: request_success === 'true',
    }
  }
}

export default function Dashboard({ requests, user, showSuccessModal }) {
  const router = useRouter();
  const setIsOpen = useAppModalStore(state => state.setIsOpen);
  const isOpen = useAppModalStore(state => state.isOpen);

  const handleModalClose = () => {
    router.replace(`/app`, undefined, { shallow: true });
  }

  return (
    <>
      <AppLayout user={user}>
        <Modal
          isOpen={isOpen}
          message="You've successfully created a request."
          title= 'Success!'
          buttonText= 'Ok'
          modalType= 'success'
        />

        <PageHeaderTitle title='Dashboard' />

        <ContentLayout>
          <Requests requests={requests} />
        </ContentLayout>
      </AppLayout>
    </>
  )
}
