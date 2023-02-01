import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {supabase} from "../../../../utils/supabase";
import {getUser} from "../../../../utils/helpers";
import {AppLayout, ContentLayout} from "../../../../layouts";
import {
  FormGeneralInfo,
  FormMaterials,
  FormRequestScope,
  FormRequestSummary, Modal,
  PageHeaderTitle,
} from "../../../../components";
import {useNewRequestStore} from "../../../../store/useNewRequestStore";

export async function getServerSideProps({req, params}) {
  const user = await getUser(req);

  if (!user) {
    return { props: {}, redirect: { destination: '/login'} };
  }

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
      user
    },
  };

}

export default function EditPage({request, user}) {
  const router = useRouter();
  const newRequestStore = useNewRequestStore();
  const [isDeleteModalShowing, setIsDeleteModalShowing] = useState(false);

  useEffect(() => {
    newRequestStore.setAllRequestFields(request);
  },[]);

  const submitNewRequest = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('requests')
      .update({
        by_name: newRequestStore.by_name,
        by_email: newRequestStore.by_email,
        by_phone: newRequestStore.by_phone,
        title: newRequestStore.title,
        craft: newRequestStore.craft,
        estimated_hours: newRequestStore.estimated_hours,
        done_by: newRequestStore.done_by,
        frequency: newRequestStore.frequency,
        needed_by: newRequestStore.needed_by,
        priority: newRequestStore.priority,
        summary: newRequestStore.summary,
        materials: newRequestStore.materials,
        scope: newRequestStore.scope,
      })
      .eq('id', request.id);

    if (error) {
      console.error(error);
      throw new Error(error);
    }

    newRequestStore.resetNewRequestState();

    router.push(`/app/requests/${request.id}?show_updated=true`);
  }
  const areYouSure = () => {
    setIsDeleteModalShowing(true);
  }

  async function deleteRequest() {
    try {
      const {error} = await supabase.from('requests').delete().eq('id', request.id);
      if (error) throw error;
    } catch (e) {
      console.error('Error Deleting: ', e.message);
    } finally {
      setIsDeleteModalShowing(false);
      router.push('/app');
    }
  }

  return (
    <AppLayout user={user}>
      <PageHeaderTitle title={`${request.title}`}>
        <p className="italics">Editing</p>
      </PageHeaderTitle>

      <ContentLayout>
        <div className={`ml-auto`}>
          <button
            type={`button`}
            onClick={areYouSure}
            className={`mb-4 rounded-md border border-transparent bg-red-600 hover:bg-red-700 focus:ring-red-500 bg-red-100 px-4 py-2 text-base font-medium text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
          >
            Delete
          </button>
        </div>

        <FormGeneralInfo />

        <FormRequestSummary />

        <FormMaterials />

        <FormRequestScope />

        <button
          onClick={submitNewRequest}
          type="submit"
          className="bg-blue-500 rounded-lg text-white p-2 hover:bg-blue-400 font-bold">
          Submit
        </button>
      </ContentLayout>

      <Modal
        handleCancelAndClose={() => setIsDeleteModalShowing(false)}
        handleModalButton={() => deleteRequest(request.id)}
        isOpen={isDeleteModalShowing}
        title={`Warning!`}
        message={`Are you sure you want to delete ${request.title}?`}
        buttonText={`Delete`}
        modalType={`danger`}
      />
    </AppLayout>

  )
}