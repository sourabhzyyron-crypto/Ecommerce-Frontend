import { useState } from "react";
import {
  LayoutDashboard,
  ChevronDown,
  ChevronRight,
  FolderTree,
  Tag,
  Package,
  ShoppingBag,
  Users,
  Settings,
} from "lucide-react";

export default function Sidebar() {
  const [masterOpen, setMasterOpen] = useState(false);

  return (
    <aside className="w-64 min-h-screen bg-white border-r">
      <div className="p-5 border-b">
        <h1 className="text-xl font-bold text-indigo-600">Admin Panel</h1>
      </div>

      <nav className="p-4 space-y-2">
        {/* Dashboard */}
        <a
          href="/dashboard"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
        >
          <LayoutDashboard size={18} />
          Dashboard
        </a>

        {/* Master Dropdown */}
        <button
          onClick={() => setMasterOpen(!masterOpen)}
          className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-100"
        >
          <div className="flex items-center gap-3">
            <FolderTree size={18} />
            Master
          </div>

          {masterOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </button>

        {masterOpen && (
          <div className="ml-6 space-y-1">
            <a
              href="/CategoryManagement"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
            >
              <Tag size={16} />
              Category
            </a>

            <a
              href="/brands"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
            >
              <Tag size={16} />
              Brand
            </a>

            <a
              href="/attributes"
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-100"
            >
              <Tag size={16} />
              Attribute
            </a>
          </div>
        )}

        {/* Products */}
        <a
          href="/manageProducts"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
        >
          <Package size={18} />
          Products
        </a>

        {/* Orders */}
        <a
          href="/orders"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
        >
          <ShoppingBag size={18} />
          Orders
        </a>

        {/* Users */}
        <a
          href="/users"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
        >
          <Users size={18} />
          Users
        </a>

        {/* Settings */}
        <a
          href="/settings"
          className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100"
        >
          <Settings size={18} />
          Settings
        </a>
      </nav>
    </aside>
  );
}
