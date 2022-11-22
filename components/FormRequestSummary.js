import {Editor} from "./Editor";
import {useNewRequestStore} from "../store/useNewRequestStore";
import {useState} from "react";
import {ContentCard} from "./ContentCard";

export function FormRequestSummary({formInfo, handleFormInfoUpdate}) {
  const [summary, handleUpdateNewRequestInfo] = useNewRequestStore((state) => [
    state.summary,
    state.handleUpdateNewRequestInfo
  ]);

  return (
    <ContentCard cardTitle="Summary">
      <Editor
        id="summary"
        name="summary"
        value={summary}
        className="flex flex-col"
        onChange={(content) => handleUpdateNewRequestInfo({summary: content})}
        placeholder="The summary of this request is..."
      />
    </ContentCard>
  )
}