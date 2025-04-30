import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Mock products data
const mockProducts = [
  {
    id: 1,
    name: "Men's Slim Fit T-Shirt",
    price: 499.00,
    image_url: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820',
    category: 'Men',
    brand: 'Roadster',
    description: 'A comfortable slim-fit t-shirt made with high-quality cotton. Perfect for casual wear.'
  },
  {
    id: 2,
    name: "Women's Floral Dress",
    price: 1299.00,
    image_url: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223',
    category: 'Women',
    brand: 'Sassafras',
    description: 'A beautiful floral dress with a flattering silhouette. Ideal for summer outings and casual events.'
  },
  {
    id: 3,
    name: "Kids Cartoon T-Shirt",
    price: 399.00,
    image_url: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea',
    category: 'Kids',
    brand: 'H&M',
    description: 'A fun cartoon-themed t-shirt for children. Made with soft, breathable fabric for all-day comfort.'
  },
  {
    id: 4,
    name: "Men's Formal Shirt",
    price: 899.00,
    image_url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10',
    category: 'Men',
    brand: 'Arrow',
    description: 'A premium formal shirt with a modern fit. Perfect for office wear and formal occasions.'
  },
  {
    id: 5,
    name: "Women's Jeans",
    price: 1499.00,
    image_url: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c',
    category: 'Women',
    brand: 'Levis',
    description: 'Classic denim jeans with a comfortable stretch fit. Versatile and durable for everyday wear.'
  },
  {
    id: 6,
    name: "Kids School Shoes",
    price: 799.00,
    image_url: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2',
    category: 'Kids',
    brand: 'Adidas',
    description: 'Durable and comfortable school shoes designed for active children. Features enhanced grip and support.'
  },
  {
    id: 7,
    name: "Men's Sneakers",
    price: 1999.00,
    image_url: 'https://images.unsplash.com/photo-1549298916-b21d5d6d6efa',
    category: 'Men',
    brand: 'Nike',
    description: 'Stylish and comfortable sneakers with advanced cushioning technology. Perfect for sports and casual wear.'
  },
  {
    id: 8,
    name: "Women's Handbag",
    price: 2499.00,
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
    category: 'Women',
    brand: 'Lavie',
    description: 'A spacious and elegant handbag with multiple compartments. Made with premium materials for lasting durability.'
  }
];

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProduct = () => {
      try {
        setLoading(true);
        
        // Simulate API call with delay
        setTimeout(() => {
          const foundProduct = mockProducts.find(p => p.id === parseInt(id));
          
          if (foundProduct) {
            setProduct(foundProduct);
          } else {
            setError('Product not found');
          }
          
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError('Failed to load product details. Please try again.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = async () => {
    try {
      setAddingToCart(true);
      const result = await addToCart(product.id, quantity);
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => setSuccess(false), 3000);
      } else {
        setError(result.message);
        setTimeout(() => setError(null), 3000);
      }
      
      setAddingToCart(false);
    } catch (err) {
      setError('Failed to add product to cart');
      setAddingToCart(false);
      setTimeout(() => setError(null), 3000);
    }
  };

  const goToCart = () => {
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="container-custom py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error && !product) {
    return (
      <div className="container-custom py-12">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
        <div className="text-center">
          <Link
            to="/products"
            className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
            onClick={() => {
              // Clear any stored filters
              localStorage.removeItem('productFilters');
            }}
          >
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you are looking for does not exist or has been removed.</p>
        <Link
          to="/products"
          className="bg-primary text-white px-6 py-2 rounded hover:bg-opacity-90 transition-colors"
          onClick={() => {
            // Clear any stored filters
            localStorage.removeItem('productFilters');
          }}
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-primary" onClick={() => localStorage.removeItem('productFilters')}>Products</Link>
        <span className="mx-2">/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-primary">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700">{product.name}</span>
      </div>

      <div className="flex flex-col md:flex-row -mx-4">
        {/* Product Image */}
        <div className="md:w-1/2 px-4 mb-6 md:mb-0">
          <div className="bg-white rounded-lg overflow-hidden shadow-md">
            <img
              src={product.image_url}
              alt={product.name}
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-xl text-gray-500 mb-4">{product.brand}</p>
          <div className="border-t border-b py-4 mb-6">
            <div className="flex items-baseline">
              <span className="text-2xl font-bold text-gray-900 mr-2">₹{product.price}</span>
              <span className="text-sm text-gray-500">Inclusive of all taxes</span>
            </div>
          </div>

          {/* Select Size (Mock) */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">SELECT SIZE</h3>
            <div className="flex space-x-2">
              {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                <button
                  key={size}
                  className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center hover:border-primary"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium mb-2">QUANTITY</h3>
            <div className="flex items-center">
              <button
                onClick={decrementQuantity}
                className="bg-gray-200 text-gray-700 h-10 w-10 rounded-l flex items-center justify-center hover:bg-gray-300"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="h-10 w-16 text-center border-t border-b border-gray-300"
              />
              <button
                onClick={incrementQuantity}
                className="bg-gray-200 text-gray-700 h-10 w-10 rounded-r flex items-center justify-center hover:bg-gray-300"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleAddToCart}
              disabled={addingToCart}
              className={`btn flex-1 py-3 ${
                addingToCart ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-opacity-90'
              } text-white rounded-md font-medium`}
            >
              {addingToCart ? 'Adding...' : 'ADD TO BAG'}
            </button>
            <button
              onClick={goToCart}
              className="btn flex-1 py-3 border border-gray-300 text-gray-700 rounded-md font-medium hover:border-primary hover:text-primary"
            >
              GO TO BAG
            </button>
          </div>

          {/* Success/Error Messages */}
          {success && (
            <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
              Product added to cart successfully!
            </div>
          )}
          {error && (
            <div className="mt-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Product Description */}
          <div className="mt-8">
            <h3 className="text-lg font-medium mb-2">Product Details</h3>
            <p className="text-gray-600">
              {product.description || 'A premium quality product with excellent craftsmanship and attention to detail. Made with high-quality materials for comfort and durability.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 