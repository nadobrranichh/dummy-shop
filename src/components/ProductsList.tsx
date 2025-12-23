import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../http/http";
import classes from "./ProductsList.module.css";
import ErrorBlock from "./UI/ErrorBlock";
import ProductItem from "./ProductItem";

export default function ProductsList({ category }: { category?: string }) {
  const {
    data: products,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["products", category],
    queryFn: () => fetchProducts(category),
  });

  if (isError) return <ErrorBlock />;
  if (isPending)
    return (
      <p className="loading-text">
        Loading products{category && ` for ${category}`}...
      </p>
    );
  return (
    <ul className={classes["products-list"]}>
      {products.map((product) => (
        <ProductItem product={product} key={product.id} />
      ))}
    </ul>
  );
}
