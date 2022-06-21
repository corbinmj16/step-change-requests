import {supabase} from "../../../utils/supabase";
import {AppLayout} from "../../../layouts";

export async function getServerSideProps({params}) {
  const { id } = params;

  // get requests from db
  const {data: request, error} = await supabase
    .from('items')
    .select('*')
    .eq('id', id)
    .single();

    // show 404 if 
    if (!request || error) {
      return {
        notFound: true,
      }
    }

  return {
    props: {
      request,
    }
  }
}

export default function RequestPage({ request }) {
  return (
    <AppLayout>
      <div className="container flex flex-col w-full mx-auto px-3 pt-10 pb-20">
        <h1 className='text-3xl font-bold mb-10'>{request.title}</h1>
        <h3>Problem: {request.problem ?? ''}</h3>
        <p>Priority: {request.priority ?? ''}</p>
        <p>Needed By: {request.needed_by ?? 'N/A'}</p>
      </div>
    </AppLayout>
  )
}