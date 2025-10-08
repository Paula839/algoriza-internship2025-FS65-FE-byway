import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PurchaseCompletePage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px-200px)] py-80 gap-4">
      <div className="w-[200px] h-[200px] rounded-full bg-green-600 flex items-center justify-center mb-8">
        <Check size={104} className="text-white" strokeWidth={3} />
      </div>

      <div className="flex flex-col items-center gap-6 w-full max-w-[502px]">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-[40px] font-bold leading-[48px] text-center text-gray-900">
            Purchase Complete
          </h1>
          <p className="text-[24px] font-semibold leading-[34px] text-center text-[#595959]">
            You Will Receive a confirmation email soon!
          </p>
        </div>

        <button
          onClick={() => navigate("/")}
          className="flex justify-center items-center px-6 gap-2 w-[277px] h-[50px] bg-[#020617] rounded-lg"
        >
          <span className="text-white text-[16px] font-medium">
            Back to home
          </span>
        </button>
      </div>
    </div>
  );
};

export default PurchaseCompletePage;
