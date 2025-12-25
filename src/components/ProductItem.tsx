import type { Product } from "../types/index.ts";
import classes from "./ProductItem.module.css";
import { priceFormatter } from "../utils/formatters.ts";
import RatingContainer from "./RatingContainer.tsx";
import { Link } from "react-router-dom";

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
    <li {...props}>
      <Link to={`product?id=${product.id}`} className={classes["product-item"]}>
        <img className={classes["product-image"]} src={product.image} />
        <div className={classes["w-100"]}>
          <p>{displayTitle}</p>
          <p className="price-text">{priceFormatter.format(product.price)}</p>
        </div>
        <RatingContainer ratingObj={product.rating} />
      </Link>
    </li>
  );
}
