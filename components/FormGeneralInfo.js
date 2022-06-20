export function FormGeneralInfo({ formInfo, handleFormInfoUpdate }) {
  const frequencies = ["Daily", "Weekly", "Monthly", "Yearly", "Repair Only", "Other"];
  const priorities = ["Low", "Medium", "High", "Urgent"];

  return (
    <section className="bg-white shadow p-5 rounded-lg mb-10">
      <h2 className='text-2xl font-bold mb-5'>General Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
            onChange={handleFormInfoUpdate}
            value={formInfo.title}
            placeholder="Title"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="craft">Craft</label>
          <input
            type="text"
            name="craft"
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
            onChange={handleFormInfoUpdate}
            value={formInfo.craft}
            placeholder="Craft"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="requester">Estimated Hours</label>
          <input
            type="number"
            onChange={handleFormInfoUpdate}
            value={formInfo.estimated_hours}
            name="estimated_hours"
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
            placeholder="Estimated Hours"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="done_by">To Be Done By</label>
          <input
            type="text"
            name="done_by"
            onChange={handleFormInfoUpdate}
            value={formInfo.done_by}
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
            placeholder="U1 Maintenance"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="frequency">Frequency</label>
          <select
            name="frequency"
            onChange={handleFormInfoUpdate}
            value={formInfo.frequency}
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
            id="frequency">
              {frequencies.map((frequency, idx) => <option key={idx} value={frequency}>{frequency}</option>)}

          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="needed_by">Needed By</label>
          <input
            type="date"
            onChange={handleFormInfoUpdate}
            value={formInfo.needed_by}
            name="needed_by"
            id="needed_by"
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
          />
        </div>

        <div className="col-span-full">
          <label htmlFor="priority" className="mb-3 block">Priority</label>

          <div className="grid grid-cols-1 place-content-center md:grid-cols-4 md:gap-4">
            {priorities.map((priority, idx) => (
              <div key={idx} className="mb-2">
                <input type="radio" name="priority" id={priority} value={priority} onChange={handleFormInfoUpdate} />
                <label htmlFor={priority} className="ml-2">{priority}</label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}