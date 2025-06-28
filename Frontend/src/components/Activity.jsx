import { useEffect, useState } from "react";
import { getProfile } from "../services/api";

function Activity() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getProfile();
      setProfile(data);
    }
    fetchData();
  }, []);

  if (!profile || !profile.activities) {
    return <p className="text-center py-20">Memuat data aktivitas...</p>;
  }

  return (
    <>
      <section id="activity" className="bg-gray-50 text-[#2b1d16] py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Aktivitas</h2>
          <ul className="space-y-4 list-disc list-inside">
            {profile.activities.map((activity, index) => (
              <li
                key={index}
                className="bg-white p-4 rounded-lg shadow hover:shadow-md transition"
              >
                {activity}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Footer*/}
      <footer className="bg-[#1f140f] text-white py-6 w-full">
        <div className="text-center text-sm">
          &copy; {new Date().getFullYear()} Faiz Arrafi. All rights reserved.
        </div>
      </footer>
    </>
  );
}

export default Activity;
