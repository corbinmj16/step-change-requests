export function FormRequestSummary({formInfo, handleFormInfoUpdate}) {
  return (
    <section className="flex flex-col bg-white shadow p-5 rounded-lg mb-10">
      <h2 className='text-2xl font-bold mb-5'>Request Summary</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-4">
        <div className="flex flex-col">
          <label htmlFor="problem">Problem</label>
          <textarea
            name="problem"
            onChange={handleFormInfoUpdate}
            value={formInfo.problem}
            id="problem"
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
            placeholder="Type problem here..."
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="root_cause">Root Cause</label>
          <textarea
            name="cause"
            id="root_cause"
            onChange={handleFormInfoUpdate}
            value={formInfo.cause}
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
            placeholder="Type root cause here..."
          />
        </div>
      </div>
    </section>
  )
}