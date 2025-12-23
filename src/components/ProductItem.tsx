import type { Product } from "../types/index.ts";
import classes from "./ProductItem.module.css";
import { priceFormatter } from "../utils/formatters.ts";

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

  return (
    <li {...props} className={classes["product-item"]}>
      <img src={product.image} />
      <div className={classes["w-100"]}>
        <p>{displayTitle}</p>
        <p className="price-text">{priceFormatter.format(product.price)}</p>
      </div>
    </li>
  );
}
