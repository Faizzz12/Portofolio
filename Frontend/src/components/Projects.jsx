import { useEffect, useState } from "react";
import { getProjects } from "../services/api";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [showMore, setShowMore] = useState(false); // kontrol expand

  useEffect(() => {
    async function fetchData() {
      const data = await getProjects();
      setProjects(data);
    }
    fetchData();
  }, []);

  if (projects.length === 0) {
    return <p className="text-center py-20">Memuat project...</p>;
  }

  // Pisahkan 3 pertama dan sisanya
  const initialProjects = projects.slice(0, 3);
  const remainingProjects = projects.slice(3);

  return (
    <section id="projects" className="bg-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10 text-[#2b1d16]">
          Project Saya
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}

          {/* Tambahan jika showMore true */}
          {showMore &&
            remainingProjects.map((project, index) => (
              <ProjectCard
                key={index + 3}
                project={project}
              />
            ))}
        </div>

        {projects.length > 3 && (
          <div className="text-center mt-10">
            <button
              onClick={() => setShowMore(!showMore)}
              className="text-blue-600 font-semibold hover:underline transition-all duration-300"
            >
              {showMore ? "Sembunyikan Projects" : "Lihat Projects Lainnya"}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

// Komponen Kartu Project
function ProjectCard({ project }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transform transition-all duration-500 ease-in-out">
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
      )}
      <h3 className="text-xl font-semibold mb-2 text-[#2b1d16]">
        {project.title}
      </h3>
      <p className="text-gray-700 mb-4">{project.description}</p>
      {project.link && (
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Lihat Project
        </a>
      )}
    </div>
  );
}

export default Projects;
