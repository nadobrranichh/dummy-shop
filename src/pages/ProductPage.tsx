import { useQuery } from "@tanstack/react-query";
import { Suspense, useEffect } from "react";
import { Await, useNavigate, useSearchParams } from "react-router-dom";
import { fetchProduct } from "../http/http";
import classes from "./ProductPage.module.css";
import ArrowLeftImg from "../assets/arrow-left-5-svgrepo-com.svg";
import RatingContainer from "../components/RatingContainer";
import { priceFormatter } from "../utils/formatters";

export default function ProductPage() {
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

  //come up with a better layout for when the id is not there maybe..?
  useEffect(() => {
    if (!id) navigate("../");
  }, []);

  useEffect(() => {
    console.log(product);
  }, [product]);
  return (
    <main>
      <div className={classes.navigation}>
        <img src={ArrowLeftImg} />
        <p className="text-regular color-light">Go back</p>
      </div>
      <Suspense>
        <Await resolve={product}>
          {(resolvedProduct) => (
            <div className={classes.container}>
              <img
                src={resolvedProduct?.image}
                className={classes["product-image"]}
              />
              <h2>{resolvedProduct?.title}</h2>
              <RatingContainer
                ratingObj={resolvedProduct?.rating || { rate: 0, count: 0 }}
              />
              <p className="price-text">
                {priceFormatter.format(resolvedProduct?.price || 0)}
              </p>
              <button className={classes["add-to-cart-btn"]}>
                Add to Cart
              </button>
              <h2>Description:</h2>
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
