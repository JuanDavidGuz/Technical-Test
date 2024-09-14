import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// Define la interfaz para los productos y la interfaz de las propiedades del componente
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[];
  category: {
    id: number;
    name: string;
  };
}

interface ProductListProps {
  selectedCategory: number | null;
}

function ProductList({ selectedCategory }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/products"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data: Product[] = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Inicialmente, muestra todos los productos
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory === null) {
      setFilteredProducts(products); // Muestra todos los productos si no se selecciona ninguna categoría
    } else {
      setFilteredProducts(
        products.filter((product) => product.category.id === selectedCategory)
      );
    }
  }, [selectedCategory, products]);

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  return (
    <div className="flex flex-wrap gap-6 p-6 bg">
      {filteredProducts.map((product) => (
        <div
          key={product.id}
          className="w-64 bg-zinc-900 rounded-lg overflow-hidden"
        >
          <img
            src={product.images[0]}
            alt={product.title}
            className="w-full h-48 object-cover"
            onError={(e) =>
              (e.currentTarget.src =
                "https://via.placeholder.com/640x480?text=Image+Not+Found")
            }
          />
          <div className="p-4">
            <h2 className="text-xl font-serif mb-2 text-white">
              {product.title}
            </h2>
            <div className="flex justify-between">
              <p className="text-white font-serif flex justify-center items-center">
                ${product.price}
              </p>
              <Link to={`/product/${product.id}`}>
                <button className="bg-violet-700 text-white px-4 py-2 rounded hover:bg-violet-800">
                  See More
                </button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
