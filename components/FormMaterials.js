import {useState, useRef} from "react";
import {useNewRequestStore} from "../store/useNewRequestStore";

export function FormMaterials({ deleteMaterialFromInfo }) {
  const quantityRef = useRef(null);
  const [materials, handleAddMaterial, handleDeleteMaterial] = useNewRequestStore((state) => [
    state.materials,
    state.handleAddMaterial,
    state.handleDeleteMaterial,
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
      <div className="grid grid-cols-12 gap-4">
        <div className="flex flex-col col-span-2">
          <label htmlFor="number">Quantity</label>
          <input
            type="number"
            ref={quantityRef}
            placeholder='1'
            onChange={(e) => setNewMaterial({...newMaterial, qty: e.target.value })}
            value={newMaterial.qty ?? 0}
            className='border-indigo-100 border-solid border-2 p-2 rounded-lg'
          />
        </div>
        <div className="relative col-span-10">
          <div className="flex flex-col ">
            <label htmlFor="material">Tool/Part/Material</label>
            <input
              type="text"
              placeholder='Power Drill'
              onChange={(e) => setNewMaterial({...newMaterial, item: e.target.value })}
              onKeyDown={(e) => e.code === 'Enter' ? addMaterial() : ''}
              value={newMaterial.item}
              className='border-indigo-100 border-solid border-2 p-2 rounded-lg pr-12'
            />
            <button
              type="button"
              onClick={() => addMaterial()}
              className='absolute right-0 bottom-0 text-white bg-emerald-500 p-1 ml-3 w-11 h-11 rounded-lg hover:bg-emerald-400'>
              +
            </button>
          </div>
        </div>
      </div>

      {materials?.length > 0 && (
        <div className="overflow-x-auto relative mt-5 sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 border-l border-r">
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


        // <div className="w-full md:w-80 p-4 bg-white dark:bg-gray-800 mt-3">
        //   {materials.map((material, idx) => (
        //     <div key={idx} className="flex items-start mb-6 rounded justify-between">
        //       <span className="rounded-full text-gray-800 ">
        //         {material.qty}
        //       </span>
        //       <div className="flex items-center w-full justify-between">
        //         <div className="flex flex-col w-full ml-3 items-start justify-between">
        //           <p className="text-gray-700 dark:text-white">
        //             {material.item}
        //           </p>
        //
        //         </div>
        //       </div>
        //     </div>
        //   ))}
        // </div>
      )}
    </div>
  )
}