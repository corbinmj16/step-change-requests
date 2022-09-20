import {Request} from "./Request";

export function Requests({ requests }) {

  if (!requests || requests.length <= 0) {
    return (
      <h2 className='text-3xl font-bold mb-5 mt-5'>You have no requests. Try creating a new requet.</h2>
    )
  }

  return (
    <>
      <h2 className='text-3xl font-bold mb-5 mt-5'>All Requests</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests.map((request) => <Request key={request.id} request={request} /> )}
      </div>
    </>
  )
}