// EXTERNAL IMPORTS
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// LOCAL IMPORTS
import CategorySection from "./CategorySection";

const Products = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const validCategories = [
    "clothing",
    "accessories",
    "books",
    "grocery",
    "electronics",
  ];
  useEffect(() => {
    if (!validCategories.includes(category)) {
      navigate("/404", { replace: true });
    }
  }, [category, navigate]);
  return (
    <div className="bg-gray-100 p-6 rounded-xl">
      <>
        <CategorySection category={category} />
      </>
    </div>
  );
};
export default Products;
