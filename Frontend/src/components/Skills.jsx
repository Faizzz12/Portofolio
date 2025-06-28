import { useEffect, useState } from "react";
import { getProfile } from "../services/api";
import { SiFigma } from "react-icons/si";
import { AiOutlineCheckCircle } from "react-icons/ai";

const Skills = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getProfile();
      setProfile(data);
    }
    fetchData();
  }, []);

  if (!profile) return <p className="text-center mt-10 text-[#2b1d16]">Loading...</p>;

  return (
    <section className="bg-white text-[#2b1d16] min-h-screen py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* SOFTWARE SKILLS */}
        <h2 className="text-xl font-bold mb-4">SOFTWARE SKILLS</h2>
        <div className="space-y-4 mb-10">
          {profile.skills?.software?.map((item, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-200 text-black font-bold flex items-center justify-center rounded">
                {item.name.toLowerCase() === "figma" ? (
                  <SiFigma size={20} />
                ) : (
                  item.name.substring(0, 2)
                )}
              </div>
              <div className="w-full">
                <p className="text-sm mb-1 font-medium">{item.name}</p>
                <input
                  type="range"
                  value={item.level}
                  readOnly
                  className="w-full accent-[#2b1d16] h-1 cursor-default"
                />
              </div>
            </div>
          ))}
        </div>

        {/* LANGUAGES */}
        <h2 className="text-xl font-bold mb-4">LANGUAGES</h2>
        <div className="space-y-4 mb-10">
          {profile.skills?.languages?.map((lang, index) => (
            <div key={index}>
              <p className="text-sm mb-1 font-medium">{lang.name}</p>
              <input
                type="range"
                value={lang.level}
                readOnly
                className="w-full accent-blue-500 h-1 cursor-default"
              />
            </div>
          ))}
        </div>

        {/* PERSONAL SKILLS */}
        <h2 className="text-xl font-bold mb-4">PERSONAL SKILLS</h2>
        <div className="flex flex-wrap gap-3">
          {profile.skills?.personal?.map((skill, index) => (
            <span
              key={index}
              className="bg-[#f1f1f1] text-[#2b1d16] px-4 py-1 rounded-full text-sm flex items-center gap-1 border"
            >
              <AiOutlineCheckCircle size={16} /> {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
