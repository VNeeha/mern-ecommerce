// LOCAL IMPORTS
import ProductContainer from "./ProductContainer";
import { useProductsByCategory } from "../../../hooks/useProductsByCategory";
import CategoryHeader from "./CategoryHeader";

const CategorySection = ({ category, count }) => {
  const categorizedProducts = useProductsByCategory(category, count);
  return (
    <div className="mb-12  shadow-sm rounded-lg p-6">
      <CategoryHeader category={category} count={count} />
      <ProductContainer categorizedProducts={categorizedProducts} />
    </div>
  );
};

export default CategorySection;
