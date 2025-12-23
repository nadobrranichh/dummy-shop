import type { Product } from "../types";
import classes from "./ProductItem.module.css";

const MAX_TITLE_LENGTH = 23;

export default function ProductItem({
  product,
  ...props
}: {
  product: Product;
}) {
  const displayTitle =
    product.title.length > MAX_TITLE_LENGTH
      ? product.title.slice(0, MAX_TITLE_LENGTH - 3).trim() + "..."
      : product.title;

  const priceFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <li {...props} className={classes["product-item"]}>
      <img src={product.image} />
      <div className={classes["w-100"]}>
        <p>{displayTitle}</p>
        <p className={classes["price-text"]}>
          {priceFormatter.format(product.price)}
        </p>
      </div>
    </li>
  );
}
