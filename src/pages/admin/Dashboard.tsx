import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminLayout";
import CourseStatCard from "../../components/CourseStatCard";
import WalletChart from "../../components/Admin/WalletChart";
import StatisticsCard from "../../components/Admin/StatisticsChart";
import { BookOpen, Users, Layers } from "lucide-react";
import AdminHeader from "../../components/Admin/AdminHeader";
import { getAdminStats } from "../../services/statsService";

const DashboardPage = () => {
  const [stats, setStats] = useState<{
    totalUsers: number;
    totalInstructors: number;
    totalCourses: number;
    totalCategories: number;
    totalWallet: number;
  } | null>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAdminStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch admin stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
          Loading dashboard data...
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <AdminHeader title="Dashboard" breadcrumb={["Dashboard"]} />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8 w-full">
        <CourseStatCard
          title="Users"
          value={stats?.totalUsers || 0}
          icon={<Users className="w-7 h-7 text-[#5879DC]" />}
        />
        <CourseStatCard
          title="Instructors"
          value={stats?.totalInstructors || 0}
          icon={<Users className="w-7 h-7 text-[#5879DC]" />}
        />
        <CourseStatCard
          title="Categories"
          value={stats?.totalCategories || 0}
          icon={<Layers className="w-7 h-7 text-[#5879DC]" />}
        />
        <CourseStatCard
          title="Courses"
          value={stats?.totalCourses || 0}
          icon={<BookOpen className="w-7 h-7 text-[#5879DC]" />}
        />
      </div>

      <div className="px-8 mt-5">
        <div className="flex flex-col lg:flex-row gap-10">
          <WalletChart totalWallet={stats?.totalWallet || 0} />
          <StatisticsCard stats={stats}/>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DashboardPage;
