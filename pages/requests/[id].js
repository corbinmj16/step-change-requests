import ReactToPrint from "react-to-print";
import Link from "next/link";
import {useRef, useEffect} from "react";
import {useRouter} from "next/router";
import { supabase } from "../../utils/supabase";
import {AppLayout, ContentLayout} from "../../layouts";
import {formatDate, getUser} from "../../utils/helpers";
import {PageHeaderTitle, Modal, ContentCard} from "../../components";

export async function getServerSideProps({req, params, query}) {
  const user = await getUser(req);

  if (!user) {
    return {
      props: {}, redirect: { destination: '/login' }
    }
  }

  const { id } = params;
  const {show_updated} = query;


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

  const showUpdateModal = show_updated === 'true' ? true : false;

  return {
    props: {
      request,
      user,
      showUpdateModal,
    }
  }
}

export default function RequestPage({ request, user, showUpdateModal }) {
  const router = useRouter();
  const pdfRef = useRef();

  const pdfFileTitle = request.title.replace(' ', '_');


  const handleModalClose = () => {
    router.replace(`/requests/${request.id}`, undefined, { shallow: true });
  }

  return (
    <AppLayout user={user}>
      <Modal isOpen={showUpdateModal} handleModalClose={handleModalClose} />

      <PageHeaderTitle title={request.title}>
        <ReactToPrint
          trigger={() => <button className="print:hidden inline-block mt-5 font-medium bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg">Save to PDF</button>}
          documentTitle={pdfFileTitle}
          content={() => pdfRef.current}
        />
        <Link href={`/requests/edit/${request.id}`}>
          <a className="print:hidden inline-block mt-5 font-medium bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 ml-3">Edit Request</a>
        </Link>
      </PageHeaderTitle>

      <div ref={pdfRef} className="container mx-auto max-w-6xl py-6 sm:px-6 lg:px-8 print:px-5">
        <h1 className="hidden print:block text-3xl font-bold tracking-tight text-gray-900 mb-5">{request.title}</h1>

        <ContentCard cardTitle="General Information">
          <section className="overflow-x-auto relative">
            <table className="w-full text-sm text-left text-gray-500">
              <tbody>
                <tr className="bg-white border-b">
                  <th scope="row" className="py-4 px-3 font-medium text-gray-900 whitespace-nowrap">
                    Name
                  </th>
                  <td className="py-4 px-3">
                    {request?.by_name ?? ''}
                  </td>
                </tr>
                <tr className="bg-gray-50 border-b">
                  <th scope="row" className="py-4 px-3 font-medium text-gray-900 whitespace-nowrap">
                    Email
                  </th>
                  <td className="py-4 px-3">
                    {request?.by_email ?? ''}
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <th scope="row" className="py-4 px-3 font-medium text-gray-900 whitespace-nowrap">
                    Phone
                  </th>
                  <td className="py-4 px-3">
                    {request?.by_phone ?? ''}
                  </td>
                </tr>
                <tr className="bg-gray-50 border-b">
                  <th scope="row" className="py-4 px-3 font-medium text-gray-900 whitespace-nowrap">
                    Craft
                  </th>
                  <td className="py-4 px-3">
                    {request?.craft ?? ''}
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <th scope="row" className="py-4 px-3 font-medium text-gray-900 whitespace-nowrap">
                    Created at
                  </th>
                  <td className="py-4 px-3">
                    {formatDate(request?.created_at) ?? ''}
                  </td>
                </tr>
                <tr className="bg-gray-50 border-b">
                  <th scope="row" className="py-4 px-3 font-medium text-gray-900 whitespace-nowrap">
                    Priority
                  </th>
                  <td className="py-4 px-3">
                    {request?.priority ?? ''}
                  </td>
                </tr>
                <tr className="bg-white border-b">
                  <th scope="row" className="py-4 px-3 font-medium text-gray-900 whitespace-nowrap">
                    Estimated Hours
                  </th>
                  <td className="py-4 px-3">
                    {request?.estimated_hours ?? ''}
                  </td>
                </tr>
                <tr className="bg-gray-50 border-b">
                  <th scope="row" className="py-4 px-3 font-medium text-gray-900 whitespace-nowrap">
                    Need By
                  </th>
                  <td className="py-4 px-3">
                    {formatDate(request?.needed_by) ?? 'N/A'}
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        </ContentCard>

        <ContentCard cardTitle="Summary">
          <section className="prose prose-headings:mt-2 max-w-none">
            <div dangerouslySetInnerHTML={{__html: request?.summary}}></div>
          </section>
        </ContentCard>

        {request?.materials.length > 0 && (
          <ContentCard cardTitle="Materials">
            <section>
              <ul className="list-disc list-inside">
                {request.materials.map((material, idx) => (
                  <li key={idx} className="prose max-w-none">
                    {material.qty} - {material.item}
                  </li>
                ))}
              </ul>
            </section>
          </ContentCard>
        )}

        {request?.scope.length > 0 && (
          <section>
            <ul>
              {request.scope.map((scope, idx) => (
                <ContentCard cardTitle={`${idx + 1}.`} key={idx}>
                  <div className="prose prose-headings:mt-2 max-w-none" dangerouslySetInnerHTML={{__html: scope.details}}></div>
                </ContentCard>
              ))}
            </ul>
          </section>
        )}

      </div>
    </AppLayout>
  );
}