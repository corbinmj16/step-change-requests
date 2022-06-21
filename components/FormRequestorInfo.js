export function FormRequestorInfo({formInfo, handleFormInfoUpdate}) {
  return (
    <div className="flex flex-col bg-white shadow p-5 rounded-lg mb-10">
      <h2 className='text-2xl font-bold mb-5'>Requester Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4">
        <div className="flex flex-col">
          <label htmlFor="requester">Requested By</label>
          <input
            type="text"
            name="by_name"
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
            value={formInfo.by_name}
            onChange={handleFormInfoUpdate}
            placeholder="Craig Kerney" />
        </div>

        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="by_email"
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
            value={formInfo.by_email}
            onChange={handleFormInfoUpdate}
            placeholder="craig.kerney@outlook.com"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="phone">Phone</label>
          <input
            type="phone"
            name="by_phone"
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
            value={formInfo.by_phone}
            onChange={handleFormInfoUpdate}
            placeholder="555-555-5555"/>
        </div>
      </div>
    </div>
  )
}