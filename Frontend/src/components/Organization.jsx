// src/components/Organization.jsx
import { useEffect, useState } from "react";
import { getProfile } from "../services/api";

function Organization() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getProfile();
      setProfile(data);
    }
    fetchData();
  }, []);

  if (!profile || !profile.organizations) {
    return <p className="text-center py-20">Memuat data organisasi...</p>;
  }

  return (
    <section id="organization" className="bg-white text-[#2b1d16] py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Organisasi</h2>
        <div className="space-y-6">
          {profile.organizations.map((org, index) => (
            <div
              key={index}
              className="bg-gray-100 rounded-lg shadow-md p-6 hover:shadow-lg transition"
            >
              <h3 className="text-xl font-semibold mb-1">{org.name}</h3>
              <p className="text-sm text-gray-600 mb-1 italic">
                {org.position} &middot; {org.year}
              </p>
              <p className="text-gray-700">{org.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Organization;
