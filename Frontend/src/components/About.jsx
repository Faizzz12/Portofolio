import { useEffect, useState } from "react";
import { getProfile } from "../services/api";

function About() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getProfile();
      setProfile(data);
    }
    fetchData();
  }, []);

  if (!profile) {
    return <div className="text-center py-20">Memuat data profil...</div>;
  }

  return (
    <section id="about" className="bg-white text-[#2b1d16] py-16 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Tentang Saya</h2>
        <p className="text-lg text-gray-700">
          {profile.about}
        </p>
      </div>
    </section>
  );
}

export default About;
