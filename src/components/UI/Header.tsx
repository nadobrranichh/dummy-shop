import { Suspense } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";
import ErrorBlock from "./ErrorBlock";
import classes from "./Header.module.css";
import HamburgerMenuImg from "../../assets/hamburger-svgrepo-com.svg";
import { useAppSelector, useAppDispatch } from "../../store/custom-hooks";
import { selectedCategoriesActions } from "../../store/selected-categories-slice";

export default function Header() {
  const dispatch = useAppDispatch();
  const { categories } = useRouteLoaderData("root");
  const selectedCategories = useAppSelector(
    (state) => state.selectedCategories
  );

  const toggleCategorySelection = function (category: string) {
    if (selectedCategories.includes(category))
      dispatch(selectedCategoriesActions.removeCategory(category));
    else dispatch(selectedCategoriesActions.addCategory(category));
  };

  return (
    <header>
      <div className={classes.container}>
        <h1>DummyShop</h1>
        <img src={HamburgerMenuImg} className={classes["hamburger-menu"]} />
      </div>
      <div className={classes["categories-container"]}>
        <Suspense
          fallback={<p className="loading-text">Loading categories...</p>}
        >
          <Await resolve={categories} errorElement={<ErrorBlock />}>
            {(resolvedCategories) => (
              <ul>
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
    </header>
  );
}
