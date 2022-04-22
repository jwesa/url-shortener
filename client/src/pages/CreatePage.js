import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useHttp from "../hooks/httpHook";

const CreatePage = () => {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);
    const [link, setLink] = useState("");
    const { request } = useHttp();

    useEffect(() => {
        window.M.updateTextFields();
    }, []);

    const handlePress = async (e) => {
        if (e.key === "Enter") {
            try {
                const data = await request(
                    "/api/link/generate",
                    "POST",
                    {
                        from: link,
                    },
                    { Authorization: `Bearer ${auth.token}` }
				);
				navigate(`/detail/${data.link._id}`)
            } catch (e) {
                console.log(e);
            }
        }
    };

    const handleClick = async (e) => {
        try {
            const data = await request(
                "/api/link/generate",
                "POST",
                {
                    from: link,
                },
                { Authorization: `Bearer ${auth.token}` }
			);
			navigate(`/detail/${data.link._id}`);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <div className="container">
            <div className="col s8 offset-s3" style={{ paddingTop: "2rem" }}>
                <div className="input-field">
                    <input
                        placeholder="Your URL"
                        id="link"
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        onKeyDown={handlePress}
                    />
                    <label className="active" htmlFor="link" id="1">
                        Enter your link
                    </label>
                    <button
                        className="btn blue darken-4"
                        style={{ marginRight: "10px" }}
                        onClick={handleClick}
                    >
                        Shorten
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;
