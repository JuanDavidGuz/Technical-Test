import { useState } from "react";
import CategoryFilter from "./CategoryFilter";
import Navbar from "./Navbar";
import ProductList from "./ProductList";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleCategoryChange = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="bg-black w-full min-h-full">
      <Navbar />
      <div className="flex flex-row">
        <div className="w-3/4">
          <ProductList selectedCategory={selectedCategory} />
        </div>
        <div className="w-1/4">
          <CategoryFilter onCategoryChange={handleCategoryChange} />
        </div>
      </div>
    </div>
  );
}

export default Home;
