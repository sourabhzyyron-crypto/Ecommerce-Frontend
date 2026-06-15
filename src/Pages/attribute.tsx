import { useEffect, useState, useCallback } from "react";

interface Attribute {
  id: number;
  categoryId: number;
  name: string;
  value: string;
  price: number;
  offerPrice: number;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
}

export default function AttributePage() {
  const [attributes, setAttributes] = useState<Attribute[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAttribute, setEditingAttribute] = useState<Attribute | null>(
    null,
  );
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    categoryId: "",
    name: "",
    value: "",
    price: "",
    offerPrice: "",
    status: true,
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const fetchAttributes = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/attribute`);
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setAttributes(result.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch attributes");
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/category`);
      const result = await response.json();
      setCategories(result.data || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchAttributes();
    fetchCategories();
  }, [fetchAttributes, fetchCategories]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const openAddModal = () => {
    setEditingAttribute(null);
    setFormData({
      categoryId: "",
      name: "",
      value: "",
      price: "",
      offerPrice: "",
      status: true,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (attribute: Attribute) => {
    setEditingAttribute(attribute);
    setFormData({
      categoryId: attribute.categoryId.toString(),
      name: attribute.name,
      value: attribute.value,
      price: attribute.price.toString(),
      offerPrice: attribute.offerPrice.toString(),
      status: attribute.status,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.categoryId ||
      !formData.name.trim() ||
      !formData.value.trim() ||
      !formData.price
    ) {
      setError("Please fill all required fields");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        categoryId: parseInt(formData.categoryId),
        name: formData.name.trim(),
        value: formData.value.trim(),
        price: parseFloat(formData.price),
        offerPrice: formData.offerPrice
          ? parseFloat(formData.offerPrice)
          : null,
        status: formData.status,
      };

      const url = editingAttribute
        ? `${API_BASE_URL}/attribute/${editingAttribute.id}`
        : `${API_BASE_URL}/attribute`;
      const method = editingAttribute ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error();

      await fetchAttributes();
      setIsModalOpen(false);
      setError(null);
    } catch (err) {
      setError(`Failed to ${editingAttribute ? "update" : "add"} attribute`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    console.log("Deleting attribute with ID:", id);

    try {
      setDeletingId(id);
      const response = await fetch(`${API_BASE_URL}/attribute/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error();
      await fetchAttributes();
    } catch (err) {
      setError("Failed to delete attribute");
    } finally {
      setDeletingId(null);
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const getDiscount = (price: number, offerPrice: number) => {
    if (!offerPrice || offerPrice >= price) return null;
    return Math.round(((price - offerPrice) / price) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Attributes Management
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Manage product specifications
            </p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Attribute
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex justify-between">
            <p className="text-red-800">{error}</p>
            <button onClick={() => setError(null)} className="text-red-600">
              ×
            </button>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600">Total</p>
            <p className="text-2xl font-bold text-blue-900">
              {attributes.length}
            </p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600">Active</p>
            <p className="text-2xl font-bold text-green-900">
              {attributes.filter((a) => a.status).length}
            </p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-sm text-yellow-600">On Offer</p>
            <p className="text-2xl font-bold text-yellow-900">
              {
                attributes.filter((a) => a.offerPrice && a.offerPrice < a.price)
                  .length
              }
            </p>
          </div>
        </div>

        {/* Loading & Table */}
        {loading && attributes.length === 0 ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">Category</th>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Value</th>
                  <th className="text-left p-3">Price</th>
                  <th className="text-left p-3">Offer</th>
                  <th className="text-left p-3">Discount</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {attributes.map((attr) => {
                  const category = categories.find(
                    (c) => c.id === attr.categoryId,
                  );
                  const discount = getDiscount(attr.price, attr.offerPrice);
                  return (
                    <tr key={attr.id} className="border-b hover:bg-gray-50">
                      <td className="p-3">#{attr.id}</td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                          {category?.name || `ID: ${attr.categoryId}`}
                        </span>
                      </td>
                      <td className="p-3 font-medium">{attr.name}</td>
                      <td className="p-3 text-sm max-w-xs truncate">
                        {attr.value}
                      </td>
                      <td className="p-3 font-semibold">
                        {formatPrice(attr.price)}
                      </td>
                      <td className="p-3">
                        {attr.offerPrice ? formatPrice(attr.offerPrice) : "-"}
                      </td>
                      <td className="p-3">
                        {discount && (
                          <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                            {discount}% OFF
                          </span>
                        )}
                      </td>
                      <td className="p-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${attr.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}
                        >
                          {attr.status ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(attr)}
                            className="text-blue-600 hover:bg-blue-50 p-1 rounded"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(attr.id)}
                            disabled={deletingId === attr.id}
                            className="text-red-600 hover:bg-red-50 p-1 rounded disabled:opacity-50"
                          >
                            {deletingId === attr.id ? (
                              <div className="animate-spin rounded-full w-5 h-5 border-2 border-red-600 border-t-transparent"></div>
                            ) : (
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {attributes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No attributes found</p>
                <button onClick={openAddModal} className="mt-2 text-indigo-600">
                  Add your first attribute →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {editingAttribute ? "Edit Attribute" : "Add Attribute"}
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    name="categoryId"
                    value={formData.categoryId}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    required
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Attribute Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="e.g., Storage, Color"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Value *
                  </label>
                  <textarea
                    name="value"
                    value={formData.value}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="e.g., 256GB, Black"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="79999"
                    min="0"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Offer Price (₹)
                  </label>
                  <input
                    type="number"
                    name="offerPrice"
                    value={formData.offerPrice}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg"
                    placeholder="74999"
                    min="0"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="status"
                      checked={formData.status}
                      onChange={handleInputChange}
                    />
                    <span>Active</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-indigo-600 text-white py-2 rounded-lg disabled:opacity-50"
                >
                  {loading ? "Saving..." : editingAttribute ? "Update" : "Add"}
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-200 py-2 rounded-lg"
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
