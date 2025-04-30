import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

// Mock products data
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
  },
  {
    id: 9,
    name: "Kids Winter Jacket",
    price: 1299.00,
    image_url: 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2',
    category: 'Kids',
    brand: 'GAP'
  },
  {
    id: 10,
    name: "Men's Watch",
    price: 3499.00,
    image_url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d',
    category: 'Men',
    brand: 'Fossil'
  },
  {
    id: 11,
    name: "Women's Sunglasses",
    price: 899.00,
    image_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
    category: 'Women',
    brand: 'RayBan'
  },
  {
    id: 12,
    name: "Kids Backpack",
    price: 699.00,
    image_url: 'https://images.unsplash.com/photo-1588072432836-e10032774350',
    category: 'Kids',
    brand: 'Skybags'
  }
];

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get filters from URL
  const category = searchParams.get('category') || '';
  const brand = searchParams.get('brand') || '';
  const search = searchParams.get('search') || '';
  const sort = searchParams.get('sort') || '';
  const [priceRange, setPriceRange] = useState('');

  // Brands list for filter
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, [category, brand, sort, search]);

  const fetchProducts = () => {
    try {
      setLoading(true);
      
      // Simulate API call delay
      setTimeout(() => {
        // Filter products based on criteria
        let filteredProducts = [...mockProducts];
        
        // Apply category filter
        if (category) {
          filteredProducts = filteredProducts.filter(p => p.category === category);
        }
        
        // Apply brand filter
        if (brand) {
          filteredProducts = filteredProducts.filter(p => p.brand === brand);
        }
        
        // Apply search filter
        if (search) {
          const searchLower = search.toLowerCase();
          filteredProducts = filteredProducts.filter(p => 
            p.name.toLowerCase().includes(searchLower) || 
            p.brand.toLowerCase().includes(searchLower) || 
            p.category.toLowerCase().includes(searchLower)
          );
        }
        
        // Apply price range filter
        if (priceRange) {
          const [min, max] = priceRange.split('-').map(Number);
          filteredProducts = filteredProducts.filter(p => p.price >= min && p.price <= max);
        }
        
        // Apply sorting
        if (sort === 'price_asc') {
          filteredProducts.sort((a, b) => a.price - b.price);
        } else if (sort === 'price_desc') {
          filteredProducts.sort((a, b) => b.price - a.price);
        }
        
        setProducts(filteredProducts);
        
        // Extract unique brands for filter
        const uniqueBrands = [...new Set(mockProducts.map(p => p.brand))];
        setBrands(uniqueBrands);
        
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Error filtering products:', error);
      setError('Failed to load products. Please try again.');
      setLoading(false);
    }
  };

  const handleSort = (e) => {
    const value = e.target.value;
    setSearchParams(params => {
      if (value) {
        params.set('sort', value);
      } else {
        params.delete('sort');
      }
      return params;
    });
  };

  const handleCategoryChange = (value) => {
    setSearchParams(params => {
      if (value) {
        params.set('category', value);
      } else {
        params.delete('category');
      }
      return params;
    });
  };

  const handleBrandChange = (value) => {
    setSearchParams(params => {
      if (value) {
        params.set('brand', value);
      } else {
        params.delete('brand');
      }
      return params;
    });
  };

  const handlePriceRangeChange = (e) => {
    const value = e.target.value;
    setPriceRange(value);
  };

  const applyPriceFilter = () => {
    fetchProducts();
  };

  const clearFilters = () => {
    setSearchParams({});
    setPriceRange('');
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-6">
        {category ? `${category}'s Collection` : 'All Products'}
        {search && ` - Search Results for "${search}"`}
      </h1>

      <div className="flex flex-col md:flex-row">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4 mb-6 md:mb-0 md:pr-6">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Filters</h2>
            
            <div className="mb-4">
              <h3 className="font-medium mb-2">Categories</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={!category}
                    onChange={() => handleCategoryChange('')}
                    className="mr-2"
                  />
                  <span>All</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={category === 'Men'}
                    onChange={() => handleCategoryChange('Men')}
                    className="mr-2"
                  />
                  <span>Men</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={category === 'Women'}
                    onChange={() => handleCategoryChange('Women')}
                    className="mr-2"
                  />
                  <span>Women</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    checked={category === 'Kids'}
                    onChange={() => handleCategoryChange('Kids')}
                    className="mr-2"
                  />
                  <span>Kids</span>
                </label>
              </div>
            </div>

            {brands.length > 0 && (
              <div className="mb-4">
                <h3 className="font-medium mb-2">Brands</h3>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="brand"
                      checked={!brand}
                      onChange={() => handleBrandChange('')}
                      className="mr-2"
                    />
                    <span>All</span>
                  </label>
                  {brands.map((b) => (
                    <label key={b} className="flex items-center">
                      <input
                        type="radio"
                        name="brand"
                        checked={brand === b}
                        onChange={() => handleBrandChange(b)}
                        className="mr-2"
                      />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-4">
              <h3 className="font-medium mb-2">Price Range</h3>
              <select
                value={priceRange}
                onChange={handlePriceRangeChange}
                className="input-field mb-2"
              >
                <option value="">All Prices</option>
                <option value="0-500">Under ₹500</option>
                <option value="500-1000">₹500 - ₹1000</option>
                <option value="1000-2000">₹1000 - ₹2000</option>
                <option value="2000-5000">₹2000 - ₹5000</option>
                <option value="5000-100000">Above ₹5000</option>
              </select>
              <button
                onClick={applyPriceFilter}
                className="btn btn-primary w-full text-sm"
              >
                Apply Price Filter
              </button>
            </div>

            <button
              onClick={clearFilters}
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded w-full hover:bg-gray-300 transition-colors"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="w-full md:w-3/4">
          {/* Sort Options */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              Showing {products.length} {products.length === 1 ? 'product' : 'products'}
            </p>
            <div className="flex items-center">
              <span className="mr-2">Sort by:</span>
              <select
                value={sort}
                onChange={handleSort}
                className="border rounded p-2"
              >
                <option value="">Featured</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
                <option value="newest">Newest Arrivals</option>
              </select>
            </div>
          </div>

          {/* Products */}
          {loading ? (
            <div className="flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600">No products found matching your criteria.</p>
              <button
                onClick={clearFilters}
                className="mt-4 bg-primary text-white px-4 py-2 rounded hover:bg-opacity-90 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage; 