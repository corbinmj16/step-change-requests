import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import {supabase} from "../../utils/supabase";
import {AppLayout} from "../../layouts";
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
  const defaultFormInfo = {
    by_name: 'Craig Kerney',
    by_email: 'Craig.Kerney@arconic.com',
    by_phone: '563-342-4298',
    title: '',
    craft: '',
    estimated_hours: '',
    done_by: '',
    frequency: 'Daily',
    needed_by: '',
    priority: '',
    problem: '',
    cause: '',
    materials: [],
    scope: [],
  };

  const [formInfo, setFormInfo] = useState(defaultFormInfo);

  const handleFormInfoUpdate = (e) => {
    const {name, value} = e.target;
    setFormInfo({...formInfo, [name]: value });
  }

  const submitNewRequest = async (e) => {
    e.preventDefault();

    const {data, error} = await supabase
      .from('requests')
      .insert(formInfo);

    if (error) {
      throw new Error(error.message);
    }

    await router.push('/');
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
      <PageHeaderTitle title="Create New Request" />

      <div className="container flex flex-col mx-auto max-w-6xl py-6 sm:px-6 lg:px-8">
        {/* Requester */}
        <FormRequestorInfo
          formInfo={formInfo}
          handleFormInfoUpdate={handleFormInfoUpdate} />

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
          onClick={submitNewRequest}
          type="submit"
          className="bg-blue-500 rounded-lg text-white p-2 hover:bg-blue-400 font-bold">
          Submit
        </button>
      </div>
    </AppLayout>

  )
}