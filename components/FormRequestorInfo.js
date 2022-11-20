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
        <div className="flex flex-col">
          <label htmlFor="requester" className="font-bold">Requested By</label>
          <input
            type="text"
            name="by_name"
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
            value={by_name}
            onChange={(e) => handleUpdateNewRequestInfo({by_name: e.target.value})}
            placeholder="Craig Kerney" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email" className="font-bold">Email</label>
          <input
            type="email"
            name="by_email"
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
            value={by_email}
            onChange={(e) => handleUpdateNewRequestInfo({by_email: e.target.value})}
            placeholder="craig.kerney@outlook.com"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone" className="font-bold">Phone</label>
          <input
            type="phone"
            name="by_phone"
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
            value={by_phone}
            onChange={(e) => handleUpdateNewRequestInfo({by_phone: e.target.value})}
            placeholder="555-555-5555"/>
        </div>
      </div>
    </div>
  )
}