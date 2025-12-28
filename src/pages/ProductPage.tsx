import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { fetchProduct } from "../http/http";
import classes from "./ProductPage.module.css";
import RatingContainer from "../components/RatingContainer";
import { priceFormatter } from "../utils/formatters";
import { useAppDispatch, useAppSelector } from "../store/custom-hooks";
import { cartActions } from "../store/cart-slice";
import ArrowLeftLightImg from "../assets/arrow-left-light.svg";
import ArrowLeftDarkImg from "../assets/arrow-left-dark.svg";
import ErrorBlock from "../components/UI/ErrorBlock";
import type { HttpError } from "../types/http";

const ADD_TO_CART_COOLDOWN_MS = 2000;

export default function ProductPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const theme = useAppSelector((state) => state.ui.theme);
  const id = Number.parseInt(searchParams.get("id") || "");

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: () => fetchProduct(id!),
    enabled: Boolean(id),
  });

  //to display the item's quntity in the cart:
  const cart = useAppSelector((state) => state.cart);
  const itemQuantity =
    cart.find((item) => item.product.id === id)?.quantity || 0;

  // to be able to add the item multiple times to the cart
  // with a cooldown
  const [coolDown, setCoolDown] = useState<boolean>(false);
  const handleAddToCart = function () {
    setCoolDown(true);
    dispatch(cartActions.addToCart({ product }));
    setTimeout(() => setCoolDown(false), ADD_TO_CART_COOLDOWN_MS);
  };

  //come up with a better layout for when the id is not there maybe..?
  useEffect(() => {
    if (!id) navigate("../");
  }, []);

  let content;

  if (isLoading)
    content = (
      <p className={`loading-text ${classes.centered}`}>
        Loading the product...
      </p>
    );

  if (isError) content = <ErrorBlock error={error as HttpError} />;

  if (product)
    content = (
      <div className={classes.container}>
        <img src={product.image} className={classes["product-image"]} />
        <h2 className="title">{product.title}</h2>
        <RatingContainer ratingObj={product.rating || { rate: 0, count: 0 }} />
        <p className="price-text">
          {priceFormatter.format(product.price || 0)}
        </p>
        <button
          className={classes["add-to-cart-btn"]}
          onClick={handleAddToCart}
          disabled={coolDown}
        >
          {coolDown ? "Added!" : "Add to Cart"}
        </button>
        {itemQuantity > 0 && (
          <p className="text-small self-center">
            Quantity in cart: {itemQuantity}
          </p>
        )}
        <h2 className="title">Description:</h2>
        <p className="text-small">{product.description}</p>
      </div>
    );

  return (
    <main>
      <Link to="/" className="navigation">
        <img src={theme === "light" ? ArrowLeftDarkImg : ArrowLeftLightImg} />
        <p className="text-regular">Go back</p>
      </Link>
      {content}
    </main>
  );
}
