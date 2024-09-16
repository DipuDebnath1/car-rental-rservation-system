import { Link } from "react-router-dom";

const ErrorPage = () => {
    return (
        <div>
            <p>
            sorry your route not found
            </p>
            <Link to={'/'}>Home</Link>
        </div>
    );
};

export default ErrorPage;