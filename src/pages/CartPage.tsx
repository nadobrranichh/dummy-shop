import { useNavigate, Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import { useAppSelector } from "../store/custom-hooks";
import classes from "./CartPage.module.css";
import ArrowLeftImg from "../assets/arrow-left-5-svgrepo-com.svg";

export default function CartPage() {
  const navigate = useNavigate();
  const cart = useAppSelector((state) => state.cart);
  const total = cart
    .reduce((total, item) => (total += item.product.price * item.quantity), 0)
    .toFixed(2);
  return (
    <main>
      <Link to="/" className="navigation">
        <img src={ArrowLeftImg} />
        <p className="text-regular color-light">Go back</p>
      </Link>
      <h2 className="title">Cart</h2>
      {cart.length === 0 ? (
        <div className={classes.center}>
          <p className="text-small color-light">
            Looks like you don't have anything in your cart yet!
          </p>
          <button
            className={`${classes.btn} color-light`}
            onClick={() => navigate("/")}
          >
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
            <p className="text-regular color-light text-center">
              Your total is: {total}
            </p>
            <button className={`${classes.btn} color-light`}>
              Proceed to checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}
