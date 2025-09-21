// EXTERNAL IMPORTS
import { useSelector } from "react-redux";

const OrderCard = ({ order }) => {
  const { products } = useSelector((state) => state.products);

  // Choose badge color based on status
  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-700";
      case "Shipped":
        return "bg-blue-100 text-blue-700";
      case "Delivered":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-600";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all mb-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-4">
        <h3 className="text-lg font-bold text-gray-700">Order #{order.id}</h3>

        {/* Status Badge */}
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium w-fit ${getStatusBadgeClass(
            order.status
          )}`}
        >
          {order.status}
        </span>
      </div>

      {/* Payment + Date + address*/}
      <div className="text-sm text-gray-600 space-y-1 mb-4">
        <p>
          <span className="font-medium">Payment:</span> {order.paymentMethod}
        </p>
        <p>
          <span className="font-medium">Ordered:</span>{" "}
          {new Date(order.orderedAt).toLocaleString()}
        </p>
        <p>
          <span className="font-medium">Delivery Address:</span>{" "}
          {order.shippingAddress.street}, {order.shippingAddress.city} -{" "}
          {order.shippingAddress.pincode}
        </p>
      </div>

      {/* Items */}
      <div className="space-y-3">
        {order.items.map((item, idx) => {
          const product = products.find((p) => p.id === item.productId);
          return (
            <div
              key={idx}
              className="flex items-center justify-between bg-gray-50 rounded-lg p-3 shadow-sm"
            >
              <div className="flex items-center gap-3">
                {product?.imageUrl && (
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                )}
                <div>
                  <p className="font-medium text-gray-700">
                    {product?.name || "Unknown Product"}
                  </p>
                  <p className="text-xs text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
              <p className="font-semibold text-gray-700">
                ₹{item.price * item.quantity}
              </p>
            </div>
          );
        })}
      </div>

      {/* Total */}
      <div className="border-t pt-3 mt-4 flex justify-between">
        <p className="font-bold text-gray-700">Total:</p>
        <p className="font-bold text-xl text-gray-700">₹{order.totalAmount}</p>
      </div>
    </div>
  );
};

export default OrderCard;
