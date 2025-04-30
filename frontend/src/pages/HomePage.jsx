import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  },
  {
    id: 13,
    name: "Men's Leather Wallet",
    price: 1299.00,
    image_url: 'https://images.unsplash.com/photo-1606503825008-908883c4a5b8',
    category: 'Men',
    brand: 'Hidesign'
  },
  {
    id: 14,
    name: "Women's Casual Shoes",
    price: 1699.00,
    image_url: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86',
    category: 'Women',
    brand: 'Puma'
  },
  {
    id: 15,
    name: "Kids Casual Shirt",
    price: 599.00,
    image_url: 'https://images.unsplash.com/photo-1503919545889-aef636e10ad4',
    category: 'Kids',
    brand: 'Zara'
  },
  {
    id: 16,
    name: "Men's Denim Jacket",
    price: 2199.00,
    image_url: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e',
    category: 'Men',
    brand: 'Levi\'s'
  },
  {
    id: 17,
    name: "Men's Formal Trousers",
    price: 2336.21,
    image_url: 'https://images.unsplash.com/photo-1606813904571-6f56d2a54f38',
    category: 'Men',
    brand: 'Van Heusen'
  },
  {
    id: 18,
    name: "Women's Anarkali Kurta",
    price: 900.93,
    image_url: 'https://images.unsplash.com/photo-1618354691263-3f3d1ef667a2',
    category: 'Women',
    brand: 'Biba'
  },
  {
    id: 19,
    name: "Kids Graphic T-Shirt",
    price: 1773.25,
    image_url: 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2',
    category: 'Kids',
    brand: 'Zara Kids'
  },
  {
    id: 20,
    name: "Women's Yoga Pants",
    price: 1094.06,
    image_url: 'https://images.unsplash.com/photo-1629970465775-1a0e07c790e1',
    category: 'Women',
    brand: 'HRX'
  },
  {
    id: 21,
    name: "Men's Slim Fit Jeans",
    price: 1582.52,
    image_url: 'https://images.unsplash.com/photo-1596464716125-5f1e92a37062',
    category: 'Men',
    brand: 'Levis'
  },
  {
    id: 22,
    name: "Kids Party Dress",
    price: 1415.81,
    image_url: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3',
    category: 'Kids',
    brand: 'Carter’s'
  },
  {
    id: 23,
    name: "Women's Sweater",
    price: 1306.81,
    image_url: 'https://images.unsplash.com/photo-1606813904571-6f56d2a54f38',
    category: 'Women',
    brand: 'H&M'
  },
  {
    id: 24,
    name: "Kids Joggers",
    price: 1531.65,
    image_url: 'https://images.unsplash.com/photo-1596464716125-5f1e92a37062',
    category: 'Kids',
    brand: 'UCB'
  },
  {
    id: 25,
    name: "Men's Casual Blazer",
    price: 1202.44,
    image_url: 'https://images.unsplash.com/photo-1588072432836-e10032774350',
    category: 'Men',
    brand: 'Raymond'
  },
  {
    id: 26,
    name: "Kids Pajamas Set",
    price: 2067.96,
    image_url: 'https://images.unsplash.com/photo-1588072432836-e10032774350',
    category: 'Kids',
    brand: 'Mothercare'
  },
  {
    id: 27,
    name: "Kids Trolley Bag",
    price: 594.36,
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
    category: 'Kids',
    brand: 'Disney'
  },
  {
    id: 28,
    name: "Women's Casual Top",
    price: 561.32,
    image_url: 'https://images.unsplash.com/photo-1588072432836-e10032774350',
    category: 'Women',
    brand: 'ONLY'
  },
  {
    id: 29,
    name: "Men's Hooded Jacket",
    price: 609.06,
    image_url: 'https://images.unsplash.com/photo-1617036374066-cd9f963c2672',
    category: 'Men',
    brand: 'Woodland'
  },
  {
    id: 30,
    name: "Women's Leather Boots",
    price: 1727.42,
    image_url: 'https://images.unsplash.com/photo-1617036374066-cd9f963c2672',
    category: 'Women',
    brand: 'Carlton London'
  },
  {
    id: 31,
    name: "Kids Denim Dungarees",
    price: 2763.42,
    image_url: 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2',
    category: 'Kids',
    brand: 'Gini & Jony'
  },
  {
    id: 32,
    name: "Women's Sports Bra",
    price: 1607.71,
    image_url: 'https://images.unsplash.com/photo-1618354691263-3f3d1ef667a2',
    category: 'Women',
    brand: 'Nike'
  },
  {
    id: 33,
    name: "Men's Flip Flops",
    price: 783.44,
    image_url: 'https://images.unsplash.com/photo-1617036374066-cd9f963c2672',
    category: 'Men',
    brand: 'Puma'
  },
  {
    id: 34,
    name: "Women's Bracelet",
    price: 2917.47,
    image_url: 'https://images.unsplash.com/photo-1618354691263-3f3d1ef667a2',
    category: 'Women',
    brand: 'Fastrack'
  },
  {
    id: 35,
    name: "Men's Cotton Polo T-Shirt",
    price: 2294.76,
    image_url: 'https://images.unsplash.com/photo-1618354691263-3f3d1ef667a2',
    category: 'Men',
    brand: 'U.S. Polo Assn.'
  },
  {
    id: 36,
    name: "Kids Rain Boots",
    price: 2576.52,
    image_url: 'https://images.unsplash.com/photo-1588072432836-e10032774350',
    category: 'Kids',
    brand: 'Skechers'
  },
  {
    id: 37,
    name: "Men's Leather Belt",
    price: 2567.87,
    image_url: 'https://images.unsplash.com/photo-1629970465775-1a0e07c790e1',
    category: 'Men',
    brand: 'Hidesign'
  },
  {
    id: 38,
    name: "Kids Fleece Hoodie",
    price: 2891.10,
    image_url: 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2',
    category: 'Kids',
    brand: 'Pepe Jeans'
  },
  {
    id: 39,
    name: "Men's Analog Watch",
    price: 539.88,
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    category: 'Men',
    brand: 'Titan'
  },
  {
    id: 40,
    name: "Women's Maxi Dress",
    price: 2691.03,
    image_url: 'https://images.unsplash.com/photo-1588072432836-e10032774350',
    category: 'Women',
    brand: 'Zara'
  },
  {
    id: 41,
    name: "Men's Formal Shirt",
    price: 1435.75,
    image_url: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10',
    category: 'Men',
    brand: 'Arrow'
  },
  {
    id: 42,
    name: "Women's Jeans",
    price: 1499.00,
    image_url: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c',
    category: 'Women',
    brand: 'Levis'
  },
  {
    id: 43,
    name: "Kids School Shoes",
    price: 799.00,
    image_url: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2',
    category: 'Kids',
    brand: 'Adidas'
  },
  {
    id: 44,
    name: "Men's Sneakers",
    price: 1999.00,
    image_url: 'https://images.unsplash.com/photo-1549298916-b21d5d6d6efa',
    category: 'Men',
    brand: 'Nike'
  },
  {
    id: 45,
    name: "Women's Handbag",
    price: 2499.00,
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
    category: 'Women',
    brand: 'Lavie'
  },
  {
    id: 46,
    name: "Kids Winter Jacket",
    price: 1299.00,
    image_url: 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2',
    category: 'Kids',
    brand: 'GAP'
  },
  {
    id: 47,
    name: "Men's Watch",
    price: 3499.00,
    image_url: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d',
    category: 'Men',
    brand: 'Fossil'
  },
  {
    id: 48,
    name: "Women's Sunglasses",
    price: 899.00,
    image_url: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083',
    category: 'Women',
    brand: 'RayBan'
  },
  {
    id: 49,
    name: "Kids Backpack",
    price: 699.00,
    image_url: 'https://images.unsplash.com/photo-1588072432836-e10032774350',
    category: 'Kids',
    brand: 'Skybags'
  },
  {
    id: 50,
    name: "Men's Kurta",
    price: 1299.00,
    image_url: 'https://images.unsplash.com/photo-1596464716125-5f1e92a37062',
    category: 'Men',
    brand: 'Manyavar'
  },
  {
    id: 51,
    name: "Women's Dupatta",
    price: 499.00,
    image_url: 'https://images.unsplash.com/photo-1617036374066-cd9f963c2672',
    category: 'Women',
    brand: 'W'
  },
  {
    id: 52,
    name: "Kids Nightwear",
    price: 999.00,
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    category: 'Kids',
    brand: 'FirstCry'
  },
  {
    id: 53,
    name: "Women's Sports Leggings",
    price: 1199.00,
    image_url: 'https://images.unsplash.com/photo-1588072432836-e10032774350',
    category: 'Women',
    brand: 'Nike'
  },
  {
    id: 54,
    name: "Men's Tracksuit",
    price: 1599.00,
    image_url: 'https://images.unsplash.com/photo-1629970465775-1a0e07c790e1',
    category: 'Men',
    brand: 'Puma'
  },
  {
    id: 55,
    name: "Kids Cap",
    price: 299.00,
    image_url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3',
    category: 'Kids',
    brand: 'Adidas'
  },
  {
    id: 56,
    name: "Men's Beanie",
    price: 399.00,
    image_url: 'https://images.unsplash.com/photo-1588072432836-e10032774350',
    category: 'Men',
    brand: 'Superdry'
  },
  {
    id: 57,
    name: "Women's Wallet",
    price: 899.00,
    image_url: 'https://images.unsplash.com/photo-1617036374066-cd9f963c2672',
    category: 'Women',
    brand: 'Caprese'
  },
  {
    id: 58,
    name: "Men's Loafers",
    price: 1299.00,
    image_url: 'https://images.unsplash.com/photo-1629970465775-1a0e07c790e1',
    category: 'Men',
    brand: 'Bata'
  },
  {
    id: 59,
    name: "Kids Gloves",
    price: 199.00,
    image_url: 'https://images.unsplash.com/photo-1505692952047-1a78307da8f2',
    category: 'Kids',
    brand: 'Mothercare'
  },
  {
    id: 60,
    name: "Women's Earrings",
    price: 599.00,
    image_url: 'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3',
    category: 'Women',
    brand: 'Zaveri Pearls'
  },
  {
    id: 61,
    name: "Men's Tie",
    price: 349.00,
    image_url: 'https://images.unsplash.com/photo-1606813904571-6f56d2a54f38',
    category: 'Men',
    brand: 'Raymond'
  },
  {
    id: 62,
    name: "Women's Stilettos",
    price: 1899.00,
    image_url: 'https://images.unsplash.com/photo-1618354691263-3f3d1ef667a2',
    category: 'Women',
    brand: 'Catwalk'
  },
  {
    id: 63,
    name: "Kids Hat",
    price: 299.00,
    image_url: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff',
    category: 'Kids',
    brand: 'Babyhug'
  }
];
const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call with mock data
    const fetchFeaturedProducts = () => {
      try {
        setLoading(true);
        // Use mock data instead of API call
        setTimeout(() => {
          setFeaturedProducts(mockProducts);
          setLoading(false);
        }, 500); // Simulate network delay
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to load products. Please try again.');
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-700 to-primary py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 text-white mb-10 md:mb-0">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Shopping Made Easy With Mobishaala
              </h1>
              <p className="text-lg mb-8">
                Discover a world of fashion with the latest trends and styles for everyone.
              </p>
              <Link
                to="/products"
                className="bg-white text-primary px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors inline-block"
              >
                Shop Now
              </Link>
            </div>
            <div className="md:w-1/2">
              <img
                src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da"
                alt="Fashion Collection"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-light">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-10 text-center">Shop By Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link to="/products?category=Men" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-md h-80">
                <img
                  src="https://images.unsplash.com/photo-1617137968427-85924c800a22"
                  alt="Men's Collection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Men</span>
                </div>
              </div>
            </Link>
            <Link to="/products?category=Women" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-md h-80">
                <img
                  src="https://images.unsplash.com/photo-1618932260643-eee4a2f652a6"
                  alt="Women's Collection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Women</span>
                </div>
              </div>
            </Link>
            <Link to="/products?category=Kids" className="group">
              <div className="relative overflow-hidden rounded-lg shadow-md h-80">
                <img
                  src="https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8"
                  alt="Kids Collection"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <span className="text-white text-2xl font-bold">Kids</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-10 text-center">Featured Products</h2>
          
          {loading ? (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          ) : error ? (
            <div className="text-center text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link
              to="/products"
              className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors inline-block"
            >
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Promotion Banner */}
      <section className="py-16 bg-gray-100">
        <div className="container-custom">
          <div className="bg-dark rounded-lg overflow-hidden shadow-xl">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 p-10 text-white">
                <h2 className="text-3xl font-bold mb-4">Special Offer</h2>
                <p className="text-xl mb-6">Get up to 50% off on selected items</p>
                <Link
                  to="/products?sort=price_asc"
                  className="bg-primary text-white px-6 py-3 rounded-full font-medium hover:bg-opacity-90 transition-colors inline-block"
                >
                  Shop Now
                </Link>
              </div>
              <div className="md:w-1/2">
                <img
                  src="https://images.unsplash.com/photo-1610000000000-000000000000"
                  alt="Special Offer"
                  className="w-full h-64 md:h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 