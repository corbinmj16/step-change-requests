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
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

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

    router.push(`/app/requests/${request.id}?updated=true`);
  }

  const handleDelete = async () => {
    try {
      const {error} = await supabase.from('requests').delete().eq('id', request.id);
      if (error) throw error;
    } catch (e) {
      console.error('Error Deleting: ', e.message);
    } finally {
      setIsDeleteModalOpen(false);
      router.push('/app?deleted=true');
    }
  }

  return (
    <AppLayout user={user}>
      <PageHeaderTitle title={`${request.title}`} />

      <div className="bg-yellow-200 -mt-5">
        <div className={`container mx-auto max-w-6xl py-2 px-4 lg:px-8`}>
          <p className="italics">You are in edit mode</p>
        </div>
      </div>

      <ContentLayout>
        <button
          onClick={() => setIsDeleteModalOpen(true)}
          className="inline bg-red-500 rounded-lg text-white p-2 hover:bg-red-400 font-bold mb-5"
        >
          Delete this request
        </button>

        <Modal
          isOpen={isDeleteModalOpen}
          handleModalClose={handleDelete}
          title="Warning!"
          message="You are going to delete this request. Are you sure?"
          buttonText="Delete"
          modalType="danger"
        />

        <FormGeneralInfo />

        <FormRequestSummary />

        <FormMaterials />

        <FormRequestScope />

        <button
          onClick={submitNewRequest}
          type="submit"
          className="sticky bottom-2 bg-blue-500 rounded-lg text-white p-2 hover:bg-blue-400 font-bold">
          Submit
        </button>
      </ContentLayout>
    </AppLayout>

  )
}