import { useEffect, useState, useCallback } from "react";

interface Brand {
  id: number;
  name: string;
  imageUrl: string;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

export default function BrandPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    status: true,
    imageUrl: "", // Changed from File to string
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  const fetchBrands = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/brand`);
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setBrands(result.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch brands");
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openAddModal = () => {
    setEditingBrand(null);
    setFormData({ name: "", status: true, imageUrl: "" });
    setIsModalOpen(true);
  };

  const openEditModal = (brand: Brand) => {
    setEditingBrand(brand);
    setFormData({
      name: brand.name,
      status: brand.status,
      imageUrl: brand.imageUrl,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      setError("Brand name is required");
      return;
    }

    if (!editingBrand && !formData.imageUrl.trim()) {
      setError("Brand image URL is required");
      return;
    }

    try {
      setLoading(true);
      
      // Send as JSON instead of FormData
      const payload = {
        name: formData.name.trim(),
        status: formData.status,
        imageUrl: formData.imageUrl.trim(),
      };

      const url = editingBrand
        ? `${API_BASE_URL}/brand/${editingBrand.id}`
        : `${API_BASE_URL}/brand`;
      const method = editingBrand ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error();

      await fetchBrands();
      setIsModalOpen(false);
      setFormData({ name: "", status: true, imageUrl: "" });
    } catch (err) {
      setError(`Failed to ${editingBrand ? "update" : "add"} brand`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;
    
    try {
      setDeletingId(id);
      const response = await fetch(`${API_BASE_URL}/brand/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error();
      await fetchBrands();
    } catch (err) {
      setError("Failed to delete brand");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (brand: Brand) => {
    try {
      const payload = {
        name: brand.name,
        status: !brand.status,
        imageUrl: brand.imageUrl,
      };
      
      await fetch(`${API_BASE_URL}/brand/${brand.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
      await fetchBrands();
    } catch (err) {
      setError("Failed to update status");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Brand Management</h1>
          <button
            onClick={openAddModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Brand
          </button>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800">{error}</p>
            <button onClick={() => setError(null)} className="text-sm text-red-600 mt-1">
              Dismiss
            </button>
          </div>
        )}

        {/* Loading & Content */}
        {loading && brands.length === 0 ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b">
                  <th className="text-left p-3">ID</th>
                  <th className="text-left p-3">Logo</th>
                  <th className="text-left p-3">Name</th>
                  <th className="text-left p-3">Status</th>
                  <th className="text-left p-3">Created</th>
                  <th className="text-left p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {brands.map((brand) => (
                  <tr key={brand.id} className="border-b hover:bg-gray-50">
                    <td className="p-3">#{brand.id}</td>
                    <td className="p-3">
                      <img
                        src={`${API_BASE_URL}/uploads/${brand.imageUrl}`}
                        alt={brand.name}
                        className="w-10 h-10 rounded object-cover"
                        onError={(e) => ((e.target as HTMLImageElement).src = "/placeholder.jpg")}
                      />
                    </td>
                    <td className="p-3 font-medium">{brand.name}</td>
                    <td className="p-3">
                      <button
                        onClick={() => handleToggleStatus(brand)}
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          brand.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {brand.status ? "Active" : "Inactive"}
                      </button>
                    </td>
                    <td className="p-3 text-sm">
                      {new Date(brand.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-3">
                      <div className="flex gap-2">
                        <button onClick={() => openEditModal(brand)} className="text-blue-600 hover:bg-blue-50 p-1 rounded">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                          </svg>
                        </button>
                        <button onClick={() => handleDelete(brand.id)} disabled={deletingId === brand.id} className="text-red-600 hover:bg-red-50 p-1 rounded disabled:opacity-50">
                          {deletingId === brand.id ? (
                            <div className="animate-spin rounded-full w-5 h-5 border-2 border-red-600 border-t-transparent"></div>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {brands.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No brands found</p>
                <button onClick={openAddModal} className="mt-2 text-indigo-600">
                  Add your first brand →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">
              {editingBrand ? "Edit Brand" : "Add Brand"}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Brand Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter brand name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Image URL {!editingBrand && "*"}
                  </label>
                  <input
                    type="text"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter image filename (e.g., samsung.png)"
                    required={!editingBrand}
                  />
                  <p className="mt-1 text-xs text-gray-500">
                    Example: brand-logo.png
                  </p>
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <img
                        src={`${API_BASE_URL}/uploads/${formData.imageUrl}`}
                        alt="Preview"
                        className="w-16 h-16 rounded object-cover"
                        onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
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
                    />
                    <span>Active</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button type="submit" disabled={loading} className="flex-1 bg-indigo-600 text-white py-2 rounded-lg disabled:opacity-50">
                  {loading ? "Saving..." : editingBrand ? "Update" : "Add"}
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 bg-gray-200 py-2 rounded-lg">
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