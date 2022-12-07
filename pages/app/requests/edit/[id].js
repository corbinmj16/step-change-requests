import {useRouter} from "next/router";
import {useEffect} from "react";
import {supabase} from "../../../../utils/supabase";
import {getUser} from "../../../../utils/helpers";
import {AppLayout, ContentLayout} from "../../../../layouts";
import {
  FormGeneralInfo,
  FormMaterials,
  FormRequestScope,
  FormRequestSummary,
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

  return (
    <AppLayout user={user}>
      <PageHeaderTitle title={`${request.title}`}>
        <p className="italics">Editing</p>
      </PageHeaderTitle>

      <ContentLayout>
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
    </AppLayout>

  )
}