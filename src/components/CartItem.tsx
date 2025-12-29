import type { Product } from "../types";
import classes from "./CartItem.module.css";
import { useAppDispatch, useAppSelector } from "../store/custom-hooks";
import { cartActions } from "../store/cart-slice";
import PlusLightIcon from "../assets/plus-light.svg";
import PlusDarkIcon from "../assets/plus-dark.svg";
import MinusLightIcon from "../assets/minus-light.svg";
import MinusDarkIcon from "../assets/minus-dark.svg";

export default function CartItem({
  item,
  ...props
}: {
  item: { quantity: number; product: Product };
}) {
  const dispatch = useAppDispatch();

  const theme = useAppSelector((state) => state.ui.theme);

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
        <p className="text-regular">{item.product.title.trim()}</p>
        <p className={`text-small text-center ${classes.mt}`}>Quantity:</p>
        <div className={classes["quantity-container"]}>
          <img
            src={theme === "light" ? MinusDarkIcon : MinusLightIcon}
            className={classes["quantity-icon"]}
            onClick={decreaseQuantity}
          />
          <p className="text-regular">{item.quantity}</p>
          <img
            src={theme === "light" ? PlusDarkIcon : PlusLightIcon}
            className={classes["quantity-icon"]}
            onClick={increaseQuantity}
          />
        </div>
      </div>
    </li>
  );
}
