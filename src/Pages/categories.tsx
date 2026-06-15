import { useEffect, useState, useCallback } from "react";
import {
  PencilIcon,
  TrashIcon,
  PlusIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

interface Category {
  id: number;
  name: string;
  imageUrl: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    status: true,
    imageUrl: "", // Changed from File to string
  });

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:3000/category");
      const data = await res.json();
      setCategories(data.data || []);
      setError("");
    } catch {
      setError("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({ name: "", status: true, imageUrl: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      status: category.status,
      imageUrl: category.imageUrl,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Send as JSON instead of FormData
      const payload = {
        name: formData.name,
        status: formData.status,
        imageUrl: formData.imageUrl, // Send as string
      };

      const url = editingCategory
        ? `http://localhost:3000/category/${editingCategory.id}`
        : "http://localhost:3000/category/add";
      const method = editingCategory ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to save");
      }

      await fetchCategories();
      setIsModalOpen(false);
    } catch (err: any) {
      setError(err.message || "Failed to save category");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category?")) return;

    try {
      setDeletingId(id);
      const response = await fetch(`http://localhost:3000/category/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error();
      await fetchCategories();
    } catch {
      setError("Failed to delete category");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Category Management
            </h1>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              <PlusIcon className="w-5 h-5" />
              Add Category
            </button>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-600 mt-0.5" />
              <p className="flex-1 text-red-800">{error}</p>
              <button
                onClick={() => setError("")}
                className="text-red-600 hover:text-red-800"
              >
                ×
              </button>
            </div>
          )}

          {/* Loading & Table */}
          {loading && categories.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
              <p className="text-gray-600">Loading categories...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="text-left p-3 font-semibold text-gray-700">
                      ID
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700">
                      Image
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700">
                      Name
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700">
                      Status
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700">
                      Created At
                    </th>
                    <th className="text-left p-3 font-semibold text-gray-700">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr
                      key={category.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="p-3 text-gray-700">{category.id}</td>
                      <td className="p-3">
                        <img
                          src={`http://localhost:3000/uploads/${category.imageUrl}`}
                          alt={category.name}
                          className="w-12 h-12 rounded-lg object-cover"
                          onError={(e) =>
                            ((e.target as HTMLImageElement).src =
                              "/placeholder-image.jpg")
                          }
                        />
                      </td>
                      <td className="p-3 font-medium text-gray-900 capitalize">
                        {category.name}
                      </td>
                      <td className="p-3">
                        <span
                          className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                            category.status
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {category.status ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-3 text-gray-600">
                        {new Date(category.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          },
                        )}
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(category)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          >
                            <PencilIcon className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(category.id)}
                            disabled={deletingId === category.id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg disabled:opacity-50"
                          >
                            {deletingId === category.id ? (
                              <div className="animate-spin rounded-full w-4 h-4 border-2 border-red-600 border-t-transparent"></div>
                            ) : (
                              <TrashIcon className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {categories.length === 0 && !loading && (
                <div className="text-center py-12">
                  <p className="text-gray-500">No categories found</p>
                  <button
                    onClick={openAddModal}
                    className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium"
                  >
                    Create your first category →
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingCategory ? "Edit Category" : "Add New Category"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter category name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL {!editingCategory && "*"}
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter image filename (e.g., electronics.png)"
                    required={!editingCategory}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Example: category-image.png
                  </p>
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <img
                        src={`http://localhost:3000/uploads/${formData.imageUrl}`}
                        alt="Preview"
                        className="w-20 h-20 rounded-lg object-cover"
                        onError={(e) =>
                          ((e.target as HTMLImageElement).style.display =
                            "none")
                        }
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="status"
                      checked={formData.status}
                      onChange={handleInputChange}
                      className="rounded border-gray-300 text-indigo-600"
                    />
                    <span className="text-sm font-medium text-gray-700">
                      Active
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg disabled:opacity-50"
                >
                  {loading
                    ? "Saving..."
                    : editingCategory
                      ? "Update Category"
                      : "Add Category"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
