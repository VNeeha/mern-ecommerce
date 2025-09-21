// EXTERNAL IMPORTS
import { useDispatch } from "react-redux";
import { useState } from "react";
// LOCAL IMPORTS
import { cartActions } from "../../../store/cartSlice";
import { productActions } from "../../../store/productsSlice";

const ProductQuantity = ({ quantity, setQuantity, product }) => {
  const dispatch = useDispatch();
  const [localQuantity, setLocalQuantity] = useState(product.quantity);

  const updateLocalStateOnly = !(quantity === undefined);
  if (quantity === undefined) quantity = localQuantity;
  if (setQuantity === undefined) setQuantity = setLocalQuantity;

  const incrementHandler = () => {
    if (product.stock <= quantity) {
      alert("Out of stock");
      return;
    }
    setQuantity((prev) => prev + 1);
    if (!updateLocalStateOnly) {
      dispatch(cartActions.incrementItemQuantity(product.id));
    }
  };

  const decrementHandler = () => {
    if (updateLocalStateOnly) {
      if (quantity <= 0) return;
    } else {
      if (quantity <= 1) return;
    }
    setQuantity((prev) => prev - 1);
    if (!updateLocalStateOnly) {
      dispatch(cartActions.decrementItemQuantity(product.id));
    }
  };

  return (
    <div className="flex justify-between items-center ">
      {/* Quantity Controls */}
      <div className="flex items-center border border-gray-300 rounded-sm shadow-sm overflow-hidden w-max">
        <button
          type="button"
          onClick={decrementHandler}
          className="w-8 h-8 flex items-center justify-center bg-gray-300 hover:bg-gray-200 text-lg font-semibold text-gray-700 transition-colors"
        >
          −
        </button>

        <span className="px-4 py-1 text-center text-gray-800 font-medium bg-white">
          {quantity}
        </span>

        <button
          type="button"
          onClick={incrementHandler}
          className="w-8 h-8 flex items-center justify-center bg-gray-300 hover:bg-gray-200 text-lg font-semibold text-gray-700 transition-colors"
        >
          +
        </button>
      </div>

      {/* Total Price */}

      <div className=" text-right text-gray-700 font-semibold text-lg">
        Total: ₹{product.price * quantity}
      </div>
    </div>
  );
};

export default ProductQuantity;
