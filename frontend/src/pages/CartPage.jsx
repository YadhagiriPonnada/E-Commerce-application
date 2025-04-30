import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CartPage = () => {
  const { cartItems, cartTotal, loading, error, updateQuantity, removeFromCart, fetchCartItems, clearCart } = useCart();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderProcessing, setOrderProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartItems();
    }
  }, [isAuthenticated, fetchCartItems]);

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;
    await updateQuantity(productId, quantity);
  };

  const handleRemoveItem = async (productId) => {
    await removeFromCart(productId);
  };

  const handleCheckout = async () => {
    // Display order success directly without navigating to checkout page
    setOrderProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate a random order ID
    const randomOrderId = 'ORD' + Math.floor(Math.random() * 10000000);
    setOrderId(randomOrderId);
    
    // Clear the cart
    await clearCart();
    
    // Show success message
    setOrderSuccess(true);
    setOrderProcessing(false);
  };

  const renderEmptyCart = () => (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
      <p className="text-gray-600 mb-8">Looks like you haven't added any products to your cart yet.</p>
      <Link
        to="/products"
        className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors inline-block"
      >
        Start Shopping
      </Link>
    </div>
  );

  const renderLoginPrompt = () => (
    <div className="text-center py-16">
      <h2 className="text-2xl font-bold mb-4">Please login to view your cart</h2>
      <p className="text-gray-600 mb-8">Login to view your cart and continue shopping.</p>
      <Link
        to="/login"
        className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors inline-block"
      >
        Login
      </Link>
    </div>
  );

  // Order Success Component
  const renderOrderSuccess = () => (
    <div className="container-custom py-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <div className="bg-green-100 text-green-800 rounded-full h-16 w-16 flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-green-700 mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-6">Thank you for your purchase.</p>
          
          <div className="bg-gray-100 p-4 rounded-lg mb-6">
            <p className="font-medium">Order ID: <span className="text-primary">{orderId}</span></p>
            <p className="text-sm text-gray-500">Please save this order ID for future reference</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="bg-primary text-white px-6 py-2 rounded-md hover:bg-opacity-90 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              to="/products"
              className="border border-primary text-primary px-6 py-2 rounded-md hover:bg-primary hover:text-white transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );

  // If order is successful, show success message
  if (orderSuccess) {
    return renderOrderSuccess();
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Bag</h1>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      ) : !isAuthenticated ? (
        renderLoginPrompt()
      ) : cartItems.length === 0 ? (
        renderEmptyCart()
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Cart Items ({cartItems.length})</h2>
                
                {cartItems.map((item) => (
                  <div key={item.product_id} className="flex flex-col sm:flex-row py-6 border-t">
                    {/* Product Image */}
                    <div className="sm:w-1/4 mb-4 sm:mb-0">
                      <Link to={`/product/${item.product_id}`} className="block hover:opacity-75 transition-opacity">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-40 object-cover rounded-md"
                        />
                      </Link>
                    </div>
                    
                    {/* Product Details */}
                    <div className="sm:w-3/4 sm:pl-6 flex flex-col">
                      <div className="flex justify-between mb-2">
                        <Link
                          to={`/product/${item.product_id}`}
                          className="text-lg font-medium hover:text-primary"
                        >
                          {item.name}
                        </Link>
                        <button
                          onClick={() => handleRemoveItem(item.product_id)}
                          className="text-gray-500 hover:text-red-500"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                      
                      <p className="text-gray-500 mb-2">{item.brand}</p>
                      <p className="text-gray-500 mb-4">Category: {item.category}</p>
                      
                      <div className="mt-auto flex flex-wrap justify-between items-center">
                        <div className="flex items-center mb-2 sm:mb-0">
                          <button
                            onClick={() => handleQuantityChange(item.product_id, item.quantity - 1)}
                            className="bg-gray-200 text-gray-700 h-8 w-8 rounded-l flex items-center justify-center hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="h-8 px-4 flex items-center justify-center border-t border-b border-gray-300">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.product_id, item.quantity + 1)}
                            className="bg-gray-200 text-gray-700 h-8 w-8 rounded-r flex items-center justify-center hover:bg-gray-300"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-gray-500">₹{item.price} x {item.quantity}</p>
                          <p className="text-xl font-bold">₹{(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">FREE</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tax (5%)</span>
                    <span className="font-medium">₹{(cartTotal * 0.05).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-lg font-bold">₹{(cartTotal + cartTotal * 0.05).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  disabled={orderProcessing}
                  className={`btn w-full py-3 rounded-full ${
                    orderProcessing ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-opacity-90'
                  } text-white`}
                >
                  {orderProcessing ? 'Processing...' : 'Proceed to Checkout'}
                </button>
                
                <div className="mt-4">
                  <Link
                    to="/products"
                    className="text-primary hover:underline inline-block text-center w-full"
                    onClick={() => {
                      // Any necessary cleanup or state reset
                      localStorage.removeItem('productFilters');
                    }}
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Promo Code (Optional) */}
            <div className="mt-6 bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-medium mb-3">Promo Code</h3>
                <div className="flex">
                  <input
                    type="text"
                    placeholder="Enter promo code"
                    className="input-field rounded-r-none"
                  />
                  <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage; 