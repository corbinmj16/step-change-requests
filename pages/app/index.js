import {AppLayout} from "../../layouts";
import {Requests} from '../../components'
import { supabase } from "../../utils/supabase";

export async function getServerSideProps() {

    let {data: allRequests, error} = await supabase
      .from('requests')
      .select('*')
      .order('created_at', { ascending: false });

      console.log(allRequests);

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

export default function AppHome({ requests }) {
  return (
    <AppLayout>
      <Requests requests={requests} />
    </AppLayout>
  )
}
