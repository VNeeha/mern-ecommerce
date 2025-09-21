// EXTERNAL IMPORTS
import { useSelector, useDispatch } from "react-redux";
import {
  Form,
  useActionData,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

// LOCAL IMPORTS
import { cartActions } from "../../store/cartSlice";
import EmptyCart from "./EmptyCart";
import { orderActions } from "../../store/orderSlice";

const CheckoutPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation();
  const actionData = useActionData();

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

  // Calculate total using current product prices
  const totalAmount = cartProducts.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    address: "",
    payment: "COD",
  });

  const [errorState, setErrorState] = useState({});

  // Handle input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle backend action response
  useEffect(() => {
    if (!actionData) return;

    if (actionData.success) {
      dispatch(cartActions.resetCart());
      dispatch(orderActions.addOrder(actionData.order));
      // call backend from services to refetch products with updated stock
      // dispatch(productActions.setProducts([]));

      toast.success(actionData.success, {
        duration: 2000,
        id: "order-toast",
      });
      const timer = setTimeout(() => {
        navigate("/orders");
      }, 2000);

      return () => clearTimeout(timer);
    }

    if (actionData.errors) {
      setErrorState(actionData);
    }
  }, [actionData, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {cartProducts.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          {/* Page Heading */}
          <h2 className="text-2xl font-bold text-gray-800 tracking-wide mb-6 text-center">
            CHECKOUT
          </h2>

          {/* Outer main card */}
          <div className="max-w-5xl mx-auto py-12 px-6  shadow-lg rounded-lg space-y-8 text-gray-700">
            {/* Order Items Section */}
            <div className="bg-white rounded-lg shadow-lg p-6 space-y-4">
              <h3 className="text-xl font-semibold mb-3">Order Items</h3>
              {cartProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between bg-gray-50 rounded p-4 shadow-lg"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div>
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm">Qty: {product.quantity}</p>
                    </div>
                  </div>
                  <p className="font-bold">
                    ₹{product.price * product.quantity}
                  </p>
                </div>
              ))}
              {errorState?.errors?.stock && (
                <p className="text-red-500">{errorState.errors.stock}</p>
              )}
            </div>

            {/* Form + Summary grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
              {/* Checkout Form */}
              <div className="bg-white rounded-lg shadow-lg p-6 md:col-span-2 space-y-4">
                <h3 className="text-xl font-semibold mb-3">
                  Shipping & Payment
                </h3>
                <Form
                  className="space-y-5"
                  method="POST"
                  key={errorState?.errors ? "error" : "clean"}
                >
                  {/* hidden: items + client total */}
                  <input
                    type="hidden"
                    name="items"
                    value={JSON.stringify(
                      cartProducts.map((p) => ({
                        id: p.id,
                        quantity: p.quantity,
                        price: p.price,
                      }))
                    )}
                  />
                  <input type="hidden" name="clientTotal" value={totalAmount} />

                  {/* Name */}
                  <div>
                    <label className="block text-md font-medium mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3454b4] focus:border-[#3454b4] text-gray-700"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                    {errorState?.errors?.name && (
                      <p className="text-red-500">{errorState.errors.name}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-md font-medium mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      placeholder="Enter your phone number"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3454b4] focus:border-[#3454b4] text-gray-700"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                       required
                    />
                    {errorState?.errors?.phoneNumber && (
                      <p className="text-red-500">
                        {errorState.errors.phoneNumber}
                      </p>
                    )}
                  </div>

                  {/* Address */}
                  <div>
                    <label className="block text-md font-medium mb-1">
                      Address
                    </label>
                    <textarea
                      name="address"
                      placeholder="Enter your shipping address"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3454b4] focus:border-[#3454b4] text-gray-700"
                      value={formData.address}
                      onChange={handleChange}
                       required
                    />
                    {errorState?.errors?.address && (
                      <p className="text-red-500">
                        {errorState.errors.address}
                      </p>
                    )}
                  </div>

                  {/* Payment */}
                  <div>
                    <label className="block text-md font-medium mb-1">
                      Payment Method
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          value="COD"
                          checked={formData.payment === "COD"}
                          onChange={handleChange}
                        />
                        Cash on Delivery
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          value="Card"
                          checked={formData.payment === "Card"}
                          onChange={handleChange}
                        />
                        Credit/Debit Card
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="payment"
                          value="UPI"
                          checked={formData.payment === "UPI"}
                          onChange={handleChange}
                        />
                        UPI
                      </label>
                    </div>
                  </div>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={
                      navigation.state === "submitting" || items.length === 0
                    }
                    className={`w-full py-2 rounded-lg text-white ${
                      navigation.state === "submitting"
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#3454b4] hover:bg-[#4169e1]"
                    }`}
                  >
                    {navigation.state === "submitting"
                      ? "Placing order..."
                      : "Place Order"}
                  </button>
                </Form>
              </div>

              {/* Order Summary */}
              <div className="bg-white rounded-lg shadow-lg p-6 self-start md:w-72">
                <h3 className="text-xl font-semibold mb-3">Order Summary</h3>
                <div className="space-y-3">
                  <p className="flex justify-between">
                    <span>Items Total</span>
                    <span>₹{totalAmount}</span>
                  </p>
                  <p className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹0</span>
                  </p>
                  <p className="flex justify-between font-bold text-lg border-t pt-3 mt-3">
                    <span>Total</span>
                    <span>₹{totalAmount}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;

export async function checkoutAction(data) {
  const formData = await data.request.formData();
  const checkoutFormData = Object.fromEntries(formData);
  const orderObj = {
    items: JSON.parse(checkoutFormData.items),
    totalAmount: checkoutFormData.clientTotal,
    name: checkoutFormData.name,
    phoneNumber: checkoutFormData.phoneNumber,
    shippingAddress: checkoutFormData.address,
    paymentMethod: checkoutFormData.payment,
  };
  // call services method to send this object for order document creation
  const successObj = {
    success: "Order placed sucessfully",
    order: {
      id: "ORD1001",
      userId: "U001",
      items: [
        { productId: "24", quantity: 2, price: 879 },
        { productId: "31", quantity: 1, price: 2500 },
      ],
      totalAmount: 3498,
      paymentMethod: "COD",
      status: "Pending",
      shippingAddress: {
        street: "123 Street",
        city: "Hyderabad",
        state: "TS",
        pincode: "500001",
        country: "India",
      },
      orderedAt: "2025-09-10T12:45:00Z",
      deliveredAt: null,
    },
  };
  const errorObj = {
    errors: {
      stock: "out of stock",
      address: "invalid address",
      phoneNumber: "invalid",
    },
  };
  const resObj = successObj;
  return resObj;
}
