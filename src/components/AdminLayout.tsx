import type { ReactNode } from "react";
import Sidebar from "./Admin/Sidebar";

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 p-8 overflow-y-auto">{children}</div>
    </div>
  );
};

export default AdminLayout;
