// EXTERNAL IMPORTS
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const CategoryHeader = ({ category, count }) => {
  return (
    <div className="flex justify-between items-center mb-4">
      {/* Heading */}
      <h2 className="text-2xl font-bold text-gray-800 tracking-wide">
        {category.toUpperCase()}
      </h2>

      {count == 4 && (
        <Link
          to={`/category/${category}`}
          className="flex items-center gap-1 text-[#3454b4]  hover:text-[#4169e1]  transition"
        >
          <span className="font-semibold">See All</span>
          <FaArrowRight size={14} />
        </Link>
      )}
    </div>
  );
};

export default CategoryHeader;
