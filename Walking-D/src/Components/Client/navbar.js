import { Link } from "react-router-dom";
import { useContext} from "react";
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
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>Walking Dreamz</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/">Hy!! There Welcome to Our Site</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/welcome">Welcome</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
