import {useState} from "react";
import {useNewRequestStore} from "../store/useNewRequestStore";

export function FormRequestorInfo() {
  const [by_name, by_email, by_phone, handleUpdateNewRequestInfo] = useNewRequestStore((state) => [
    state.by_name,
    state.by_email,
    state.by_phone,
    state.handleUpdateNewRequestInfo
  ]);

  return (
    <div className="flex flex-col bg-white shadow p-5 rounded-lg mb-10">
      <h2 className='text-2xl font-bold mb-5'>Requester Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">

      </div>
    </div>
  )
}