import "materialize-css";
import { BrowserRouter as Router } from "react-router-dom";
import useRoutes from "./routes";
import useAuth from "./hooks/authHook";
import AuthContext from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";

function App() {
    const { login, logout, token, ready, userId } = useAuth();
    const isAuthenticated = Boolean(token);
    const routes = useRoutes(isAuthenticated);

    if (!ready) {
        return <Loader />;
    }

    return (
        <AuthContext.Provider
            value={{ token, userId, login, logout, isAuthenticated }}
        >
            <Router>
                {isAuthenticated && <Navbar />}
                <div className="container">{routes}</div>
            </Router>
        </AuthContext.Provider>
    );
}

export default App;
