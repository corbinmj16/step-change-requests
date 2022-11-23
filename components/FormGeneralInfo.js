import {useNewRequestStore} from "../store/useNewRequestStore";
import {ContentCard} from "./ContentCard";

export function FormGeneralInfo() {
  const [by_name, by_email, by_phone, title, craft, estimated_hours, done_by, frequency, needed_by, priority, handleUpdateNewRequestInfo] = useNewRequestStore((state) => [
    state?.by_name,
    state?.by_email,
    state?.by_phone,
    state?.title,
    state?.craft,
    state?.estimated_hours,
    state?.done_by,
    state?.frequency,
    state?.needed_by,
    state?.priority,
    state?.handleUpdateNewRequestInfo
  ]);
  const frequencies = ["Daily", "Weekly", "Monthly", "Yearly", "Repair Only"];
  const priorities = ["Low", "Medium", "High"];

  return (
    <ContentCard cardTitle='General Information'>
      <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
        <div className="flex flex-col mb-4 lg:mb-2">
          <label htmlFor="requester" className="block mb-2 text-sm font-medium text-gray-900">Requested By</label>
          <input
            type="text"
            name="by_name"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={by_name}
            onChange={(e) => handleUpdateNewRequestInfo({by_name: e.target.value})}
            placeholder="Craig Kerney" />
        </div>

        <div className="flex flex-col mb-4 lg:mb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
          <input
            type="email"
            name="by_email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={by_email}
            onChange={(e) => handleUpdateNewRequestInfo({by_email: e.target.value})}
            placeholder="craig.kerney@outlook.com"/>
        </div>

        <div className="flex flex-col mb-4 lg:mb-2">
          <label htmlFor="phone" className="block mb-2 text-sm font-medium text-gray-900">Phone</label>
          <input
            type="phone"
            name="by_phone"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={by_phone}
            onChange={(e) => handleUpdateNewRequestInfo({by_phone: e.target.value})}
            placeholder="555-555-5555"/>
        </div>

        <div className="flex flex-col mb-4 lg:mb-2">
          <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => handleUpdateNewRequestInfo({title: e.target.value})}
            value={title}
            placeholder="Title"/>
        </div>

        <div className="flex flex-col mb-4 lg:mb-2">
          <label htmlFor="craft" className="block mb-2 text-sm font-medium text-gray-900">Craft</label>
          <input
            type="text"
            name="craft"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            onChange={(e) => handleUpdateNewRequestInfo({craft: e.target.value})}
            value={craft}
            placeholder="Craft"/>
        </div>

        <div className="flex flex-col mb-4 lg:mb-2">
          <label htmlFor="requester" className="block mb-2 text-sm font-medium text-gray-900">Estimated Hours</label>
          <input
            type="number"
            value={estimated_hours}
            onChange={(e) => handleUpdateNewRequestInfo({estimated_hours: e.target.value})}
            name="estimated_hours"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="Estimated Hours"/>
        </div>

        <div className="flex flex-col mb-4 lg:mb-2">
          <label htmlFor="done_by" className="block mb-2 text-sm font-medium text-gray-900">To Be Done By</label>
          <input
            type="text"
            name="done_by"
            onChange={(e) => handleUpdateNewRequestInfo({done_by: e.target.value})}
            value={done_by}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="U1 Maintenance"/>
        </div>

        <div className="flex flex-col mb-4 lg:mb-2">
          <label htmlFor="frequency" className="block mb-2 text-sm font-medium text-gray-900">Frequency</label>
          <select
            name="frequency"
            onChange={(e) => handleUpdateNewRequestInfo({frequency: e.target.value})}
            value={frequency}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            id="frequency">

            {frequencies.map((fq, idx) => <option key={idx} value={fq} >{fq}</option>)}
          </select>
        </div>

        <div className="flex flex-col mb-4 lg:mb-2">
          <label htmlFor="needed_by" className="block mb-2 text-sm font-medium text-gray-900">Needed By</label>
          <input
            type="date"
            onChange={(e) => handleUpdateNewRequestInfo({needed_by: e.target.value})}
            value={needed_by}
            name="needed_by"
            id="needed_by"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          />
        </div>

        <div className="flex flex-col mb-4 lg:mb-2">
          <label htmlFor="priority" className="block mb-2 text-sm font-medium text-gray-900">Priority</label>
          <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex">
            {priorities.map((prio, idx) => (
              <li key={idx} className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
                <div className="flex items-center pl-3">
                  <input
                    type="radio"
                    name="priority"
                    id={prio}
                    value={prio}
                    checked={prio === priority}
                    onChange={(e) => handleUpdateNewRequestInfo({priority: e.target.value})}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />
                  <label
                    htmlFor={prio}
                    className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300">
                    {prio}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </ContentCard>


  )
}
