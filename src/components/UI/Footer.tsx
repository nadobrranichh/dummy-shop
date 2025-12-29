import { Link } from "react-router-dom";
import { pagesList } from "../../lists/pagesList";
import classes from "./Footer.module.css";
import { socialsList } from "../../lists/socialsList";

export default function Footer() {
  return (
    <footer>
      <div className={classes["footer-container"]}>
        <div>
          <p className="text-regular">Navigation: </p>
          <ul className={classes["footer-links-list"]}>
            {pagesList.map((item) => (
              <li key={item.id}>
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-regular text-end">My socials: </p>
          <ul className={classes["footer-links-list"]}>
            {socialsList.map((item) => (
              <li key={item.id} className="text-end">
                <Link target="_blank" to={item.url}>
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="text-center">Developed by Nazar Shchepaniak</p>
    </footer>
  );
}
