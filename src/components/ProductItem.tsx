import type { Product } from "../types/index.ts";
import classes from "./ProductItem.module.css";
import { priceFormatter } from "../utils/formatters.ts";
import RatingContainer from "./RatingContainer.tsx";
import { Link } from "react-router-dom";

export default function ProductItem({
  product,
  ...props
}: {
  product: Product;
}) {
  return (
    <li {...props}>
      <Link to={`product?id=${product.id}`} className={classes["product-item"]}>
        <img className={classes["product-image"]} src={product.image} />
        <div className={classes["w-100"]}>
          <p>{product.title.trim()}</p>
          <p className="price-text">{priceFormatter.format(product.price)}</p>
        </div>
        <RatingContainer ratingObj={product.rating} />
      </Link>
    </li>
  );
}
