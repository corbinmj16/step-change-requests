import { supabase } from "../utils/supabase";
import {ContentLayout} from "../layouts";
import {Requests, PageHeaderTitle} from '../components'

export async function getServerSideProps() {
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
    }
  }
}

export default function Dashboard({ requests }) {
  return (
    <>
      <PageHeaderTitle title='Dashboard' />

      <ContentLayout>
        <Requests requests={requests} />
      </ContentLayout>
    </>
  )
}
