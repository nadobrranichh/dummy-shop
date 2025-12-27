import { Suspense } from "react";
import { Await, useLocation, useRouteLoaderData } from "react-router-dom";
import ErrorBlock from "./ErrorBlock";
import classes from "./Header.module.css";
import { useAppSelector, useAppDispatch } from "../../store/custom-hooks";
import { selectedCategoriesActions } from "../../store/selected-categories-slice";
import { uiActions } from "../../store/ui-slice";
import HamburgerMenuDarkImg from "../../assets/hamburger-menu-dark.svg";
import HamburgerMenuLightImg from "../../assets/hamburger-menu-light.svg";

export default function Header() {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { categories } = useRouteLoaderData("root");
  const selectedCategories = useAppSelector(
    (state) => state.selectedCategories
  );
  const theme = useAppSelector((state) => state.ui.theme);

  const toggleSidebar = function () {
    dispatch(uiActions.toggleSidebar());
  };

  const toggleCategorySelection = function (category: string) {
    if (selectedCategories.includes(category))
      dispatch(selectedCategoriesActions.removeCategory(category));
    else dispatch(selectedCategoriesActions.addCategory(category));
  };

  return (
    <header>
      <div className={classes.container}>
        <h1>DummyShop</h1>
        <img
          src={theme === "dark" ? HamburgerMenuDarkImg : HamburgerMenuLightImg}
          className={classes["hamburger-menu"]}
          onClick={toggleSidebar}
        />
      </div>
      {location.pathname === "/cart" || (
        <div className={classes["categories-container"]}>
          <Suspense
            fallback={<p className="loading-text">Loading categories...</p>}
          >
            <Await resolve={categories} errorElement={<ErrorBlock />}>
              {(resolvedCategories) => (
                <ul className={classes["categories-list"]}>
                  {resolvedCategories.map((category: string) => (
                    <li
                      className={`${classes.category} ${
                        selectedCategories.includes(category)
                          ? classes.active
                          : ""
                      }`}
                      key={category}
                      onClick={() => toggleCategorySelection(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
              )}
            </Await>
          </Suspense>
        </div>
      )}
    </header>
  );
}
