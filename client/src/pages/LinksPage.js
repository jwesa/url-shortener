import { useState, useContext, useCallback, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/httpHook";
import Loader from "../components/Loader";
import LinksList from "../components/LinksList";

const LinksPage = () => {
    const { token } = useContext(AuthContext);
    const [links, setLinks] = useState([]);
    const { request, loading } = useHttp();

    const fetchLinks = useCallback(async () => {
        try {
            const fetched = await request("/api/link", "GET", null, {
                Authorization: `Bearer ${token}`,
            });
            setLinks(fetched);
        } catch (e) {
            console.log(e);
        }
    }, [token, request]);

    useEffect(() => {
        fetchLinks();
    }, [fetchLinks]);

    if (loading) {
        return <Loader />;
    }

    return (
		<>{!loading && <LinksList links={links}/> }</>
    );
};

export default LinksPage;
