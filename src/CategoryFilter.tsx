import { useState, useEffect } from "react";

interface Category {
  id: number;
  name: string;
}

interface CategoryFilterProps {
  onCategoryChange: (categoryId: number | null) => void;
}

function CategoryFilter({ onCategoryChange }: CategoryFilterProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://api.escuelajs.co/api/v1/categories"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data: Category[] = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <div className="p-4 bg-zinc-900 my-6 mx-4 rounded-lg">
      <h2 className="text-xl font-bold mb-2 text-white bg">
        Filter by Category:
      </h2>
      <ul className="list-none  space-y-1 bg-zinc-900">
        <li
          onClick={() => handleCategoryClick(null)}
          className={`cursor-pointer p-2 rounded text-white ${
            selectedCategory === null ? "bg-violet-700" : "hover:bg-violet-800"
          }`}
        >
          All Categories
        </li>
        {categories.map((category) => (
          <li
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
            className={`cursor-pointer p-2 rounded text-white ${
              selectedCategory === category.id
                ? "bg-violet-700"
                : "hover:bg-violet-800"
            }`}
          >
            {category.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryFilter;
