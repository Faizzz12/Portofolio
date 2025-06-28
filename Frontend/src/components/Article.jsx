import { useEffect, useState } from "react";
import { getArticlesWithAuth } from "../services/api";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

function Article() {
  const [articles, setArticles] = useState([]);

  const fetchData = async () => {
    const data = await getArticlesWithAuth();
    setArticles(data);
  };

  useEffect(() => {
    fetchData();

    // Dengarkan event "artikelDiubah" dari halaman admin
    const listener = () => {
      fetchData();
    };

    window.addEventListener("artikelDiubah", listener);

    // Cleanup event listener saat unmount
    return () => {
      window.removeEventListener("artikelDiubah", listener);
    };
  }, []);

  return (
    <section className="bg-white text-[#2b1d16] py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center">Artikel</h2>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {articles.map((article) => (
              <div
                key={article._id}
                className="bg-gray-100 p-6 rounded-lg shadow-md"
              >
                {article.coverImage && (
                  <img
                    src={article.coverImage}
                    alt={article.title}
                    className="w-full h-48 object-cover rounded mb-4"
                  />
                )}
                <h3 className="text-xl font-bold mb-2">{article.title}</h3>
                <p className="text-gray-700 mb-3 line-clamp-3">
                  {article.content}
                </p>
                <Link
                  to={`/article/${article._id}`}
                  className="text-blue-600 hover:underline font-semibold"
                >
                  Baca Selengkapnya
                </Link>
              </div>
            ))}
          </div>
          <Sidebar />
        </div>
      </div>
    </section>
  );
}

export default Article;
