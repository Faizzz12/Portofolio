import { useEffect, useState } from "react";
import { getLatestArticles } from "../services/api";
import { Link } from "react-router-dom";

function Sidebar() {
  const [latestArticles, setLatestArticles] = useState([]);

  const fetchData = async () => {
    const data = await getLatestArticles(3);
    setLatestArticles(data);
  };

  useEffect(() => {
    fetchData();

    const handleUpdate = () => fetchData();
    window.addEventListener("artikelDiubah", handleUpdate);

    return () => {
      window.removeEventListener("artikelDiubah", handleUpdate);
    };
  }, []);

  return (
    <aside className="bg-white p-6 rounded shadow-md border border-gray-200">
      <h3 className="text-xl font-semibold mb-4 text-[#2b1d16]">Artikel Terbaru</h3>
      <ul className="space-y-4">
        {latestArticles.map((article) => (
          <li key={article._id} className="flex items-start gap-3 border-b pb-4">
            {article.coverImage && (
              <img
                src={article.coverImage}
                alt={article.title}
                className="w-16 h-16 object-cover rounded"
              />
            )}
            <div className="flex-1">
              <Link
                to={`/article/${article._id}`}
                className="text-blue-600 hover:underline font-medium"
              >
                {article.title}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default Sidebar;
