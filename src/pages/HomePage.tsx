import ProductsList from "../components/ProductsList";
import classes from "./HomePage.module.css";

export default function HomePage() {
  return (
    <main>
      <h1 className="title">Welcome!</h1>
      <p className={classes.paragraph}>For you</p>
      <ProductsList />
    </main>
  );
}
