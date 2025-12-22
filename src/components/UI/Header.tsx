import { Suspense } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";
import ErrorBlock from "./ErrorBlock";
import classes from "./Header.module.css";
import HamburgerMenuImg from "../../assets/hamburger-svgrepo-com.svg";
export default function Header() {
  const { categories } = useRouteLoaderData("root");
  console.log(categories);
  return (
    <header>
      <div className={classes.container}>
        <h1>DummyShop</h1>
        <img src={HamburgerMenuImg} className={classes["hamburger-menu"]} />
      </div>
      <div className={classes["categories-container"]}>
        <Suspense
          fallback={
            <p className={classes["loading-text"]}>Loading categories...</p>
          }
        >
          <Await resolve={categories} errorElement={<ErrorBlock />}>
            {(resolvedCategories) => (
              <ul>
                {resolvedCategories.map((category: string) => (
                  <li className={classes.category} key={category}>
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
