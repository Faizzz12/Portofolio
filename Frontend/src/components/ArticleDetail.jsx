import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getArticleById } from "../services/api";

function ArticleDetail() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);

  const fetchData = async () => {
    const data = await getArticleById(id);
    setArticle(data);
  };

  useEffect(() => {
    fetchData();

    const handleArtikelUpdate = () => fetchData();
    window.addEventListener("artikelDiubah", handleArtikelUpdate);

    return () => {
      window.removeEventListener("artikelDiubah", handleArtikelUpdate);
    };
  }, [id]);

  if (!article) {
    return <p className="text-center py-20">Memuat artikel...</p>;
  }

  return (
    <>
      <section className="bg-white text-[#2b1d16] py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-6">{article.title}</h2>
          {article.coverImage && (
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full h-64 object-cover rounded mb-6"
            />
          )}
          <div
            className="prose max-w-none text-justify"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </section>

      <footer className="bg-[#1f140f] text-white py-6 w-full">
        <div className="text-center text-sm">
          &copy; {new Date().getFullYear()} Faiz Arrafi. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default ArticleDetail;
