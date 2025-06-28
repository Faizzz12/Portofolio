import { useEffect, useState } from "react";
import { getProfile } from "../services/api";

function Experience() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getProfile();
      setProfile(data);
    }
    fetchData();
  }, []);

  if (!profile) return <p className="text-center py-20">Memuat data pengalaman...</p>;

  return (
    <section id="experience" className="bg-white text-[#2b1d16] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Pengalaman</h2>
        <div className="space-y-6">
          {profile.experience?.map((item, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">{item.position}</h3>
              <p className="text-sm text-gray-600">
                {item.startYear} - {item.endYear}
              </p>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
