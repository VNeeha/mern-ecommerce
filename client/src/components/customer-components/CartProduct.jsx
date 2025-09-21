// EXTERNAL IMPORTS
import { useDispatch } from "react-redux";
import { IoClose } from "react-icons/io5";

// LOCAL IMPORTS
import ProductQuantity from "../common-components/products-components/ProductQuantity";
import { cartActions } from "../../store/cartSlice";

const CartProduct = ({ product }) => {
  const dispatch = useDispatch();

  const removeFromCartHandler = () => {
    // call services to remove item from backend
    dispatch(cartActions.removeFromCart(product.id));
  };

  return (
    <div className="flex justify-center px-20">
      <div className="relative p-4 bg-white rounded-2xl shadow-lg  transition-shadow mb-4 flex flex-col  md:flex-row gap-4 md:gap-6 min-w-full md:items-center">
        {/* Product Image */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full md:w-50 md:h-50 h-48 object-cover rounded-xl border border-gray-200 shadow-sm"
        />

        {/* Product Details */}
        <div className="flex flex-col flex-1 justify-between">
          <div className="space-y-2 text-gray-700">
            <h2 className="text-lg font-medium ">{product.name}</h2>
            <p className="text-md font-medium ">₹{product.price}</p>
            <div
              className={`px-2 py-1 w-22 rounded-full text-sm font-medium ${
                product.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
            </div>
            {/* Quantity Selector */}
            <div className="mt-4">
              <ProductQuantity product={product} />
            </div>
          </div>
        </div>

        {/* Trash Icon (Top-Right Corner) */}
        <button
          type="button"
          onClick={removeFromCartHandler}
          className="absolute top-0 right-0 p-2 text-red-500 hover:text-red-600 hover:bg-red-100 rounded-full transition-all"
          title="Remove from cart"
        >
          <IoClose size={30} />
        </button>
      </div>
    </div>
  );
};

export default CartProduct;
