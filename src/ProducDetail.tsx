import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "./Navbar";
import "./ProductDestail.css";

interface ProductDetail {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  category: { name: string };
}

function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `https://api.escuelajs.co/api/v1/products/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const data: ProductDetail = await response.json();
        setProduct(data);
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

    fetchProduct();
  }, [id]);

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product!.images.length - 1 : prevIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product!.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  if (loading) {
    return <p className="text-center text-lg font-semibold">Loading...</p>;
  }
  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }

  if (!product) {
    return <p className="text-center">Product not found</p>;
  }

  return (
    <div className="bg-black w-screen h-screen text-white">
      <Navbar />
      <div className="bg-zinc-900 win flex rounded-lg ">
        <Link to={"/home"}>
          <button className=" absolute top-48 right-56 to-white bg-violet-700 px-2 rounded-full">
            X
          </button>
        </Link>
        <div className="h-full relative">
          <img
            src={product.images[currentImageIndex]}
            alt={product.title}
            className="h-full rounded-xl object-cover"
            onError={(e) =>
              (e.currentTarget.src =
                "https://via.placeholder.com/640x480?text=Image+Not+Found")
            }
          />
          <button
            className="absolute top-1/2 left-0 transform -translate-y-1/2 font-extrabold  text-black px-4 py-2 hover:bg-slate-500"
            onClick={handlePrevClick}
          >
            &lt;
          </button>
          <button
            className="absolute top-1/2 right-0 transform -translate-y-1/2 font-extrabold  text-black px-4 py-2 hover:bg-slate-500"
            onClick={handleNextClick}
          >
            &gt;
          </button>
        </div>
        <div className="w-1/2 h-full p-10">
          <h1 className="text-3xl font-serif mb-4">{product.title}</h1>
          <p className="mb-4 font-serif">${product.price}</p>
          <p className="text-xl mb-4 font-serif">
            Category: {product.category.name}
          </p>
          <p>{product.description}</p>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
