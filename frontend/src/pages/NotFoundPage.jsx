import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="container-custom py-20 text-center">
      <h1 className="text-6xl font-bold text-primary mb-6">404</h1>
      <h2 className="text-3xl font-semibold mb-4">Page Not Found</h2>
      <p className="text-gray-600 max-w-lg mx-auto mb-8">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <div className="flex justify-center gap-4">
        <Link
          to="/"
          className="bg-primary text-white px-6 py-3 rounded-md hover:bg-opacity-90 transition-colors"
        >
          Back to Home
        </Link>
        <Link
          to="/products"
          className="border border-primary text-primary px-6 py-3 rounded-md hover:bg-primary hover:text-white transition-colors"
        >
          Browse Products
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage; 