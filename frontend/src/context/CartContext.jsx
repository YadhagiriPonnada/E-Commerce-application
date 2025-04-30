import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';

const mockProducts = [
  {
    id: 1,
    name: "Men's Slim Fit T-Shirt",
    price: 499.00,
    image_url: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820',
    category: 'Men',
    brand: 'Roadster'
  },
  {
    id: 2,
    name: "Women's Floral Dress",
    price: 1299.00,
    image_url: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223',
    category: 'Women',
    brand: 'Sassafras'
  },
  {
    id: 3,
    name: "Kids Cartoon T-Shirt",
    price: 399.00,
    image_url: 'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea',
    category: 'Kids',
    brand: 'H&M'
  },
  {
    id: 4,
    name: "Men's Formal Shirt",
    price: 899.00,
    image_url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10',
    category: 'Men',
    brand: 'Arrow'
  },
  {
    id: 5,
    name: "Women's Jeans",
    price: 1499.00,
    image_url: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c',
    category: 'Women',
    brand: 'Levis'
  },
  {
    id: 6,
    name: "Kids School Shoes",
    price: 799.00,
    image_url: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2',
    category: 'Kids',
    brand: 'Adidas'
  },
  {
    id: 7,
    name: "Men's Sneakers",
    price: 1999.00,
    image_url: 'https://images.unsplash.com/photo-1549298916-b21d5d6d6efa',
    category: 'Men',
    brand: 'Nike'
  },
  {
    id: 8,
    name: "Women's Handbag",
    price: 2499.00,
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
    category: 'Women',
    brand: 'Lavie'
  }
];

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      fetchCartItems();
    } else {
      
      setCartItems([]);
      localStorage.removeItem('cartItems');
    }
  }, [isAuthenticated, user]);

  const fetchCartItems = () => {
    try {
      setLoading(true);
      
     
      const savedCart = localStorage.getItem('cartItems');
      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);
        setCartItems(parsedCart);
      } else {
        setCartItems([]);
      }
      
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Failed to fetch cart items');
      setCartItems([]);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    try {
      setLoading(true);
      
      if (!isAuthenticated) {
        setError('Please login to add items to cart');
        setLoading(false);
        return { success: false, message: 'Please login to add items to cart' };
      }
      
      
      const product = mockProducts.find(p => p.id === parseInt(productId));
      
      if (!product) {
        setError('Product not found');
        setLoading(false);
        return { success: false, message: 'Product not found' };
      }
      
      
      const existingItemIndex = cartItems.findIndex(item => item.product_id === parseInt(productId));
      
      let updatedCart;
      
      if (existingItemIndex !== -1) {
        
        updatedCart = [...cartItems];
        updatedCart[existingItemIndex].quantity += quantity;
      } else {
        
        const newItem = {
          id: Date.now(),
          user_id: user.id,
          product_id: product.id,
          quantity: quantity,
          name: product.name,
          price: product.price,
          image_url: product.image_url,
          brand: product.brand,
          category: product.category
        };
        
        updatedCart = [...cartItems, newItem];
      }
      
      
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      const message = 'Failed to add item to cart';
      setError(message);
      
      return { success: false, message };
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      setLoading(true);
      
      if (!isAuthenticated) {
        setError('Please login to update cart');
        setLoading(false);
        return { success: false, message: 'Please login to update cart' };
      }
      
      const updatedCart = cartItems.map(item => {
        if (item.product_id === parseInt(productId)) {
          return { ...item, quantity };
        }
        return item;
      });
      
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      const message = 'Failed to update item quantity';
      setError(message);
      
      return { success: false, message };
    }
  };

  const removeFromCart = async (productId) => {
    try {
      setLoading(true);
      
      if (!isAuthenticated) {
        setError('Please login to remove items from cart');
        setLoading(false);
        return { success: false, message: 'Please login to remove items from cart' };
      }
     
      const updatedCart = cartItems.filter(item => item.product_id !== parseInt(productId));
      
      setCartItems(updatedCart);
      localStorage.setItem('cartItems', JSON.stringify(updatedCart));
      
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      const message = 'Failed to remove item from cart';
      setError(message);
      
      return { success: false, message };
    }
  };

  const clearCart = async () => {
    try {
      setLoading(true);
      
      if (!isAuthenticated) {
        setError('Please login to clear cart');
        setLoading(false);
        return { success: false, message: 'Please login to clear cart' };
      }
      
      setCartItems([]);
      localStorage.removeItem('cartItems');
      
      setLoading(false);
      return { success: true };
    } catch (error) {
      setLoading(false);
      const message = 'Failed to clear cart';
      setError(message);
      
      return { success: false, message };
    }
  };

  const cartTotal = cartItems.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);

  const value = {
    cartItems,
    cartCount: cartItems.length,
    cartTotal,
    loading,
    error,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    fetchCartItems
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}; 