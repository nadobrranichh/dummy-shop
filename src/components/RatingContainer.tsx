import StarImg from "../assets/star-svgrepo-com.svg";
import classes from "./RatingContainer.module.css";
import { ratingFormatter } from "../utils/formatters";

export default function RatingContainer({
  ratingObj,
}: {
  ratingObj: { rate: number; count: number };
}) {
  return (
    <div className={classes.container}>
      <img className={classes["star-img"]} src={StarImg} alt="star" />
      <p className={classes["rating-text"]}>
        {ratingFormatter.format(ratingObj.rate)}
      </p>
      <p className={classes["rating-text"]}>({ratingObj.count} reviews)</p>
    </div>
  );
}
