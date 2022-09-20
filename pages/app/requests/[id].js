import { PDFDownloadLink } from '@react-pdf/renderer';
import Image from "next/image";
import {supabase} from "../../../utils/supabase";
import {AppLayout} from "../../../layouts";
import { DownloadablePdf } from "../../../components";
import { formatDate } from "../../../utils/helpers";

export async function getServerSideProps({params}) {
  const { id } = params;

  // get requests from db
  const {data: request, error} = await supabase
    .from('requests')
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

  if (!request) return (
    <AppLayout>
      <h1>There is no request living here.</h1>
    </AppLayout>
  );

  return (
    <AppLayout>
      <div className="container flex flex-col w-full mx-auto px-3 pt-10 pb-20">

        <div className="inline-flex justify-end">
          <PDFDownloadLink
            fileName="testing.pdf"
            document={ <DownloadablePdf request={request} /> }
            style={{ 'backgroundColor': '#70c570', 'padding': '12px 20px', 'paddingHorizontal': '20px', 'color': '#fff', 'borderRadius': '8px' }}>
            Just download it
          </PDFDownloadLink>
        </div>

        <div className="mb-10">
          <h1 className='text-3xl font-bold mb-5'>{request.title}</h1>

          <h2 className='text-xl mb-3 underline'>Contact</h2>
          <p><span className="font-bold">Requester:</span> {request.by_name ?? ''}</p>
          <p><span className="font-bold">Requester Email:</span> {request.by_email ?? ''}</p>
          <p><span className="font-bold">Requester Phone:</span> {request.by_phone ?? ''}</p>
        </div>

        <div className="mb-10">
          <h2 className='text-xl mb-3 underline'>General Info</h2>
          <p><span className="font-bold">Craft:</span> {request.craft}</p>
          <p><span className="font-bold">Created at:</span> {formatDate(request.created_at)}</p>
          <p><span className="font-bold">Priority:</span> {request.priority}</p>
          <p><span className="font-bold">Estimated Hours:</span> {request.estimated_hours ?? ''}</p>
          <p><span className="font-bold">Needed By:</span> {formatDate(request.needed_by) ?? 'N/A'}</p>
        </div>

        <div className="mb-10">
          <h2 className='text-xl mb-3 underline'>Problem</h2>
          <p>{request.problem}</p>
        </div>

        <div className="mb-10">
          <h2 className='text-xl mb-3 underline'>Cause</h2>
          <p>{request.cause}</p>
        </div>
        
        {request.materials.length && (
          <div className="mb-10">
            <h2 className='text-xl mb-3 underline'>Materials</h2>
            <ul className="list-disc list-inside">
              {request.materials.map((material, idx) => (
                <li key={idx}>
                  {material.qty} - {material.item}
                </li>
              ))}
            </ul>
          </div>
        )}

        {request.scope.length > 0 && (
          <div className="mb-10">
            <h2 className='text-xl mb-3 underline'>Scope</h2>
            <ul className="list-decimal list-inside">
              {request.scope.map((scope, idx) => (
                <li key={idx}>
                  <p>{scope.details}</p>
                  {scope.images.map((image, imageIndex) => (
                    <div className="w-40 h-40 relative" key={imageIndex}>
                    <Image
                      src={image.publicURL}
                      objectFit="contain"
                      layout="fill" />
                  </div>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        )}

      </div>
    </AppLayout>
  );
}