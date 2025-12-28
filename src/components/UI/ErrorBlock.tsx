import type { HttpError } from "../../types/http";
import classes from "./ErrorBlock.module.css";

export default function ErrorBlock({ error }: { error: HttpError }) {
  return (
    <div className={classes["error-block"]}>
      <p className={classes["error-code"]}>{error.code}</p>
      <p className={classes["error-text"]}>{error.message}.</p>
    </div>
  );
}
