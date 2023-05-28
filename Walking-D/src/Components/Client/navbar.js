import { Link } from "react-router-dom";
import { useContext } from "react";
import classes from "./MainNavigation.module.css";
import AuthContext from "../Server/auth-context";

const MainNavigation = () => {
  const authContexts = useContext(AuthContext);
  const isLoggedIn = authContexts.isLoggedIn;
  const logoutHandler = () => {
    authContexts.logout();
    //also can redirect from here
  };
  return (
    <header className={classes.navbar}>
      <div className={classes["navbar-brand"]}>Walking Dreamz Task</div>
      <nav>
        <ul className={classes["navbar-menu"]}>
          {isLoggedIn && (
            <li className={classes["navbar-item"]}>
              <Link to="/welcome">Welcome</Link>
            </li>
          )}
          {isLoggedIn && (
            <li className={classes["navbar-item"]}>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
