import { useAsyncError } from "react-router-dom";
import type { HttpError } from "../../types/http";

export default function ErrorBlock() {
  const error = useAsyncError() as HttpError;
  console.log(error, error.message, error.info, error.code);
  return <div>ErrorBlock</div>;
}
