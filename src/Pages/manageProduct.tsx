import { useEffect, useState, useCallback } from "react";

interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  sku: string;
  price: number;
  offerPrice: number | null;
  imageUrl: string;
  categoryId: number;
  brandId: number | null;
  status: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
}

interface Brand {
  id: number;
  name: string;
}

export default function ManageProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    sku: "",
    price: "",
    offerPrice: "",
    imageUrl: "",
    categoryId: "",
    brandId: "",
    status: true,
  });

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

  // Fetch all products
  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/product`);
      if (!response.ok) throw new Error("Failed to fetch");
      const result = await response.json();
      setProducts(result.data || []);
      setError(null);
    } catch (err) {
      setError("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  }, [API_BASE_URL]);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/category`);
      const result = await response.json();
      setCategories(result.data || []);
    } catch (err) {
      console.error("Error fetching categories");
    }
  };

  // Fetch brands
  const fetchBrands = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/brand`);
      const result = await response.json();
      setBrands(result.data || []);
    } catch (err) {
      console.error("Error fetching brands");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  // Open add modal
  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      slug: "",
      description: "",
      sku: "",
      price: "",
      offerPrice: "",
      imageUrl: "",
      categoryId: "",
      brandId: "",
      status: true,
    });
    setIsModalOpen(true);
  };

  // Open edit modal
  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      description: product.description || "",
      sku: product.sku,
      price: product.price.toString(),
      offerPrice: product.offerPrice?.toString() || "",
      imageUrl: product.imageUrl || "",
      categoryId: product.categoryId.toString(),
      brandId: product.brandId?.toString() || "",
      status: product.status,
    });
    setIsModalOpen(true);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name || !formData.slug || !formData.sku || !formData.price || !formData.categoryId) {
      setError("Please fill all required fields (*)");
      return;
    }

    // Validate offer price is less than regular price
    if (formData.offerPrice && parseFloat(formData.offerPrice) >= parseFloat(formData.price)) {
      setError("Offer price must be less than regular price");
      return;
    }

    try {
      setLoading(true);
      const payload = {
        name: formData.name,
        slug: formData.slug.toLowerCase().replace(/\s+/g, '-'),
        description: formData.description,
        sku: formData.sku.toUpperCase(),
        price: parseFloat(formData.price),
        offerPrice: formData.offerPrice ? parseFloat(formData.offerPrice) : null,
        imageUrl: formData.imageUrl,
        categoryId: parseInt(formData.categoryId),
        brandId: formData.brandId ? parseInt(formData.brandId) : null,
        status: formData.status,
      };

      console.log("Sending payload:", payload);

      const url = editingProduct
        ? `${API_BASE_URL}/product/${editingProduct.id}`
        : `${API_BASE_URL}/product`;
      const method = editingProduct ? "PATCH" : "POST";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || `Failed to ${editingProduct ? "update" : "add"} product`);
      }

      await fetchProducts();
      setIsModalOpen(false);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      console.error("Submit error:", err);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      setDeletingId(id);
      const response = await fetch(`${API_BASE_URL}/product/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete");
      await fetchProducts();
    } catch (err) {
      setError("Failed to delete product");
    } finally {
      setDeletingId(null);
    }
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Calculate discount percentage
  const getDiscount = (price: number, offerPrice: number | null) => {
    if (!offerPrice || offerPrice >= price) return null;
    return Math.round(((price - offerPrice) / price) * 100);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Product Management</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your products</p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex justify-between items-center">
            <p className="text-red-800">{error}</p>
            <button onClick={() => setError(null)} className="text-red-600 hover:text-red-800">
              ×
            </button>
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-medium">Total Products</p>
            <p className="text-2xl font-bold text-blue-900">{products.length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600 font-medium">Active Products</p>
            <p className="text-2xl font-bold text-green-900">{products.filter(p => p.status).length}</p>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-sm text-yellow-600 font-medium">On Offer</p>
            <p className="text-2xl font-bold text-yellow-900">
              {products.filter(p => p.offerPrice && p.offerPrice < p.price).length}
            </p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-600 font-medium">Categories</p>
            <p className="text-2xl font-bold text-purple-900">{categories.length}</p>
          </div>
        </div>

        {/* Loading & Table */}
        {loading && products.length === 0 ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left p-3 font-semibold text-gray-700">ID</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Image</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Name/SKU</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Category</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Price</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Offer</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Discount</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Status</th>
                  <th className="text-left p-3 font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const category = categories.find(c => c.id === product.categoryId);
                  const discount = getDiscount(product.price, product.offerPrice);
                  return (
                    <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                      <td className="p-3 text-gray-700">#{product.id}</td>
                      <td className="p-3">
                        {product.imageUrl ? (
                          <img
                            src={`${API_BASE_URL}/uploads/${product.imageUrl}`}
                            alt={product.name}
                            className="w-10 h-10 rounded object-cover"
                            onError={(e) => ((e.target as HTMLImageElement).src = "/placeholder.jpg")}
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-500">No img</span>
                          </div>
                        )}
                      </td>
                      <td className="p-3">
                        <div className="font-medium text-gray-900">{product.name}</div>
                        <div className="text-xs text-gray-500">SKU: {product.sku}</div>
                        <div className="text-xs text-gray-400 truncate max-w-xs">{product.description}</div>
                      </td>
                      <td className="p-3">
                        <span className="px-2 py-1 bg-gray-100 rounded-md text-xs font-medium text-gray-700">
                          {category?.name || `ID: ${product.categoryId}`}
                        </span>
                      </td>
                      <td className="p-3 font-semibold text-gray-900">{formatPrice(product.price)}</td>
                      <td className="p-3">
                        {product.offerPrice ? (
                          <span className="text-green-600 font-medium">{formatPrice(product.offerPrice)}</span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-3">
                        {discount ? (
                          <span className="inline-flex px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            {discount}% OFF
                          </span>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </td>
                      <td className="p-3">
                        <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                          product.status ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}>
                          {product.status ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => openEditModal(product)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Product"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
                            disabled={deletingId === product.id}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                            title="Delete Product"
                          >
                            {deletingId === product.id ? (
                              <div className="animate-spin rounded-full w-4 h-4 border-2 border-red-600 border-t-transparent"></div>
                            ) : (
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
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

            {products.length === 0 && !loading && (
              <div className="text-center py-12">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                </svg>
                <p className="mt-2 text-gray-500">No products found</p>
                <button onClick={openAddModal} className="mt-4 text-indigo-600 hover:text-indigo-700 font-medium">
                  Add your first product →
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add/Edit Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold">
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  {/* Row 1: Name and Slug */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Product Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="iPhone 15 Pro Max"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slug *
                      </label>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="iphone-15-pro-max"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">URL-friendly name (unique)</p>
                    </div>
                  </div>

                  {/* Row 2: SKU and Price */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SKU *
                      </label>
                      <input
                        type="text"
                        name="sku"
                        value={formData.sku}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="IP15PM-BLK-256"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-1">Unique product code</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Price (₹) *
                      </label>
                      <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="159900"
                        min="0"
                        required
                      />
                    </div>
                  </div>

                  {/* Row 3: Offer Price and Image URL */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Offer Price (₹)
                      </label>
                      <input
                        type="number"
                        name="offerPrice"
                        value={formData.offerPrice}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="149900"
                        min="0"
                      />
                      <p className="text-xs text-gray-500 mt-1">Optional - must be less than price</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Image URL
                      </label>
                      <input
                        type="text"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                        placeholder="iphone-15-pro-max-black.png"
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      placeholder="The latest iPhone with A17 Pro chip, titanium design, and advanced camera system..."
                    />
                  </div>

                  {/* Row 4: Category and Brand */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Category *
                      </label>
                      <select
                        name="categoryId"
                        value={formData.categoryId}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
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
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Brand
                      </label>
                      <select
                        name="brandId"
                        value={formData.brandId}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                      >
                        <option value="">Select brand</option>
                        {brands.map((brand) => (
                          <option key={brand.id} value={brand.id}>
                            {brand.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Image Preview */}
                  {formData.imageUrl && (
                    <div className="mt-2">
                      <img
                        src={`${API_BASE_URL}/uploads/${formData.imageUrl}`}
                        alt="Preview"
                        className="w-20 h-20 rounded-lg object-cover border border-gray-200"
                        onError={(e) => ((e.target as HTMLImageElement).style.display = "none")}
                      />
                    </div>
                  )}

                  {/* Status */}
                  <div>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="status"
                        checked={formData.status}
                        onChange={handleInputChange}
                        className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Active</span>
                    </label>
                  </div>
                </div>

                {/* Form Buttons */}
                <div className="flex gap-3 mt-6">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loading ? "Saving..." : editingProduct ? "Update Product" : "Add Product"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}