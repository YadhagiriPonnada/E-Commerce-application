import { createContext, useState, useEffect, useContext } from 'react';


const mockUsers = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123'
  }
];

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    const token = localStorage.getItem('token');
    const savedUser = localStorage.getItem('user');
    
    if (token && savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        // Invalid user data
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    }
    
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      
      const foundUser = mockUsers.find(u => u.email === email);
      
      
      if (foundUser && foundUser.password === password) {
        
        const userWithoutPassword = {
          id: foundUser.id,
          name: foundUser.name,
          email: foundUser.email
        };
        
        
        const token = `mock-jwt-token-${Date.now()}`;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        
       
        setUser(userWithoutPassword);
        setLoading(false);
        
        return { success: true };
      } else {
        setLoading(false);
        setError('Invalid email or password');
        return { success: false, message: 'Invalid email or password' };
      }
    } catch (error) {
      setLoading(false);
      setError('Login failed. Please try again.');
      return { success: false, message: 'Login failed. Please try again.' };
    }
  };

  const signup = async (name, email, password) => {
    try {
      setLoading(true);
      setError(null);
      
      
      if (mockUsers.some(u => u.email === email)) {
        setLoading(false);
        setError('User already exists with this email');
        return { success: false, message: 'User already exists with this email' };
      }
      
      
      const newUser = {
        id: mockUsers.length + 1,
        name,
        email,
        password
      };
      
      
      mockUsers.push(newUser);
      
      const userWithoutPassword = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      };
      
      const token = `mock-jwt-token-${Date.now()}`;
      
      
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      setUser(userWithoutPassword);
      setLoading(false);
      
      return { success: true };
    } catch (error) {
      setLoading(false);
      setError('Registration failed. Please try again.');
      return { success: false, message: 'Registration failed. Please try again.' };
    }
  };

  const logout = () => {
    
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('cartItems');
    
    
    setUser(null);
  };

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 