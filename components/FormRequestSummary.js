import {Editor} from "./Editor";
import {useNewRequestStore} from "../store/useNewRequestStore";
import {useState} from "react";

export function FormRequestSummary({formInfo, handleFormInfoUpdate}) {
  const [summary, handleUpdateNewRequestInfo] = useNewRequestStore((state) => [
    state.summary,
    state.handleUpdateNewRequestInfo
  ]);

  return (
    <div className="flex flex-col bg-white shadow p-5 rounded-lg mb-10">
      <h2 className='text-2xl font-bold mb-5'>Request Summary</h2>
      <div className="grid grid-cols-1 xl:grid-cols-2 xl:gap-4">
        <div className="flex flex-col">
          <Editor
            id="summary"
            name="summary"
            value={summary}
            className="flex flex-col"
            onChange={(content) => handleUpdateNewRequestInfo({summary: content})}
            placeholder="Type problem here..."
          />
        </div>
      </div>
    </div>
  )
}