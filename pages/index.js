import { supabase } from "../utils/supabase";
import {AppLayout, ContentLayout} from "../layouts";
import {Requests, PageHeaderTitle} from '../components'
import {getUser} from "../utils/helpers";

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
  return (
    <AppLayout user={user}>
      <PageHeaderTitle title='Dashboard' />

      <ContentLayout>
        <Requests requests={requests} />
      </ContentLayout>
    </AppLayout>
  )
}
