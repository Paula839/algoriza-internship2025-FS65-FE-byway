import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import CartItemImage from "../assets/images/HomePage/Course.jpg";
import { useCart } from "../context/CartContext"; 
import { useNavigate } from "react-router-dom";

const ShoppingCartPage = () => {
  const { cart, removeFromCart, cartCount } = useCart();
  const navigate = useNavigate();

  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const tax = 20.25;
  const total = subtotal + tax;

  if (cart.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-700 text-lg">
        Your cart is empty.
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <div className="mt-28 px-20 flex flex-col gap-2 relative">
        <div className="flex flex-row items-baseline gap-[37px]">
          <h2 className="font-inter font-semibold text-[32px] leading-[130%] text-gray-900">
            Shopping Cart
          </h2>

          <div className="flex flex-row items-center gap-4 w-[257px] h-[24px] flex-none">
            <span className="font-inter font-normal text-[14px] leading-[150%] text-gray-900">
              Courses
            </span>
            <span className="font-inter font-normal text-[14px] leading-[150%] text-gray-900">
              Details
            </span>
            <span className="font-inter font-normal text-[14px] leading-[150%] text-blue-600">
              Shopping Cart
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 px-20">
        <span className="font-inter font-normal text-[14px] leading-[150%] text-gray-700">
          {cartCount} Courses in Cart
        </span>
      </div>

      <div className="mt-4 px-20 space-y-6">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-start p-4 border border-gray-200 rounded bg-white max-w-[1320px]"
          >
            <img
              src={item.image || CartItemImage}
              alt={item.name}
              className="w-48 h-28 rounded object-cover"
            />
            <div className="flex flex-col justify-between flex-1 ml-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {item.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  By {item.instructorName || "Unknown Instructor"}
                </p>

                <div className="flex items-center gap-2 mt-1">
                  <span className="text-gray-900 text-sm font-medium">
                    {item.rate?.toFixed(1) ?? "0.0"}
                  </span>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, i) =>
                      i < Math.round(item.rate || 0) ? (
                        <AiFillStar
                          key={i}
                          className="text-yellow-400 w-4 h-4"
                        />
                      ) : (
                        <AiOutlineStar
                          key={i}
                          className="text-gray-300 w-4 h-4"
                        />
                      )
                    )}
                  </div>
                  <p className="text-gray-800 text-sm mt-1">
                    {item.totalHours || 0} Total Hours ·{" "}
                    {item.contents?.length || 0} Lectures ·{" "}
                    {item.level || "All levels"}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-2">
                <button
                  className="text-red-600 font-medium"
                  onClick={() => removeFromCart(item.id!)}
                >
                  Remove
                </button>
                <span className="text-xl font-semibold text-gray-900">
                  ${item.price?.toFixed(2) ?? "0.00"}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="fixed top-40 right-20 w-[330px] flex flex-col gap-4">
        <h4 className="text-xl font-semibold text-gray-900">Order Details</h4>
        <div className="flex flex-col bg-gray-100 border border-gray-200 rounded p-4 gap-4">
          <div className="flex justify-between">
            <span className="text-gray-900">Price</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-900">Discount</span>
            <span className="font-semibold">$0.00</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-900">Tax</span>
            <span className="font-semibold">${tax.toFixed(2)}</span>
          </div>
          <hr className="border-gray-200" />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
            <button
            onClick={() => navigate("/checkout")}
            className="bg-black text-white py-2 rounded mt-2 hover:bg-gray-900 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCartPage;
