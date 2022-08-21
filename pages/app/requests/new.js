import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import { useUser } from "../../../context/UserProvider";
import {supabase} from "../../../utils/supabase";
import {AppLayout} from "../../../layouts";
import {
  Editor,
  FormGeneralInfo,
  FormMaterials,
  FormRequestorInfo,
  FormRequestScope,
  FormRequestSummary
} from "../../../components";

export default function New() {
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

  const router = useRouter();
  const user = useUser();
  const [formInfo, setFormInfo] = useState(defaultFormInfo);


  useEffect(() => {
    if (!user) router.push('/app/login');
  }, [])

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

    await router.push('/app');
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
    <AppLayout>
      <div className="container flex flex-col w-full mx-auto px-3 pt-10 pb-20">
        <h1 className='text-3xl font-bold mb-10'>Create a New Request</h1>
        
        {/* <Editor /> */}

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
        {/* 0.03325832922792449.jpeg , 0.1936462417956264.png */}

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