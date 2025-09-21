// EXTERNAL IMPORTS
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

// LOCAL IMPORTS
import EmptyCart from "./EmptyCart";
import CartProduct from "./CartProduct";

const Cart = () => {
  const navigate = useNavigate();

  const { items } = useSelector((store) => store.cart);
  const itemsId = items.length > 0 ? items.map((item) => item.productId) : [];
  const itemsQuantity =
    items.length > 0 ? items.map((item) => item.quantity) : [];
  const { products } = useSelector((store) => store.products);

  const cartProducts = products
    .filter((product) => itemsId.includes(product.id))
    .map((product) => {
      const index = itemsId.indexOf(product.id);
      return { ...product, quantity: itemsQuantity[index] };
    });

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 ">
        {cartProducts.length === 0 ? (
          <EmptyCart />
        ) : (
          <>
            <center>
              {" "}
              <h2 className="text-2xl font-bold text-gray-800 tracking-wide mb-6">
                SHOPPING CART
              </h2>
            </center>
            <div className="space-y-4">
              {cartProducts.map((product) => (
                <CartProduct key={product.id} product={product} />
              ))}
            </div>
            {/* Checkout Button Section */}
            <div className="mt-8 px-20">
              <button
                onClick={() => navigate("/checkout")}
                className="w-full flex items-center justify-center gap-2 
                       bg-[#3454b4] text-white py-2 rounded-lg font-semibold 
                       hover:bg-[#4169e1] transition duration-200 
                       shadow-md shadow-gray-300"
              >
                Checkout
                <FaArrowRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default Cart;
