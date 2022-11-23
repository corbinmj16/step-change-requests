import {useState, useRef} from "react";
import {useNewRequestStore} from "../store/useNewRequestStore";
import {PlayCircleIcon} from "@heroicons/react/24/outline";

export function FormMaterials({ deleteMaterialFromInfo }) {
  const quantityRef = useRef(null);
  const [materials, handleAddMaterial, handleDeleteMaterial] = useNewRequestStore((state) => [
    state?.materials,
    state?.handleAddMaterial,
    state?.handleDeleteMaterial,
  ]);
  const defaultNewMaterial = {qty: 0, item: ''};
  const [newMaterial, setNewMaterial] = useState(defaultNewMaterial);

  const addMaterial = () => {
    handleAddMaterial(newMaterial);
    setNewMaterial(defaultNewMaterial);
    quantityRef.current.focus();
  }

  return (
    <div className="flex flex-col bg-white shadow p-5 rounded-lg mb-10">
      <h2 className='text-2xl font-bold mb-5'>Tools/Parts/Materials</h2>
      <div className="flex flex-col sm:flex-row">
        <div className="flex-none mb-5 sm:mb-0">
          <label htmlFor="number" className="block mb-2 text-sm font-medium text-gray-900">Quantity</label>
          <input
            type="number"
            ref={quantityRef}
            placeholder='1'
            onChange={(e) => setNewMaterial({...newMaterial, qty: e.target.value })}
            value={newMaterial.qty ?? 0}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>
        <div className="flex-auto mb-5 sm:mb-0 sm:ml-3 sm:mr-3">
          <div className="flex flex-col ">
            <label htmlFor="material" className="block mb-2 text-sm font-medium text-gray-900">Tool/Part/Material</label>
            <div className="relative">
              <input
                type="text"
                placeholder='Power Drill'
                onChange={(e) => setNewMaterial({...newMaterial, item: e.target.value })}
                onKeyDown={(e) => e.code === 'Enter' ? addMaterial() : ''}
                value={newMaterial.item}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              />
            </div>
          </div>
        </div>
        <div className="flex-none mt-auto mb-5 sm:mb-0">
          <button
            type="button"
            onClick={() => addMaterial()}
            className=' text-white bg-emerald-500 py-2.5 px-10 rounded-lg hover:bg-emerald-400'>
            Add
          </button>
        </div>
      </div>


      {materials?.length > 0 && (
        <div className="overflow-x-auto relative mt-5 sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 border">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th scope="col" className="py-3 px-6">
                  Material Name
                </th>
                <th scope="col" className="py-3 px-6">
                  Quantity
                </th>
                <th scope="col" className="py-3 px-6">
                </th>
                {/*<th scope="col" className="py-3 px-6">*/}
                {/*  <span className="sr-only">Edit</span>*/}
                {/*</th>*/}
              </tr>
            </thead>
            <tbody>
            {materials.map((material, idx) => (
              <tr key={idx} className="bg-white border-b">
                <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap">
                  {material.item}
                </th>
                <td className="py-4 px-6">
                  {material.qty}
                </td>
                <td className="py-4 px-6">
                  <button
                    className="bg-red-400 text-white hover:bg-red-500 rounded-lg px-2 py-1 mt-2"
                    type="button"
                    onClick={() => handleDeleteMaterial(idx)}>
                    Delete
                  </button>
                </td>
                {/*<td className="py-4 px-6 text-right">*/}
                {/*  <a href="#" className="font-medium text-blue-600 hover:underline">Edit</a>*/}
                {/*</td>*/}
              </tr>
            ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}