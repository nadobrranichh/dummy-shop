import { useAppDispatch } from "../store/custom-hooks";
import { uiActions } from "../store/ui-slice";
import classes from "./SidebarBackdrop.module.css";

export default function SidebarBackdrop() {
  const dispatch = useAppDispatch();

  return (
    <div
      className={classes["sidebar-backdrop"]}
      onClick={() => dispatch(uiActions.closeSidebar())}
    ></div>
  );
}
