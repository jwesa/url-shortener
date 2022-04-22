import { useState, useCallback, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/httpHook";
import Loader from "../components/Loader";
import LinkCard from "../components/LinkCard";

const DetailPage = () => {
    const { token } = useContext(AuthContext);
    const { request, loading } = useHttp();
    const [link, setLink] = useState(null);
    const linkId = useParams().id;

    const getLink = useCallback(async () => {
        try {
            const data = await request(`/api/link/${linkId}`, "GET", null, {
                Authorization: `Bearer ${token}`,
            });
			setLink(data);
        } catch (e) {}
    }, [token, linkId, request]);

    useEffect(() => {
        getLink();
    }, [getLink]);

    if (loading) {
        return <Loader />;
    }
    return <>{!loading && link && <LinkCard link={link} />}</>;
};

export default DetailPage;
