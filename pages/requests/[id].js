import ReactToPrint from "react-to-print";
import { useRef } from "react";
import { supabase } from "../../utils/supabase";
import {AppLayout, ContentLayout} from "../../layouts";
import { formatDate } from "../../utils/helpers";
import {PageHeaderTitle} from "../../components";

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
  const pdfRef = useRef();

  const pdfFileTitle = request.title.replace(' ', '_');

  return (
    <AppLayout>
      <PageHeaderTitle title={request.title} />

      <ContentLayout ref={pdfRef}>
        <ReactToPrint
          trigger={() => <button className="print:hidden inline-block mt-5 font-medium text-blue-500">Save to PDF</button>}
          documentTitle={pdfFileTitle}
          content={() => pdfRef.current}
        />

        <section className="mb-10">
          <h2 className='text-xl mb-3 underline'>Contact</h2>
          <p><span className="font-bold">Requester:</span> {request.by_name ?? ''}</p>
          <p><span className="font-bold">Requester Email:</span> {request.by_email ?? ''}</p>
          <p><span className="font-bold">Requester Phone:</span> {request.by_phone ?? ''}</p>
        </section>

        <section className="mb-10">
          <h2 className='text-xl mb-3 underline'>General Info</h2>
          <p><span className="font-bold">Craft:</span> {request.craft}</p>
          <p><span className="font-bold">Created at:</span> {formatDate(request.created_at)}</p>
          <p><span className="font-bold">Priority:</span> {request.priority}</p>
          <p><span className="font-bold">Estimated Hours:</span> {request.estimated_hours ?? ''}</p>
          <p><span className="font-bold">Needed By:</span> {formatDate(request.needed_by) ?? 'N/A'}</p>
        </section>

        <section className="mb-10">
          <h2 className='text-xl mb-3 underline'>Problem</h2>
          <p>{request.problem}</p>
        </section>

        <section className="mb-10">
          <h2 className='text-xl mb-3 underline'>Cause</h2>
          <p>{request.cause}</p>
        </section>
        
        {request.materials.length && (
          <section className="mb-10">
            <h2 className='text-xl mb-3 underline'>Materials</h2>
            <ul className="list-disc list-inside">
              {request.materials.map((material, idx) => (
                <li key={idx}>
                  {material.qty} - {material.item}
                </li>
              ))}
            </ul>
          </section>
        )}

        {request.scope.length > 0 && (
          <section className="mb-10">
            <h2 className='text-xl mb-3 underline'>Scope</h2>

            <ul>
              {request.scope.map((scope, idx) => (
                <li key={idx} className="bg-white rounded shadow-md mb-5 p-4">
                  <p>{idx + 1}. {scope.details}</p>

                  <div className="flex flex-wrap my-4">
                    {scope.images.map((image, imageIndex) => (
                      <div className="relative w-full m-2" key={imageIndex}>
                        <img
                          src={image.publicURL}
                          className="max-w-full"
                        />
                      </div>
                    ))}
                  </div>

                </li>
              ))}
            </ul>
          </section>
        )}

      </ContentLayout>
    </AppLayout>
  );
}