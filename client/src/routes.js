import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import CreatePage from "./pages/CreatePage";
import DetailPage from "./pages/DetailPage";
import LinksPage from "./pages/LinksPage";

const useRoutes = (isAuthenticated) => {
    if (isAuthenticated) {
        return (
            <Routes>
                <Route exact path="/create" element={<CreatePage />} />
                <Route exact path="/links" element={<LinksPage />} />
                <Route path="/detail/:id" element={<DetailPage />} />
                <Route path="*" element={<Navigate to="/create" replace />} />
            </Routes>
        );
    }

    return (
        <Routes>
            <Route exact path="/" element={<AuthPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default useRoutes;
