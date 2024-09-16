import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface ApiErrorPageProps {
  errorMessage?: string;
}

const ApiErrorPage = ({ errorMessage = 'Something went wrong. Please try again later.' }: ApiErrorPageProps) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API error or use the actual error passed from the backend
    setError(errorMessage);
  }, [errorMessage]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-500">Error</h1>
        <p className="text-lg mt-4 text-gray-700">
          {error || 'An error occurred while processing your request.'}
        </p>

        <div className="mt-6">
          <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4 hover:bg-blue-600">
            Go to Home
          </Link>
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ApiErrorPage;
