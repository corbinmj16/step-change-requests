import {useNewRequestStore} from "../store/useNewRequestStore";

export function FormGeneralInfo() {
  const [title, craft, estimated_hours, done_by, frequency, needed_by, priority, handleUpdateNewRequestInfo] = useNewRequestStore((state) => [
    state.title,
    state.craft,
    state.estimated_hours,
    state.done_by,
    state.frequency,
    state.needed_by,
    state.priority,
    state.handleUpdateNewRequestInfo
  ]);
  const frequencies = ["Daily", "Weekly", "Monthly", "Yearly", "Repair Only", "Other"];
  const priorities = ["Low", "Medium", "High", "Urgent"];

  return (
    <div className="bg-white shadow p-5 rounded-lg mb-10">
      <h2 className='text-2xl font-bold mb-5'>General Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
        <div className="flex flex-col">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
            onChange={(e) => handleUpdateNewRequestInfo({title: e.target.value})}
            value={title}
            placeholder="Title"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="craft">Craft</label>
          <input
            type="text"
            name="craft"
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
            onChange={(e) => handleUpdateNewRequestInfo({craft: e.target.value})}
            value={craft}
            placeholder="Craft"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="requester">Estimated Hours</label>
          <input
            type="number"
            value={estimated_hours}
            onChange={(e) => handleUpdateNewRequestInfo({estimated_hours: e.target.value})}
            name="estimated_hours"
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
            placeholder="Estimated Hours"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="done_by">To Be Done By</label>
          <input
            type="text"
            name="done_by"
            onChange={(e) => handleUpdateNewRequestInfo({done_by: e.target.value})}
            value={done_by}
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
            placeholder="U1 Maintenance"/>
        </div>

        <div className="flex flex-col">
          <label htmlFor="frequency">Frequency</label>
          <select
            name="frequency"
            onChange={(e) => handleUpdateNewRequestInfo({frequency: e.target.value})}
            value={frequency}
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
            id="frequency">

            {frequencies.map((frequency, idx) => <option key={idx} value={frequency}>{frequency}</option>)}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="needed_by">Needed By</label>
          <input
            type="date"
            onChange={(e) => handleUpdateNewRequestInfo({needed_by: e.target.value})}
            value={needed_by}
            name="needed_by"
            id="needed_by"
            className='border-indigo-100 border-solid border-2 p-2 mb-5 rounded-lg'
          />
        </div>

        <div className="col-span-full">
          <label htmlFor="priority" className="mb-3 block">Priority</label>

            <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
              {priorities.map((priority, idx) => (
                <li key={idx} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                  <div className="flex items-center pl-3">
                    <input
                      type="radio"
                      name="priority"
                      id={priority}
                      value={priority}
                      onChange={(e) => handleUpdateNewRequestInfo({priority: e.target.value})}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                    />
                    <label
                      htmlFor={priority}
                      className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">
                      {priority}
                    </label>
                  </div>
                </li>
              ))}
            </ul>

        </div>
      </div>
    </div>
  )
}
