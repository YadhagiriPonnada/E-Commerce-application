import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const CheckoutPage = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    paymentMethod: 'cod'
  });
  
  const [loading, setLoading] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // In a real app, you would send the order to your backend
    try {
      setLoading(true);
      
      // Mock API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Generate random order ID
      const randomOrderId = 'ORD' + Math.floor(Math.random() * 10000000);
      setOrderId(randomOrderId);
      
      // Clear cart
      await clearCart();
      
      setOrderPlaced(true);
      setLoading(false);
    } catch (error) {
      console.error('Error placing order:', error);
      setLoading(false);
    }
  };
  
  const taxAmount = cartTotal * 0.05;
  const totalAmount = cartTotal + taxAmount;
  
  if (orderPlaced) {
    return (
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
            
            <p className="mb-6">We have sent a confirmation email to <span className="font-medium">{formData.email}</span> with all the order details.</p>
            
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
  }
  
  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">Add some products to your cart before checkout.</p>
          <Link
            to="/products"
            className="bg-primary text-white px-6 py-3 rounded-md font-medium hover:bg-opacity-90 transition-colors inline-block"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Checkout Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-6">Shipping Details</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="name" className="block text-gray-700 mb-2">Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-gray-700 mb-2">City</label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="state" className="block text-gray-700 mb-2">State</label>
                      <input
                        type="text"
                        id="state"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="pincode" className="block text-gray-700 mb-2">PIN Code</label>
                      <input
                        type="text"
                        id="pincode"
                        name="pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                    <div className="space-y-3">
                      <label className="flex items-center p-3 border rounded cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === 'cod'}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        <span>Cash on Delivery (COD)</span>
                      </label>
                      <label className="flex items-center p-3 border rounded cursor-pointer opacity-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          disabled
                          className="mr-2"
                        />
                        <span>Credit/Debit Card (Coming Soon)</span>
                      </label>
                      <label className="flex items-center p-3 border rounded cursor-pointer opacity-50">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          disabled
                          className="mr-2"
                        />
                        <span>UPI (Coming Soon)</span>
                      </label>
                    </div>
                  </div>
                  
                  <div className="mt-8">
                    <button
                      type="submit"
                      disabled={loading}
                      className={`btn w-full py-3 ${
                        loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-opacity-90'
                      } text-white rounded-md font-medium`}
                    >
                      {loading ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6">
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                
                <div className="max-h-80 overflow-y-auto mb-6 pr-2">
                  {cartItems.map((item) => (
                    <div key={item.product_id} className="flex py-4 border-b">
                      <div className="w-20 h-20 flex-shrink-0">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        <p className="text-sm font-bold mt-1">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
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
                    <span className="font-medium">₹{taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3 mt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-bold">Total</span>
                      <span className="text-lg font-bold">₹{totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <Link
                  to="/cart"
                  className="text-primary hover:underline inline-block text-center w-full"
                >
                  Back to Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage; 