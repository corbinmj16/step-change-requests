import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {supabase} from "../../utils/supabase";
import {AppLayout, ContentLayout} from "../../layouts";
import {getUser} from "../../utils/helpers";
import {useNewRequestStore} from "../../store/useNewRequestStore";
import {
  FormGeneralInfo,
  FormMaterials,
  FormRequestorInfo,
  FormRequestScope,
  FormRequestSummary,
  PageHeaderTitle,
  Editor,
} from "../../components";

export async function getServerSideProps({req}) {
  const user = await getUser(req);

  if (!user) {
    return { props: {}, redirect: { destination: '/login'} };
  }

  return {
    props: { user },
  };

}

export default function New({user}) {
  const router = useRouter();
  const newRequestStore = useNewRequestStore();

  const submitNewRequest = async (e) => {
    e.preventDefault();

    const {data, error} = await supabase
      .from('requests')
      .insert({
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
      });

    if (error) {
      throw new Error(error.message);
    }

    newRequestStore.resetNewRequestState();

    await router.push('/?request_success=true');
  }

  return (
    <AppLayout user={user}>
      <PageHeaderTitle title="New Request" />

      <ContentLayout>
        {/* <FormRequestorInfo />*/}

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