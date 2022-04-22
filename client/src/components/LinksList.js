import { Link } from "react-router-dom";

const LinksList = ({ links }) => {
    if (!links.length) {
        return <p className="" style={{paddingTop: "2rem" ,fontSize: "3rem"}}>No links yet</p>;
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Origin</th>
                    <th>Shortened</th>
                    <th>Open</th>
                </tr>
            </thead>

            <tbody>
                {links.map((link, index) => {
                    return (
                        <tr key={link._id}>
                            <td>{index + 1}</td>
                            <td>{link.from}</td>
                            <td>{link.to}</td>
                            <td>
                                <Link to={`/detail/${link._id}`}>Open</Link>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

export default LinksList;
