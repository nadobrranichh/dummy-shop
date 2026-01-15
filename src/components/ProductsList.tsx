import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../http/http";
import classes from "./ProductsList.module.css";
import ErrorBlock from "./UI/ErrorBlock";
import ProductItem from "./ProductItem";
import { useAppSelector } from "../store/custom-hooks";
import type { HttpError } from "../types/http";

export default function ProductsList() {
  const {
    data: products,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const selectedCategories = useAppSelector(
    (state) => state.selectedCategories
  );

  // the api doesnt return a lot of products so filtering
  // all of them on every render is fine imo
  const displayedProducts =
    products && selectedCategories.length > 0
      ? products.filter((product) =>
          selectedCategories.includes(product.category)
        )
      : products
      ? products
      : [];

  if (isError) {
    return <ErrorBlock error={error as HttpError} />;
  }
  if (isPending)
    return (
      <p className={`${classes.centered} loading-text`}>Loading products...</p>
    );
  return (
    <div className={classes.center}>
      <p className={classes.paragraph}>For you</p>
      <ul className={classes["products-list"]}>
        {displayedProducts.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </ul>
    </div>
  );
}
