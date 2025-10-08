import { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreditLogo from "../assets/images/Checkout/credit.png";
import PaypalLogo from "../assets/images/Checkout/paypal.png";
import { useCart } from "../context/CartContext";
import { purchase } from "../services/usersService";

const CheckoutPage = () => {
  const { cart, cartCount, removeFromCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const subtotal = cart.reduce((sum, item) => sum + (item.price || 0), 0);
  const tax = 20.25;
  const total = subtotal + tax;

  const validatePayment = (): boolean => {
    if (!country || !state) {
      setErrorMsg("Please fill in your country and state.");
      return false;
    }
    if (paymentMethod === "card") {
      if (!nameOnCard || !cardNumber || !expiry || !cvv) {
        setErrorMsg("Please fill in all credit card fields.");
        return false;
      }
      if (!/^\d{16}$/.test(cardNumber.replace(/\s/g, ""))) {
        setErrorMsg("Card number must be 16 digits.");
        return false;
      }
      if (!/^\d{2}\/\d{2}$/.test(expiry)) {
        setErrorMsg("Expiry date must be in MM/YY format.");
        return false;
      }
      if (!/^\d{3,4}$/.test(cvv)) {
        setErrorMsg("CVV must be 3 or 4 digits.");
        return false;
      }
    }
    setErrorMsg("");
    return true;
  };

  const handlePayment = async () => {
    if (!validatePayment()) return;
    if (cart.length === 0) {
      setErrorMsg("Your cart is empty!");
      return;
    }

    setLoading(true);
    const cartIds: number[] = cart
  .map((c) => c.id)
  .filter((id): id is number => id !== undefined);

    const result = await purchase(cartIds);
    setLoading(false);

    if (result) {
    cart.filter((c) => c.id !== undefined).forEach((c) => removeFromCart(c.id!));
      navigate("/purchaseComplete");
    } else {
      setErrorMsg("Payment failed. Please try again.");
    }
  };

  if (cartCount === 0) {
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
            Checkout Page
          </h2>
          <div className="flex flex-row items-center gap-4 w-[257px] h-[24px]">
            <span className="text-gray-900 text-[14px]">Details</span>
            <span className="text-gray-900 text-[14px]">Shopping Cart</span>
            <span className="text-blue-600 text-[14px]">Checkout</span>
          </div>
        </div>
      </div>

      <div className="absolute top-[71px] left-[80px] w-[950px] bg-white border border-gray-200 rounded-[16px] p-8 flex flex-col gap-[24px]">
        <div className="flex flex-row gap-[20px] w-full">
          <div className="flex flex-col gap-2 w-1/2">
            <label className="font-semibold text-[18px] text-gray-900">
              Country
            </label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Enter your country"
              className="w-full h-[58px] p-4 border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400"
            />
          </div>
          <div className="flex flex-col gap-2 w-1/2">
            <label className="font-semibold text-[18px] text-gray-900">
              State / Union Territory
            </label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Enter your state"
              className="w-full h-[58px] p-4 border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400"
            />
          </div>
        </div>

        <div className="flex flex-col gap-[12px] w-full">
          <h3 className="font-semibold text-[18px] text-gray-900">
            Payment Method
          </h3>

          <div
            className={`relative flex flex-col gap-4 w-full p-6 rounded-lg cursor-pointer ${
              paymentMethod === "card"
                ? "border-2 border-blue-600 bg-[#F8FAFC]"
                : "border border-gray-300 bg-[#F8FAFC]"
            }`}
            onClick={() => setPaymentMethod("card")}
          >
            <div className="flex justify-between items-center w-full">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center border-gray-400">
                  {paymentMethod === "card" && (
                    <div className="w-3 h-3 rounded-full bg-blue-600" />
                  )}
                </div>
                <span className="font-semibold text-[18px] text-gray-900">
                  Credit/Debit Card
                </span>
              </div>
              <img src={CreditLogo} alt="Visa / MasterCard" className="h-[28px]" />
            </div>

            {paymentMethod === "card" && (
              <div className="flex flex-col gap-4 mt-2">
                <input
                  type="text"
                  placeholder="Name on Card"
                  value={nameOnCard}
                  onChange={(e) => setNameOnCard(e.target.value)}
                  className="w-full h-[58px] p-4 border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400"
                />
                <input
                  type="text"
                  placeholder="xxxx xxxx xxxx xxxx"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full h-[58px] p-4 border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400"
                />
                <div className="flex gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-1/2 h-[58px] p-4 border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    className="w-1/2 h-[58px] p-4 border border-gray-200 rounded-lg bg-white text-gray-800 placeholder-gray-400"
                  />
                </div>
              </div>
            )}
          </div>

          <div
            className={`flex justify-between items-center w-full h-[56px] p-4 rounded-lg cursor-pointer ${
              paymentMethod === "paypal"
                ? "border-2 border-blue-600 bg-[#F8FAFC]"
                : "border border-gray-300 bg-[#F8FAFC]"
            }`}
            onClick={() => setPaymentMethod("paypal")}
          >
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center border-gray-400">
                {paymentMethod === "paypal" && (
                  <div className="w-3 h-3 rounded-full bg-blue-600" />
                )}
              </div>
              <span className="font-semibold text-[18px] text-gray-900">
                PayPal
              </span>
            </div>
            <img src={PaypalLogo} alt="Paypal" className="h-[28px]" />
          </div>
        </div>

        {errorMsg && (
          <p className="text-red-500 text-sm font-medium mt-2">{errorMsg}</p>
        )}
      </div>

      <div className="absolute w-[520px] left-[1150px] top-[60px] bg-white shadow rounded-lg p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Order Details
        </h2>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          {cart.map((item) => (
            <p key={item.id} className="text-gray-700 font-medium mb-2">
              {item.name}
            </p>
          ))}
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-gray-800">Price</span>
            <span className="font-semibold">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-800">Tax</span>
            <span className="font-semibold">${tax.toFixed(2)}</span>
          </div>
          <hr className="my-2 border-gray-200" />
          <div className="flex justify-between text-lg font-semibold">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          disabled={loading}
          className={`w-full py-3 rounded-md ${
            loading ? "bg-gray-400" : "bg-black hover:bg-gray-900"
          } text-white transition`}
        >
          {loading ? "Processing..." : "Complete Payment"}
        </button>
      </div>
    </div>
  );
};

export default CheckoutPage;
