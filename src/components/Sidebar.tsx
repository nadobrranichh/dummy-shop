import { useNavigate } from "react-router-dom";
import { sidebarList } from "../lists/sidebarList";
import { useAppDispatch, useAppSelector } from "../store/custom-hooks";
import classes from "./Sidebar.module.css";
import { uiActions } from "../store/ui-slice";

export default function Sidebar() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.ui.isSidebarOpen);

  const goToPage = function (path: string) {
    dispatch(uiActions.closeSidebar());
    navigate(path);
  };

  return (
    <aside className={`${classes.sidebar} ${isOpen ? classes.open : ""}`}>
      <p className="text-regular">Navigation:</p>
      <ul className={classes["sidebar-list"]}>
        {sidebarList.map((item) => (
          <li key={item.id} onClick={() => goToPage(item.path)}>
            {item.name.toUpperCase()}
          </li>
        ))}
      </ul>
      <p className="text-regular">Theme:</p>
      <input
        className={classes["theme-switch"]}
        type="checkbox"
        onChange={() => dispatch(uiActions.toggleTheme())}
      />
    </aside>
  );
}
