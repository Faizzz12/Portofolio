import { useEffect, useState } from "react";
import {
  getProjects,
  createProject,
  updateProject,
  deleteProject,
} from "../../services/api";

function KelolaProject() {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
    link: "",
  });
  const [editId, setEditId] = useState(null);
  const token = localStorage.getItem("token");

  const fetchProjects = async () => {
    const data = await getProjects();
    setProjects(data);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const resetForm = () => {
    setFormData({ title: "", description: "", image: "", link: "" });
    setEditId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateProject(editId, formData, token);
        alert("Project berhasil diperbarui");
      } else {
        await createProject(formData, token);
        alert("Project berhasil ditambahkan");
      }
      fetchProjects();
      resetForm();
    } catch (err) {
      console.error("Gagal menyimpan project:", err);
      alert("Gagal menyimpan project");
    }
  };

  const handleEdit = (project) => {
    setFormData(project);
    setEditId(project._id);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin ingin menghapus project ini?")) {
      try {
        await deleteProject(id, token);
        alert("Project berhasil dihapus");
        fetchProjects();
      } catch (err) {
        console.error("Gagal menghapus project:", err);
        alert("Gagal menghapus project");
      }
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 text-[#2b1d16]">Kelola Project</h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow mb-8 space-y-4"
      >
        <input
          type="text"
          name="title"
          placeholder="Judul Project"
          value={formData.title}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Deskripsi"
          value={formData.description}
          onChange={handleChange}
          className="w-full p-2 border rounded h-32"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="URL Gambar"
          value={formData.image}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="link"
          placeholder="Link ke project (opsional)"
          value={formData.link}
          onChange={handleChange}
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-4">
          <button
            type="submit"
            className={`px-4 py-2 rounded text-white ${
              editId ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {editId ? "Simpan Perubahan" : "Tambah Project"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 rounded text-white bg-red-600 hover:bg-red-700"
            >
              Batal Edit
            </button>
          )}
        </div>
      </form>

      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project) => (
          <div key={project._id} className="bg-white p-4 rounded shadow">
            <h3 className="text-xl font-semibold text-[#2b1d16]">
              {project.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {project.description}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(project)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(project._id)}
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

export default KelolaProject;
