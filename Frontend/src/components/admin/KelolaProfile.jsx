import { useEffect, useState } from "react";
import { getProfile, updateProfile } from "../../services/api";

function KelolaProfile() {
  const [profile, setProfile] = useState({
    name: "",
    title: "",
    about: "",
    skills: { software: [], languages: [], personal: [] },
    education: [],
    experience: [],
    organizations: [],
    activities: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const data = await getProfile();
      if (data) setProfile(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleArrayChange = (parent, fieldOrIndex, keyOrValue, valueIfNested) => {
    if (parent === "skills") {
      const field = fieldOrIndex;
      const idx = keyOrValue;
      const key = valueIfNested;
      const value = arguments[3];

      const updated = [...profile.skills[field]];
      updated[idx][key] = value;
      setProfile({ ...profile, skills: { ...profile.skills, [field]: updated } });
    } else {
      const updatedArray = [...profile[parent]];
      updatedArray[fieldOrIndex][keyOrValue] = valueIfNested;
      setProfile({ ...profile, [parent]: updatedArray });
    }
  };

  const handleAddEntry = (field, template) => {
    setProfile({ ...profile, [field]: [...profile[field], template] });
  };

  const handleRemoveEntry = (field, index) => {
    const updatedArray = profile[field].filter((_, i) => i !== index);
    setProfile({ ...profile, [field]: updatedArray });
  };

  const handleActivitiesChange = (index, value) => {
    const updated = [...profile.activities];
    updated[index] = value;
    setProfile({ ...profile, activities: updated });
  };

  const addActivity = () => {
    setProfile({ ...profile, activities: [...profile.activities, ""] });
  };

  const removeActivity = (index) => {
    const updated = profile.activities.filter((_, i) => i !== index);
    setProfile({ ...profile, activities: updated });
  };

  const handleAddSkillEntry = (type) => {
    const updated = [...profile.skills[type], { name: "", level: 0 }];
    setProfile({ ...profile, skills: { ...profile.skills, [type]: updated } });
  };

  const handleRemoveSkillEntry = (type, index) => {
    const updated = profile.skills[type].filter((_, i) => i !== index);
    setProfile({ ...profile, skills: { ...profile.skills, [type]: updated } });
  };

  const handlePersonalChange = (idx, value) => {
    const updated = [...profile.skills.personal];
    updated[idx] = value;
    setProfile({ ...profile, skills: { ...profile.skills, personal: updated } });
  };

  const handleAddPersonal = () => {
    setProfile({
      ...profile,
      skills: { ...profile.skills, personal: [...profile.skills.personal, ""] },
    });
  };

  const handleRemovePersonal = (idx) => {
    const updated = profile.skills.personal.filter((_, i) => i !== idx);
    setProfile({ ...profile, skills: { ...profile.skills, personal: updated } });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(profile);
      alert("Profil berhasil diperbarui!");
      window.dispatchEvent(new Event("profileDiubah"));
    } catch (err) {
      console.error("Gagal memperbarui profil", err);
      alert("Terjadi kesalahan saat menyimpan profil.");
    }
  };

  if (loading) return <p className="text-center">Memuat data profil...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-[#2b1d16]">Kelola Profil</h2>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded shadow">
        <input type="text" name="name" value={profile.name} onChange={handleChange} placeholder="Nama" className="w-full p-2 border rounded" required />
        <input type="text" name="title" value={profile.title} onChange={handleChange} placeholder="Judul/Title" className="w-full p-2 border rounded" />
        <textarea name="about" value={profile.about} onChange={handleChange} placeholder="Tentang Saya" className="w-full p-2 border rounded h-28" />

        {/* === SKILLS - Software === */}
        <div>
          <h3 className="font-semibold mb-2">Skills - Software</h3>
          {profile.skills.software.map((skill, idx) => (
            <div key={idx} className="flex gap-2 items-center mb-2">
              <input
                type="text"
                value={skill.name}
                onChange={(e) => handleArrayChange("skills", "software", idx, "name", e.target.value)}
                placeholder="Nama Software"
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="number"
                value={skill.level}
                onChange={(e) => handleArrayChange("skills", "software", idx, "level", e.target.value)}
                placeholder="Level (0-100)"
                className="w-1/3 p-2 border rounded"
              />
              <button type="button" onClick={() => handleRemoveSkillEntry("software", idx)} className="text-red-600 text-sm">Hapus</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddSkillEntry("software")} className="text-blue-600 text-sm">+ Tambah Skill Software</button>
        </div>

        {/* === SKILLS - Languages === */}
        <div>
          <h3 className="font-semibold mt-6 mb-2">Skills - Languages</h3>
          {profile.skills.languages.map((lang, idx) => (
            <div key={idx} className="flex gap-2 items-center mb-2">
              <input
                type="text"
                value={lang.name}
                onChange={(e) => handleArrayChange("skills", "languages", idx, "name", e.target.value)}
                placeholder="Bahasa yang dikuasai"
                className="w-1/2 p-2 border rounded"
              />
              <input
                type="number"
                value={lang.level}
                onChange={(e) => handleArrayChange("skills", "languages", idx, "level", e.target.value)}
                placeholder="Level (0-100)"
                className="w-1/3 p-2 border rounded"
              />
              <button type="button" onClick={() => handleRemoveSkillEntry("languages", idx)} className="text-red-600 text-sm">Hapus</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddSkillEntry("languages")} className="text-blue-600 text-sm">+ Tambah Skill Language</button>
        </div>

        {/* === SKILLS - Personal === */}
        <div>
          <h3 className="font-semibold mt-6 mb-2">Skills - Personal</h3>
          {profile.skills.personal.map((item, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={item}
                onChange={(e) => handlePersonalChange(idx, e.target.value)}
                placeholder="Skill Personal"
                className="w-full p-2 border rounded"
              />
              <button type="button" onClick={() => handleRemovePersonal(idx)} className="text-red-600 text-sm">Hapus</button>
            </div>
          ))}
          <button type="button" onClick={handleAddPersonal} className="text-blue-600 text-sm">+ Tambah Skill Personal</button>
        </div>

        {/* === EDUCATION === */}
        <div>
          <h3 className="font-semibold mb-2">Education</h3>
          {profile.education.map((edu, idx) => (
            <div key={idx} className="space-y-2 border p-4 mb-2 rounded">
              <input type="text" value={edu.institution} onChange={(e) => handleArrayChange("education", idx, "institution", e.target.value)} placeholder="Institution" className="w-full p-2 border rounded" />
              <input type="text" value={edu.degree} onChange={(e) => handleArrayChange("education", idx, "degree", e.target.value)} placeholder="Degree" className="w-full p-2 border rounded" />
              <input type="text" value={edu.startYear} onChange={(e) => handleArrayChange("education", idx, "startYear", e.target.value)} placeholder="Start Year" className="w-full p-2 border rounded" />
              <input type="text" value={edu.endYear} onChange={(e) => handleArrayChange("education", idx, "endYear", e.target.value)} placeholder="End Year" className="w-full p-2 border rounded" />
              <button type="button" onClick={() => handleRemoveEntry("education", idx)} className="text-red-600 text-sm">Hapus</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddEntry("education", { institution: "", degree: "", startYear: "", endYear: "" })} className="text-blue-600 text-sm">+ Tambah Education</button>
        </div>

        {/* === EXPERIENCE === */}
        <div>
          <h3 className="font-semibold mb-2">Experience</h3>
          {profile.experience.map((exp, idx) => (
            <div key={idx} className="space-y-2 border p-4 mb-2 rounded">
              <input type="text" value={exp.position} onChange={(e) => handleArrayChange("experience", idx, "position", e.target.value)} placeholder="Position" className="w-full p-2 border rounded" />
              <textarea value={exp.description} onChange={(e) => handleArrayChange("experience", idx, "description", e.target.value)} placeholder="Description" className="w-full p-2 border rounded" />
              <input type="text" value={exp.startYear} onChange={(e) => handleArrayChange("experience", idx, "startYear", e.target.value)} placeholder="Start Year" className="w-full p-2 border rounded" />
              <input type="text" value={exp.endYear} onChange={(e) => handleArrayChange("experience", idx, "endYear", e.target.value)} placeholder="End Year" className="w-full p-2 border rounded" />
              <button type="button" onClick={() => handleRemoveEntry("experience", idx)} className="text-red-600 text-sm">Hapus</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddEntry("experience", { position: "", description: "", startYear: "", endYear: "" })} className="text-blue-600 text-sm">+ Tambah Experience</button>
        </div>

        {/* === ORGANIZATIONS === */}
        <div>
          <h3 className="font-semibold mb-2">Organizations</h3>
          {profile.organizations.map((org, idx) => (
            <div key={idx} className="space-y-2 border p-4 mb-2 rounded">
              <input type="text" value={org.name} onChange={(e) => handleArrayChange("organizations", idx, "name", e.target.value)} placeholder="Organization Name" className="w-full p-2 border rounded" />
              <input type="text" value={org.position} onChange={(e) => handleArrayChange("organizations", idx, "position", e.target.value)} placeholder="Position" className="w-full p-2 border rounded" />
              <input type="text" value={org.year} onChange={(e) => handleArrayChange("organizations", idx, "year", e.target.value)} placeholder="Year" className="w-full p-2 border rounded" />
              <textarea value={org.description} onChange={(e) => handleArrayChange("organizations", idx, "description", e.target.value)} placeholder="Description" className="w-full p-2 border rounded" />
              <button type="button" onClick={() => handleRemoveEntry("organizations", idx)} className="text-red-600 text-sm">Hapus</button>
            </div>
          ))}
          <button type="button" onClick={() => handleAddEntry("organizations", { name: "", position: "", year: "", description: "" })} className="text-blue-600 text-sm">+ Tambah Organization</button>
        </div>

        {/* === ACTIVITIES === */}
        <div>
          <h3 className="font-semibold mb-2">Activities</h3>
          {profile.activities.map((activity, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <input type="text" value={activity} onChange={(e) => handleActivitiesChange(idx, e.target.value)} className="w-full p-2 border rounded" />
              <button type="button" onClick={() => removeActivity(idx)} className="text-red-600 text-sm">Hapus</button>
            </div>
          ))}
          <button type="button" onClick={addActivity} className="text-blue-600 text-sm">+ Tambah Aktivitas</button>
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Simpan Perubahan
        </button>
      </form>
    </div>
  );
}

export default KelolaProfile;
