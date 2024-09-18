import { Link } from "react-router-dom";

const NotFoundPage  = () => {
    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600">404</h1>
        <p className="text-2xl mt-4 text-gray-700">Oops! Page Not Found</p>
        <p className="text-gray-600 mt-2">The page you’re looking for doesn’t exist or has been moved.</p>

        <div className="mt-6">
          <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-600">
            Go to Home
          </Link>
          <Link to="/sign-in" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
    );
};

export default NotFoundPage ;