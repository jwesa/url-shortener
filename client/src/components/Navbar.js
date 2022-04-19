import { useContext } from "react";
import { NavLink, useHistory } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const handleLogout = (event) => {
        event.preventDefault();
        auth.logout();
        history.push("/");
    };

    return (
        <nav>
            <div class="nav-wrapper blue darken-1" style={{padding: "0 2rem"}}>
                <span class="brand-logo">
                    URL shortener
                </span>
                <ul id="nav-mobile" class="right hide-on-med-and-down">
                    <li>
                        <NavLink to="/create">Create</NavLink>
                    </li>
                    <li>
                        <NavLink to="/links">Links</NavLink>
                    </li>
                    <li>
                        <a href="/" onClick={handleLogout}>
                            Log out
                        </a>
                    </li>
                </ul>
            </div>
        </nav>
    );
};

export default Navbar;
