// EXTERNAL IMPORTS
import { useSelector } from "react-redux";
import { MdOutlineReceiptLong } from "react-icons/md";

// LOCAL IMPORTS
import OrderCard from "../common-components/OrderCard";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const navigate = useNavigate();

  const { orders } = useSelector((state) => state.orders);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-gray-100">
      <div className="max-w-4xl mx-auto p-6 ">
        {orders.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] ">
            <MdOutlineReceiptLong className="h-20 w-20 mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold text-gray-800 tracking-wide mb-2">
              No Orders Found
            </h2>
            <p className="text-md text-gray-700 mb-2">
              Looks like you haven’t placed any orders yet.
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
        ) : (
          <>
            <center>
              {" "}
              <h2 className="text-2xl font-bold text-gray-800 tracking-wide mb-6">
                ORDER HISTORY
              </h2>
            </center>
            <div className="space-y-4">
              {orders.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Orders;
