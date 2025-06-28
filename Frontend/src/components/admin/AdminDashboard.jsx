import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import KelolaArtikel from "./KelolaArtikel";
import KelolaProjects from "./KelolaProjects";
import KelolaProfile from "./KelolaProfile";

function AdminDashboard() {
  const navigate = useNavigate();
  const [menu, setMenu] = useState("artikel");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-[#2b1d16] text-white p-6 space-y-4">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>
        <button
          className={`block w-full text-left py-2 px-3 rounded hover:bg-[#3e2b20] ${
            menu === "artikel" ? "bg-[#3e2b20]" : ""
          }`}
          onClick={() => setMenu("artikel")}
        >
          Kelola Artikel
        </button>
        <button
          className={`block w-full text-left py-2 px-3 rounded hover:bg-[#3e2b20] ${
            menu === "project" ? "bg-[#3e2b20]" : ""
          }`}
          onClick={() => setMenu("project")}
        >
          Kelola Project
        </button>
        <button
          className={`block w-full text-left py-2 px-3 rounded hover:bg-[#3e2b20] ${
            menu === "profil" ? "bg-[#3e2b20]" : ""
          }`}
          onClick={() => setMenu("profile")}
        >
          Kelola Profile
        </button>
      </aside>

      {/* Konten Utama */}
      <main className="flex-1 p-8 bg-gray-100">
        {menu === "artikel" && <KelolaArtikel />}
        {menu === "project" && <KelolaProjects />}
        {menu === "profile" && <KelolaProfile />}
      </main>
    </div>
  );
}

export default AdminDashboard;
