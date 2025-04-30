const Cart = require('../models/Cart');

exports.getCartItems = async (req, res) => {
  try {
    const userId = req.user.id;
    const cartItems = await Cart.getCartItems(userId);
    
    const total = cartItems.reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
    
    res.status(200).json({
      count: cartItems.length,
      total,
      items: cartItems
    });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;
    
    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }
    
    const cartItem = await Cart.addToCart(userId, productId, quantity || 1);
    
    res.status(201).json({
      message: 'Item added to cart',
      item: cartItem
    });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateQuantity = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    const { quantity } = req.body;
    
    if (!quantity || quantity < 1) {
      return res.status(400).json({ message: 'Quantity must be at least 1' });
    }
    
    const result = await Cart.updateQuantity(userId, productId, quantity);
    
    res.status(200).json({
      message: 'Quantity updated',
      item: result
    });
  } catch (error) {
    console.error('Update quantity error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    const userId = req.user.id;
    const productId = req.params.productId;
    
    await Cart.removeFromCart(userId, productId);
    
    res.status(200).json({
      message: 'Item removed from cart'
    });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.clearCart = async (req, res) => {
  try {
    const userId = req.user.id;
    
    await Cart.clearCart(userId);
    
    res.status(200).json({
      message: 'Cart cleared'
    });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ message: 'Server error' });
  }
}; 