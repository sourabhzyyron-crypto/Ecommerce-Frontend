import React, { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ShoppingBag,
  BarChart3,
  Settings,
  Bell,
  Search,
  ArrowUpRight,
  ArrowDownRight,
  Menu,
  X,
} from "lucide-react";

// --- TypeScript Interfaces ---
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
}

interface Order {
  id: string;
  customer: string;
  product: string;
  amount: string;
  status: "Processing" | "Shipped" | "Delivered" | "Cancelled";
  date: string;
}

// --- Mock Data ---
const recentOrders: Order[] = [
  {
    id: "#ORD-0012",
    customer: "Oliver Bennett",
    product: 'MacBook Pro 14"',
    amount: "$2,499.00",
    status: "Delivered",
    date: "Oct 24, 2026",
  },
  {
    id: "#ORD-0011",
    customer: "Sophia Garcia",
    product: "iPhone 15 Pro",
    amount: "$999.00",
    status: "Shipped",
    date: "Oct 24, 2026",
  },
  {
    id: "#ORD-0010",
    customer: "Liam Johnson",
    product: "iPad Air",
    amount: "$599.00",
    status: "Processing",
    date: "Oct 23, 2026",
  },
  {
    id: "#ORD-0009",
    customer: "Emma Wilson",
    product: "AirPods Max",
    amount: "$549.00",
    status: "Cancelled",
    date: "Oct 22, 2026",
  },
];

// --- Sub-Components ---
const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive,
  icon,
}) => (
  <div className="p-6 bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col justify-between">
    <div className="flex items-center justify-between">
      <span className="text-sm font-medium text-gray-500">{title}</span>
      <div className="p-2 bg-gray-50 rounded-lg text-gray-600">{icon}</div>
    </div>
    <div className="mt-4">
      <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
      <p className="mt-1 text-sm flex items-center gap-1">
        <span
          className={`flex items-center font-medium ${isPositive ? "text-emerald-600" : "text-rose-600"}`}
        >
          {isPositive ? (
            <ArrowUpRight size={16} />
          ) : (
            <ArrowDownRight size={16} />
          )}
          {change}
        </span>
        <span className="text-gray-400">vs last month</span>
      </p>
    </div>
  </div>
);

// --- Main Dashboard Component ---
const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-50 flex font-sans antialiased text-gray-900">
      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600/50 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 px-4 py-6 flex flex-col justify-between
        transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div>
          {/* Logo */}
          <div className="flex items-center justify-between px-2 mb-8">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-indigo-600">
              <div className="h-8 w-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-black text-sm">
                N
              </div>
              NexusAdmin
            </div>
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 bg-indigo-50 text-indigo-600 font-medium rounded-lg text-sm transition-colors"
            >
              <LayoutDashboard size={18} /> Dashboard
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-lg text-sm transition-colors"
            >
              <Users size={18} /> Customers
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-lg text-sm transition-colors"
            >
              <ShoppingBag size={18} /> Products
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-lg text-sm transition-colors"
            >
              <BarChart3 size={18} /> Analytics
            </a>
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="border-t border-gray-100 pt-4">
          <a
            href="#"
            className="flex items-center gap-3 px-3 py-2.5 text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium rounded-lg text-sm transition-colors"
          >
            <Settings size={18} /> Settings
          </a>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-y-auto">
        {/* Top Navbar */}
        <header className="bg-white border-b border-gray-200 h-16 flex items-center justify-between px-4 lg:px-8 shrink-0 sticky top-0 z-30">
          <div className="flex items-center gap-4 flex-1">
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={22} />
            </button>

            {/* Global Search */}
            <div className="relative w-full max-w-md hidden sm:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search everything..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative rounded-full hover:bg-gray-50">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 h-2 w-2 bg-indigo-600 rounded-full"></span>
            </button>

            <hr className="w-px h-6 bg-gray-200" />

            {/* User Profile */}
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80"
                alt="Avatar"
                className="h-9 w-9 rounded-full object-cover ring-2 ring-gray-100"
              />
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-700 leading-none">
                  Sarah Jenkins
                </p>
                <p className="text-xs text-gray-400 mt-1">Administrator</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Main Grid */}
        <main className="p-4 lg:p-8 space-y-6 max-w-[1600px] w-full mx-auto">
          {/* Header Title */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              Overview
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Here is what's happening with your store today.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              title="Total Revenue"
              value="$48,259.50"
              change="12.5%"
              isPositive={true}
              icon={<BarChart3 size={20} />}
            />
            <StatCard
              title="Active Subscriptions"
              value="1,248"
              change="8.2%"
              isPositive={true}
              icon={<Users size={20} />}
            />
            <StatCard
              title="Sales"
              value="+342"
              change="4.3%"
              isPositive={false}
              icon={<ShoppingBag size={20} />}
            />
            <StatCard
              title="Pending Review"
              value="12"
              change="0.0%"
              isPositive={true}
              icon={<LayoutDashboard size={20} />}
            />
          </div>

          {/* Recent Orders Section */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-gray-900">
                  Recent Transactions
                </h2>
                <p className="text-sm text-gray-400 mt-0.5">
                  A list of the latest orders placed by your users.
                </p>
              </div>
              <button className="text-xs font-semibold text-indigo-600 hover:text-indigo-700 bg-indigo-50 hover:bg-indigo-100/80 px-3 py-2 rounded-lg transition-colors">
                View All
              </button>
            </div>

            {/* Responsive Table wrapper */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/75 text-gray-500 text-xs uppercase font-semibold border-b border-gray-100">
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Product</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {order.id}
                      </td>
                      <td className="px-6 py-4">{order.customer}</td>
                      <td className="px-6 py-4">{order.product}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {order.amount}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium
                          ${order.status === "Delivered" && "bg-emerald-50 text-emerald-700"}
                          ${order.status === "Shipped" && "bg-blue-50 text-blue-700"}
                          ${order.status === "Processing" && "bg-amber-50 text-amber-700"}
                          ${order.status === "Cancelled" && "bg-rose-50 text-rose-700"}
                        `}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-gray-400">
                        {order.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
