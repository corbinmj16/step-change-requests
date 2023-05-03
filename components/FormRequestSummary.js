import {Editor} from "./Editor";
import {useNewRequestStore} from "../store/useNewRequestStore";
import {ContentCard} from "./ContentCard";

export function FormRequestSummary() {
  const [summary, handleUpdateNewRequestInfo] = useNewRequestStore((state) => [
    state?.summary,
    state?.handleUpdateNewRequestInfo
  ]);

  return (
    <ContentCard cardTitle="Summary">
      <Editor
        id="summary"
        name="summary"
        value={summary ?? ''}
        theme="snow"
        className="flex flex-col prose max-w-none"
        onChange={(content) => handleUpdateNewRequestInfo({summary: content})}
        placeholder="The summary of this request is..."
      />
    </ContentCard>
  )
}