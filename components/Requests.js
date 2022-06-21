import {useEffect, useState} from "react";
import {supabase} from "../utils/supabase";
import {Request} from "./Request";

export function Requests() {
  const [requests, setRequests] = useState([]);

  const fetchRequests = async () => {
    let {data, error} = await supabase
      .from('items')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    setRequests(data);
  }

  useEffect(() => {
    fetchRequests();
  }, [requests]);

  return (
    <>
      <h2 className='text-3xl font-bold mb-5 mt-5'>All Requests</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {requests.map((request) => <Request key={request.id} request={request} /> )}
      </div>
    </>
  )
}