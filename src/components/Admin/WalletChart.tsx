import { Calendar, TrendingUp, Check } from "lucide-react";

interface WalletChartProps {
  totalWallet: number;
}

const WalletChart = ({ totalWallet }: WalletChartProps) => {
  return (
    <div className="w-[950px] h-[400px] flex flex-col items-start p-8 gap-8 bg-white border border-[#F1F3F9] shadow-[0_4px_15px_rgba(0,0,0,0.08)] rounded-[20px]">
      {/* Header */}
      <div className="w-full flex flex-row justify-between items-center">
        <span className="text-[22px] font-medium text-[#202637]">Wallet</span>
        <button className="relative w-[140px] h-[40px] bg-[#F4F7FE] rounded-[7px] flex items-center pl-10 text-[#A3AED0] text-[14px] font-medium">
          <Calendar className="absolute left-3 w-[18px] h-[18px] text-[#A3AED0]" />
          This month
        </button>
      </div>

      <div className="relative w-full flex justify-between items-center">
        <div className="flex flex-col gap-6">
          <div>
            <div className="text-[38px] font-bold text-[#2B3674]">
              ${totalWallet.toFixed(2)}
            </div>
            <div className="flex items-center gap-2 text-[14px] text-[#A3AED0]">
              Wallet Balance
              <div className="flex items-center gap-1 text-[#05CD99] font-bold text-[12px]">
                <TrendingUp className="w-5 h-5" /> +2.45%
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 text-[#05CD99] font-bold text-[16px]">
            <div className="w-4 h-4 bg-[#05CD99] rounded-full flex items-center justify-center">
              <Check className="w-3 h-3 text-white stroke-[3]" />
            </div>
            On your account
          </div>
        </div>

        <div className="flex flex-col items-center">
          <svg className="w-[460px] h-[160px]" viewBox="0 0 460 160">
            <path
              d="M0 45 Q80 35, 160 42 Q240 50, 320 38 Q400 28, 460 45"
              stroke="#4318FF"
              strokeWidth="4"
              fill="none"
            />
            <path
              d="M0 95 Q80 105, 160 88 Q240 75, 320 85 Q400 95, 460 92"
              stroke="#6AD2FF"
              strokeWidth="4"
              fill="none"
            />
          </svg>
          <div className="flex justify-between w-full text-[12px] text-[#A3AED0] mt-2">
            {["SEP", "OCT", "NOV", "DEC", "JAN", "FEB"].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex gap-6 text-[14px] text-[#626C83] mt-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#4318FF] rounded-full" /> Deposits
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-[#6AD2FF] rounded-full" /> Withdrawals
        </div>
      </div>
    </div>
  );
};

export default WalletChart;
