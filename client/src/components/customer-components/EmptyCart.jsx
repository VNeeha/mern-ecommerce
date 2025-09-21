// EXTERNAL IMPORTS
import { LuShoppingCart } from "react-icons/lu"; // Lucide cart icon

const EmptyCart = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] ">
      <LuShoppingCart className="h-20 w-20 mb-4 text-gray-400" />

      <h2 className="text-2xl font-bold text-gray-800 tracking-wide mb-2">
        Your cart is empty
      </h2>
      <p className="text-md text-gray-700 mb-2">
        Looks like you haven’t added anything yet.
      </p>
      <button
        onClick={() => navigate("/")}
        className=" bg-[#3454b4] text-white py-2 px-4 rounded-lg font-semibold 
             hover:bg-[#4169e1] transition duration-200 
             flex items-center justify-center gap-2"
      >
        Start Shopping
      </button>
    </div>
  );
};
export default EmptyCart;
