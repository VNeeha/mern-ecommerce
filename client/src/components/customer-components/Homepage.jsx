// LOCAL IMPORTS
import CategorySection from "../common-components/products-components/CategorySection";

const Homepage = () => {
  const categories = [
    "clothing",
    "accessories",
    "books",
    "electronics",
    "grocery",
  ];
  return (
    <div className="bg-gray-100 p-6 rounded-xl">
      {categories.map((category) => (
        <CategorySection key={category} category={category} count={4} />
      ))}
    </div>
  );
};
export default Homepage;
