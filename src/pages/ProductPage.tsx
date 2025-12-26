import { useQuery } from "@tanstack/react-query";
import { Suspense, useEffect, useState } from "react";
import { Await, Link, useNavigate, useSearchParams } from "react-router-dom";
import { fetchProduct } from "../http/http";
import classes from "./ProductPage.module.css";
import ArrowLeftImg from "../assets/arrow-left-5-svgrepo-com.svg";
import RatingContainer from "../components/RatingContainer";
import { priceFormatter } from "../utils/formatters";
import { useAppDispatch, useAppSelector } from "../store/custom-hooks";
import { cartActions } from "../store/cart-slice";

const ADD_TO_CART_COOLDOWN_MS = 2000;

export default function ProductPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = Number.parseInt(searchParams.get("id") || "");

  const {
    data: product,
    //for later
    // isLoading,
    // isError,
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

  return (
    <main>
      <Link to="/" className="navigation">
        <img src={ArrowLeftImg} />
        <p className="text-regular color-light">Go back</p>
      </Link>
      <Suspense>
        <Await resolve={product}>
          {(resolvedProduct) => (
            <div className={classes.container}>
              <img
                src={resolvedProduct?.image}
                className={classes["product-image"]}
              />
              <h2 className="title">{resolvedProduct?.title}</h2>
              <RatingContainer
                ratingObj={resolvedProduct?.rating || { rate: 0, count: 0 }}
              />
              <p className="price-text">
                {priceFormatter.format(resolvedProduct?.price || 0)}
              </p>
              <button
                className={classes["add-to-cart-btn"]}
                onClick={handleAddToCart}
                disabled={coolDown}
              >
                {coolDown ? "Added!" : "Add to Cart"}
              </button>
              {itemQuantity > 0 && (
                <p className="text-small color-light self-center">
                  Quantity in cart: {itemQuantity}
                </p>
              )}
              <h2 className="title">Description:</h2>
              <p className="text-small color-light">
                {resolvedProduct?.description}
              </p>
            </div>
          )}
        </Await>
      </Suspense>
    </main>
  );
}
