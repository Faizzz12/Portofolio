import { useEffect, useState } from "react";
import {
  getArticlesWithAuth,
  createArticle,
  updateArticle,
  deleteArticle,
} from "../../services/api";

function KelolaArtikel() {
  const [articles, setArticles] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    coverImage: "",
    tags: "",
  });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchArticles = async () => {
    const data = await getArticlesWithAuth();
    setArticles(data);
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({ title: "", content: "", coverImage: "", tags: "" });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };

    try {
      if (editId) {
        await updateArticle(editId, data, token);
        alert("Artikel berhasil diperbarui");
      } else {
        await createArticle(data, token);
        alert("Artikel berhasil ditambahkan");
      }
      fetchArticles();
      resetForm();
    } catch (err) {
      console.error(alert("Gagal menyimpan artikel"), err);
    }
  };

  const handleEdit = (article) => {
    setFormData({
      title: article.title,
      content: article.content,
      coverImage: article.coverImage,
      tags: article.tags.join(", "),
    });
    setEditId(article._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus artikel ini?")) {
      try {
        await deleteArticle(id, token);
        alert("Artikel berhasil dihapus");
        fetchArticles();
      } catch (err) {
        console.error(alert("Gagal menghapus artikel"), err);
      }
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-[#2b1d16]">Kelola Artikel</h2>

      {/* Form Tambah/Edit */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-8 space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Judul"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="content"
          placeholder="Konten"
          value={formData.content}
          onChange={handleChange}
          className="w-full p-2 border rounded h-32"
          required
        />
        <input
          type="text"
          name="coverImage"
          placeholder="URL Cover Gambar"
          value={formData.coverImage}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="tags"
          placeholder="Tag (pisahkan dengan koma)"
          value={formData.tags}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className={`px-4 py-2 rounded text-white ${
            editId ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editId ? "Simpan Perubahan" : "Tambah Artikel"}
        </button>
        {editId && (
          <button
            type="button"
            onClick={resetForm}
            className={`px-4 py-2 ml-4 rounded text-white ${
              editId ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            Batal Edit
          </button>
        )}
      </form>

      {/* Daftar Artikel */}
      <div className="grid md:grid-cols-2 gap-6">
        {articles.map((article) => (
          <div key={article._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold text-[#2b1d16]">
              {article.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {article.content}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(article)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(article._id)}
                className="text-red-600 hover:underline"
              >
                Hapus
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KelolaArtikel;
