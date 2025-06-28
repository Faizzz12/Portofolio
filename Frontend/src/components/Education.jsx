import { useEffect, useState } from "react";
import { getProfile } from "../services/api";

function Education() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getProfile();
      setProfile(data);
    }
    fetchData();
  }, []);

  if (!profile) {
    return <div className="text-center py-20">Memuat data pendidikan...</div>;
  }

  return (
    <section id="education" className="bg-white text-[#2b1d16] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Pendidikan</h2>
        <ul className="space-y-6">
          {profile.education?.map((edu, index) => (
            <li key={index} className="bg-gray-100 p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">{edu.institution}</h3>
              <p className="text-gray-700 italic">{edu.degree}</p>
              <p className="text-sm text-gray-600">
                {edu.startYear} - {edu.endYear}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Education;
