import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {supabase} from "../../../utils/supabase";
import {getUser} from "../../../utils/helpers";
import {AppLayout} from "../../../layouts";
import {
  FormGeneralInfo,
  FormMaterials,
  FormRequestorInfo,
  FormRequestScope,
  FormRequestSummary, PageHeaderTitle
} from "../../../components";

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
  const [formInfo, setFormInfo] = useState(request);

  const handleFormInfoUpdate = (e) => {
    const {name, value} = e.target;
    setFormInfo({...formInfo, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { data, error } = await supabase
      .from('requests')
      .update(formInfo);

    if (error) {
      throw new Error(error.message);
    }

    router.push(`/requests/${formInfo.id}?show_updated=true`);
  }

  const addMaterialToInfo = (newMaterial) => {
    // don't add nothing
    if (newMaterial.qty <= 0 || newMaterial.item === '') return;

    // add the new object to array
    formInfo.materials.push(newMaterial);
    setFormInfo({...formInfo});
  }

  const deleteMaterialFromInfo = (idx) => {
    formInfo.materials.splice(idx, 1);
    setFormInfo({...formInfo});
  }

  const addScopeToInfo = async (newScope) => {
    // don't add nothing
    if (newScope.details === '') return;

    formInfo.scope.push(newScope);
    setFormInfo({...formInfo});
  }

  const deleteScope = async (idx) => {
    // delete object from array.
    const scopeToDelete = formInfo.scope.splice(idx, 1);
    // update formInfo object
    setFormInfo({...formInfo});
  }

  return (
    <AppLayout user={user}>
      <PageHeaderTitle title={`${formInfo.title}`}>
        <p>Editing</p>
      </PageHeaderTitle>

      <div className="container flex flex-col mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
        {/* Requester */}
        {/*<FormRequestorInfo*/}
        {/*  formInfo={formInfo}*/}
        {/*  handleFormInfoUpdate={handleFormInfoUpdate} />*/}

        {/* General Info */}
        <FormGeneralInfo
          formInfo={formInfo}
          handleFormInfoUpdate={handleFormInfoUpdate} />

        {/* Request Summary */}
        <FormRequestSummary
          formInfo={formInfo}
          handleFormInfoUpdate={handleFormInfoUpdate} />

        {/* Materials */}
        <FormMaterials
          formInfo={formInfo}
          addMaterialToInfo={addMaterialToInfo}
          deleteMaterialFromInfo={deleteMaterialFromInfo} />

        {/*Scope Section */}
        <FormRequestScope
          formInfo={formInfo}
          addScopeToInfo={addScopeToInfo}
          deleteScope={deleteScope} />

        <button
          onClick={handleSubmit}
          type="submit"
          className="bg-blue-500 rounded-lg text-white p-2 hover:bg-blue-400 font-bold">
          Submit
        </button>
      </div>
    </AppLayout>

  )
}