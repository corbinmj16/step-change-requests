import Link from "next/link";
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

  return {
    props: {
      request,
    }
  }
}

export default function RequestPage({ request }) {
  return (
    <AppLayout>
      <section className="container flex flex-col w-full mx-auto px-3 pt-10 pb-20">
        <h1 className='text-3xl font-bold mb-10'>The individual request for {request.id}</h1>
        <h2>{request.title ?? ''}</h2>
        <h3>{request.problem ?? ''}</h3>
        <p>{request.priority ?? ''}</p>
        <p>Need By: {request.need_by ?? 'N/A'}</p>
      </section>
    </AppLayout>
  )
}