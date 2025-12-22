import { Suspense } from "react";
import { Await, useRouteLoaderData } from "react-router-dom";
import ErrorBlock from "./ErrorBlock";

export default function Header() {
  const { categories } = useRouteLoaderData("root");
  console.log(categories);
  return (
    <header>
      DummyShop
      <Suspense fallback={<p>Loading categories...</p>}>
        <Await resolve={categories} errorElement={<ErrorBlock />}>
          {(resolvedCategories) => (
            <ul>
              {resolvedCategories.map((category: string) => (
                <li key={category}>{category}</li>
              ))}
            </ul>
          )}
        </Await>
      </Suspense>
    </header>
  );
}
