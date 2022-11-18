import {useState} from "react";

export function FormMaterials({ formInfo, addMaterialToInfo, deleteMaterialFromInfo }) {
  const defaultNewMaterial = {qty: 0, item: ''};
  const [newMaterial, setNewMaterial] = useState(defaultNewMaterial);

  const handleAddMaterial = () => {
    addMaterialToInfo(newMaterial)
    // reset new material
    setNewMaterial(defaultNewMaterial);
  }

  return (
    <div className="flex flex-col bg-white shadow p-5 rounded-lg mb-10">
      <h2 className='text-2xl font-bold mb-5'>Tools/Parts/Materials</h2>
      <div className="grid grid-cols-12 gap-4">
        <div className="flex flex-col col-span-2">
          <label htmlFor="number">Quantity</label>
          <input
            type="number"
            placeholder='1'
            onChange={(e) => setNewMaterial({...newMaterial, qty: e.target.value })}
            value={newMaterial.qty}
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
              onKeyDown={(e) => e.code === 'Enter' ? handleAddMaterial() : ''}
              value={newMaterial.item}
              className='border-indigo-100 border-solid border-2 p-2 rounded-lg pr-12'
            />
            <button
              type="button"
              onClick={handleAddMaterial}
              className='absolute right-0 bottom-0 text-white bg-emerald-500 p-1 ml-3 w-11 h-11 rounded-lg hover:bg-emerald-400'>
              +
            </button>
          </div>
        </div>
      </div>

      {formInfo.materials.length > 0 && (
        <div className="w-full md:w-80 p-4 bg-white dark:bg-gray-800 mt-3">
          {formInfo.materials.map((material, idx) => (
            <div key={idx} className="flex items-start mb-6 rounded justify-between">
              <span className="rounded-full text-gray-800 ">
                {material.qty}
              </span>
              <div className="flex items-center w-full justify-between">
                <div className="flex flex-col w-full ml-3 items-start justify-between">
                  <p className="text-gray-700 dark:text-white">
                    {material.item}
                  </p>
                  <button
                    className="bg-red-400 text-white hover:bg-red-500 rounded-lg px-2 py-1 mt-2"
                    type="button"
                    onClick={() => deleteMaterialFromInfo(idx)}>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}