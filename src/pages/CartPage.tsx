import { useNavigate, Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useAppSelector } from "../store/custom-hooks";
import classes from "./CartPage.module.css";
import ArrowLeftLightImg from "../assets/arrow-left-light.svg";
import ArrowLeftDarkImg from "../assets/arrow-left-dark.svg";

export default function CartPage() {
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cart);
  const theme = useAppSelector((state) => state.ui.theme);
  const total = cart
    .reduce((total, item) => (total += item.product.price * item.quantity), 0)
    .toFixed(2);
  return (
    <main>
      <Link to="/" className="navigation">
        <img src={theme === "light" ? ArrowLeftDarkImg : ArrowLeftLightImg} />
        <p className="text-regular">Go back</p>
      </Link>
      <h2 className="title">Cart</h2>
      {cart.length === 0 ? (
        <div className={classes.center}>
          <p className="text-small">
            Looks like you don't have anything in your cart yet!
          </p>
          <button className={classes.btn} onClick={() => navigate("/")}>
            Continue shopping
          </button>
        </div>
      ) : (
        <>
          <ul className={classes["cart-list"]}>
            {cart.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </ul>
          <div className={classes.center}>
            <p className="text-regular text-center">Your total is: {total}</p>
            <button className={classes.btn}>Proceed to checkout</button>
          </div>
        </>
      )}
    </main>
  );
}
