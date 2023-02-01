import Link from "next/link";
export function Request({request}) {
  const {
    title,
    priority,
    needed_by,
    craft,
    estimated_hours,
  } = request;

  const badgeColorMap = {
    "Low": "bg-blue-100 text-blue-800",
    "Medium": "bg-yellow-100 text-yellow-800",
    "High": "bg-red-100 text-red-800",
  };

  return (
    <>
      <div className="bg-white max-w-2xl shadow overflow-hidden rounded-lg mb-5">
        <div className="px-4 py-4 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            <Link href={`/app/requests/${request.id}`}>
              <a className="hover:text-blue-500">
                {title}
              </a>
            </Link>
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            <span className={`${badgeColorMap[priority]} text-xs font-medium mr-2 px-2.5 py-0.5 rounded`}>
              {priority}
            </span>
          </p>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Needed By</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {needed_by}
              </dd>
            </div>
            <div className="bg-white px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Craft</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {craft}
              </dd>
            </div>
            <div className="bg-gray-50 px-4 py-2 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Est. Hours</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                {estimated_hours}
              </dd>
            </div>
            <div className="bg-white px-6 py-2 sm:grid sm:px-6 text-center border-t">
              <ul className="flex justify-between">
                <li className="flex-1">
                  <Link href={`/app/requests/edit/${request.id}`}>
                    <a
                      className="block text-md font-medium text-blue-500 hover:text-blue-300 focus:text-blue-300">Edit</a>
                  </Link>
                </li>
              </ul>
            </div>
          </dl>
        </div>
      </div>
    </>
  )
}