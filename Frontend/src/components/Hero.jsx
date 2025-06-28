import { useEffect, useState } from "react";
import { getProfile } from "../services/api";
import fotoProfile from "../assets/foto-profile.png"; // fallback foto default

function Hero() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getProfile();
      setProfile(data);
    }
    fetchData();
  }, []);

  if (!profile) {
    return (
      <section className="bg-[#2b1d16] text-white py-20 px-6 text-center">
        <p>Memuat data profil...</p>
      </section>
    );
  }

  return (
    <section className="bg-[#2b1d16] text-white py-20 px-6 flex flex-col md:flex-row items-center justify-center gap-10">
      <img
        src={fotoProfile}
        alt="Foto Profil"
        className="w-40 h-40 rounded-full object-cover border-4 border-white shadow-lg"
      />
      <div className="text-center md:text-left">
        <h1 className="text-4xl font-bold mb-2">Hai, saya {profile.name}</h1>
        <p className="text-lg text-gray-300 mb-4">{profile.title}</p>
        <a
          href="#about"
          className="inline-block bg-white text-[#2b1d16] font-semibold px-6 py-2 rounded-full hover:bg-gray-100 transition"
        >
          Tentang Saya
        </a>
      </div>
    </section>
  );
}

export default Hero;
