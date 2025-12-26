import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../http/http";
import classes from "./ProductsList.module.css";
import ErrorBlock from "./UI/ErrorBlock";
import ProductItem from "./ProductItem";
import { useAppSelector } from "../store/custom-hooks";

export default function ProductsList() {
  const {
    data: products,
    isPending,
    isError,
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

  if (isError) return <ErrorBlock />;
  if (isPending) return <p className="loading-text">Loading products...</p>;
  return (
    <ul className={classes["products-list"]}>
      {displayedProducts.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </ul>
  );
}
