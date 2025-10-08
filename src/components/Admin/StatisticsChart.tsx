import { PieChart, Pie, Cell } from "recharts";

type StatsData = {
  totalUsers: number;
  totalInstructors: number;
  totalCourses: number;
  totalCategories: number;
  totalWallet: number;
};

type StatisticsCardProps = {
  stats: StatsData | null;
};

const COLORS = ["#4318FF", "#6AD2FF", "#05CD99", "#EFF4FB"];

const StatisticsCard = ({ stats }: StatisticsCardProps) => {
  if (!stats)
    return (
      <div className="w-[520px] h-[400px] bg-white border border-[#F1F3F9] shadow-md rounded-2xl flex items-center justify-center text-gray-500">
        Loading statistics...
      </div>
    );

  const totalSum =
    stats.totalUsers +
    stats.totalInstructors +
    stats.totalCategories +
    stats.totalCourses;

  const data = [
    { name: "Users", value: stats.totalUsers, color: COLORS[0] },
    { name: "Instructors", value: stats.totalInstructors, color: COLORS[1] },
    { name: "Categories", value: stats.totalCategories, color: COLORS[2] },
    { name: "Courses", value: stats.totalCourses, color: COLORS[3] },
  ];


  return (
    <div className="w-[550px] h-[400px] bg-white border border-[#F1F3F9] shadow-md shadow-black/10 rounded-2xl p-6 flex flex-col justify-between">
      <div className="flex items-center justify-between w-full -mt-5">
        <h2 className="text-[22px] font-medium text-[#202637]">Statistics</h2>
      </div>

      <div className="flex justify-center">
        <PieChart width={280} height={280}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={110}
            dataKey="value"
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </div>

      <div className="flex justify-between items-center w-[460px] h-[90px] mx-auto bg-white shadow-[0px_18px_40px_rgba(112,144,176,0.12)] rounded-[15px] px-6 py-4">
        {data.map((entry, index) => {
          const percentage = ((entry.value / totalSum) * 100).toFixed(0);
          return (
            <div
              key={index}
              className="flex flex-col items-center justify-center flex-1"
            >
              <div className="flex items-center gap-2">
                <span
                  className="w-3.5 h-3.5 rounded-full"
                  style={{ backgroundColor: entry.color }}
                />
                <p className="text-sm text-[#96A0B6]">{entry.name}</p>
              </div>
              <p className="text-xl font-bold text-[#202637]">{percentage}%</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatisticsCard;
