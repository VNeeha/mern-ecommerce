// EXTERNAL IMPORTS
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
// LOCAL IMPORTS
import { cartActions } from "../../../store/cartSlice";

const Product = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { user } = useSelector((store) => store.user);
  const { items } = useSelector((store) => store.cart);
  const itemsId = items.length > 0 ? items.map((item) => item.productId) : [];
  const itemsQuantity =
    items.length > 0 ? items.map((item) => item.quantity) : [];
  const itemIndex = itemsId.indexOf(product.id);

  const productDetailLink = user
    ? user.role == "customer"
      ? `/category/${product.category}/product/${product.id}`
      : `/admin/category/${product.category}/product/${product.id}`
    : "/login";

  const editProductHandler = () => {};
  const checkCartHandler = () => {
    navigate("/cart");
  };
  const addToCartHandler = () => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname }, replace: true });
      return;
    }
    if (!items.length > 0) {
      // call services method to create cart document for that id with product id and quantity
      dispatch(
        cartActions.setCart({ items: [{ productId: product.id, quantity: 1 }] })
      );
    } else {
      dispatch(cartActions.addToCart({ productId: product.id }));
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-1 w-64 p-4 flex flex-col text-gray-700">
      <div
        className="cursor-pointer"
        onClick={() => navigate(productDetailLink)}
      >
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-lg font-semibold truncate">{product.name}</h2>
        <p className="text-md font-medium">₹{product.price}</p>
      </div>
      {(user && (user.role == "admin" || user.role == "superAdmin") && (
        <button
          className="mt-2 w-full py-1 rounded text-white bg-[#3454b4] hover:bg-[#4169e1]"
          onClick={editProductHandler}
        >
          Edit
        </button>
      )) ||
        (user && product.stock === 0 && (
          <button
            className="mt-2 w-full py-1 rounded text-white bg-[#9198ab]"
            disabled={true}
          >
            Out of stack
          </button>
        )) ||
        (user &&
          itemsId.length > 0 &&
          itemsId.includes(product.id) &&
          itemsQuantity[itemIndex] > 0 && (
            <button
              className="mt-2 w-full py-1 rounded text-white bg-[#3454b4] hover:bg-[#4169e1]"
              onClick={checkCartHandler}
            >
              Check cart
            </button>
          )) || (
          <button
            className="mt-2 w-full py-1 rounded text-white bg-[#3454b4] hover:bg-[#4169e1]"
            onClick={addToCartHandler}
          >
            Add to cart
          </button>
        )}
    </div>
  );
};
export default Product;
