import { Link, useLocation } from "react-router-dom";
import ErrorBlock from "./ErrorBlock";
import classes from "./Header.module.css";
import { useAppSelector, useAppDispatch } from "../../store/custom-hooks";
import { selectedCategoriesActions } from "../../store/selected-categories-slice";
import { uiActions } from "../../store/ui-slice";
import HamburgerMenuDarkImg from "../../assets/hamburger-menu-dark.svg";
import HamburgerMenuLightImg from "../../assets/hamburger-menu-light.svg";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories } from "../../http/http";
import type { HttpError } from "../../types/http";
import { useWindowDimensions } from "../../hooks/useWindowDimensions";
import { pagesList } from "../../lists/pagesList";
export default function Header() {
  const { isDesktop } = useWindowDimensions();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const selectedCategories = useAppSelector(
    (state) => state.selectedCategories
  );
  const theme = useAppSelector((state) => state.ui.theme);

  const {
    data: categories,
    isPending,
    isError,
    error,
  } = useQuery({ queryKey: ["categories"], queryFn: fetchCategories });

  const toggleSidebar = function () {
    dispatch(uiActions.toggleSidebar());
  };

  const toggleCategorySelection = function (category: string) {
    if (selectedCategories.includes(category))
      dispatch(selectedCategoriesActions.removeCategory(category));
    else dispatch(selectedCategoriesActions.addCategory(category));
  };

  let content;

  if (isPending)
    content = <p className="loading-text">Loading categories...</p>;

  if (isError) content = <ErrorBlock error={error as HttpError} />;

  if (categories)
    content = (
      <ul className={classes["categories-list"]}>
        {categories.map((category: string) => (
          <li
            className={`${classes.category} ${
              selectedCategories.includes(category) ? classes.active : ""
            }`}
            key={category}
            onClick={() => toggleCategorySelection(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    );

  return (
    <header>
      <div className={classes.container}>
        {isDesktop ? (
          <>
            <h1>DummyShop</h1>
            <ul className={classes["pages-links-list"]}>
              {pagesList.map((page) => (
                <li key={page.id}>
                  <Link to={page.path}>{page.name.toUpperCase()}</Link>
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <h1>DummyShop</h1>
            <img
              src={
                theme === "dark" ? HamburgerMenuDarkImg : HamburgerMenuLightImg
              }
              className={classes["hamburger-menu"]}
              onClick={toggleSidebar}
            />
          </>
        )}
      </div>
      {location.pathname === "/cart" || (
        <div className={classes["categories-container"]}>{content}</div>
      )}
    </header>
  );
}
