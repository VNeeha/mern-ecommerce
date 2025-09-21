// EXTERNAL IMPORTS
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

// LOCAL IMPORTS
import { useProductById } from "../../../hooks/useProductById";
import ProductQuantity from "./ProductQuantity";
import { cartActions } from "../../../store/cartSlice";

const ProductDetails = () => {
  const dispatch = useDispatch();
  // Get the product ID from the URL parameters and fetch product details
  const { category, productId } = useParams();
  const product = useProductById(category, productId);
  if (!product) {
    return <p className="text-center p-4">Loading product...</p>;
  }
  const { items } = useSelector((store) => store.cart);
  const itemsId = items.length > 0 ? items.map((item) => item.productId) : [];
  const itemsQuantity =
    items.length > 0 ? items.map((item) => item.quantity) : [];
  const itemIndex = itemsId.indexOf(product.id);
  const initialQuantity = (itemIndex >= 0 && itemsQuantity[itemIndex]) || 0;
  const [quantity, setQuantity] = useState(initialQuantity);
  const { user } = useSelector((store) => store.user);

  const editProductHandler = () => {};
  const updateCartHandler = () => {
    if (quantity > product.stock) {
      alert(`Only ${product.stock} items available`);
      setQuantity(initialQuantity);
      return;
    }
    // call services method to update in backend

    dispatch(cartActions.updateCart({ id: product.id, quantity: quantity }));
  };
  const addToCartHandler = () => {
    if (quantity > product.stock) {
      alert(`Only ${product.stock} items available`);
      setQuantity(initialQuantity);
      return;
    }

    if (!items > 0) {
      // call services method to create cart document for that id with product id and quantity
      dispatch(
        cartActions.setCart({
          items: [{ productId: product.id, quantity: quantity }],
        })
      );
    } else {
      dispatch(
        cartActions.addToCart({ productId: product.id, quantity: quantity })
      );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-10 ">
      <div className="max-w-4xl mx-auto  rounded-2xl shadow-xl flex flex-col md:flex-row justify-center   bg-white">
        {/* LEFT - Product Image */}
        <div
          className="w-full md:w-1/2 aspect-[4/5] overflow-hidden 
                rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT - Product Details */}
        <div className="flex flex-col justify-center space-y-5 md:space-y-7 md:w-1/2 px-8 py-8 rounded-b-2xl md:rounded-none">
          {/* Title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
            {product.name}
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-md md:text-base leading-relaxed">
            {product.description}
          </p>

          {/* Price & Stock */}
          <div className="flex items-center justify-between">
            <div className="text-2xl  font-semibold text-[#3454b4]">
              ₹{product.price}
            </div>
            <div
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                product.stock > 0
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
            </div>
          </div>

          {/* Quantity + Total */}
          <div>
            <ProductQuantity
              quantity={quantity}
              setQuantity={setQuantity}
              product={product}
            />
          </div>

          {/* Action Buttons */}
          {(user && (user.role === "admin" || user.role === "superAdmin") && (
            <button
              className="mt-2 w-full py-2 rounded-xl text-lg font-medium text-white bg-[#3454b4] hover:bg-[#4169e1] shadow-md hover:shadow-lg transition-all"
              onClick={editProductHandler}
            >
              Edit Product
            </button>
          )) ||
            (user && product.stock === 0 && (
              <button
                className="mt-2 w-full py-2 rounded-xl text-lg font-medium text-white bg-gray-400 cursor-not-allowed"
                disabled={true}
              >
                Out of Stock
              </button>
            )) ||
            (user &&
              itemsId.length > 0 &&
              itemsId.includes(product.id) &&
              itemsQuantity[itemIndex] > 0 && (
                <button
                  className="mt-2 w-full py-2 rounded-xl text-lg font-medium text-white bg-[#3454b4] hover:bg-[#4169e1] shadow-md hover:shadow-lg transition-all"
                  onClick={updateCartHandler}
                >
                  Update Cart
                </button>
              )) || (
              <button
                className="mt-2 w-full py-2 rounded-xl text-lg font-medium text-white bg-[#3454b4] hover:bg-[#4169e1] shadow-md hover:shadow-lg transition-all"
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
