import type { Product } from "../types";
import classes from "./CartItem.module.css";
import PlusIcon from "../assets/plus-large-svgrepo-com.svg";
import MinusIcon from "../assets/minus-svgrepo-com.svg";
import { useAppDispatch } from "../store/custom-hooks";
import { cartActions } from "../store/cart-slice";

const MAX_TITLE_LENGTH = 25;

export default function CartItem({
  item,
  ...props
}: {
  item: { quantity: number; product: Product };
}) {
  const dispatch = useAppDispatch();
  const displayTitle =
    item.product.title.length > MAX_TITLE_LENGTH
      ? item.product.title.slice(0, MAX_TITLE_LENGTH - 3).trim() + "..."
      : item.product.title;

  const increaseQuantity = function () {
    dispatch(cartActions.addToCart({ product: item.product }));
  };
  const decreaseQuantity = function () {
    dispatch(cartActions.removeFromCart({ id: item.product.id }));
  };

  return (
    <li {...props} className={classes["cart-item"]}>
      <img src={item.product.image} className={classes["item-image"]} />
      <div className={classes["item-info"]}>
        <p className={`text-regular color-light ${classes["self-start"]}`}>
          {displayTitle}
        </p>
        <p className={`text-small color-light `}>Quantity:</p>
        <div className={classes["quantity-container"]}>
          <img
            src={MinusIcon}
            className={classes["quantity-icon"]}
            onClick={decreaseQuantity}
          />
          <p className="text-regular color-light">{item.quantity}</p>
          <img
            src={PlusIcon}
            className={classes["quantity-icon"]}
            onClick={increaseQuantity}
          />
        </div>
      </div>
    </li>
  );
}
