  import { useEffect, useState } from "react";
  import { getContact } from "../services/api";
  import { Mail, Phone, Instagram, Github, Send } from "lucide-react";

  const Contact = () => {
    const [contact, setContact] = useState(null);
    const [form, setForm] = useState({
      name: "",
      email: "",
      whatsapp: "",
      message: "",
    });

    useEffect(() => {
      async function fetchData() {
        const data = await getContact();
        setContact(data);
      }
      fetchData();
    }, []);

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      const subject = encodeURIComponent("Permintaan Jasa Website");
      const body = encodeURIComponent(
        `Nama: ${form.name}\nEmail: ${form.email}\nWhatsApp: ${form.whatsapp}\nPesan:\n${form.message}`
      );
      window.location.href = `mailto:faizarrafi11@gmail.com?subject=${subject}&body=${body}`;
    };

    if (!contact) {
      return <p className="text-center py-20">Memuat data kontak...</p>;
    }

    return (
      <>
        <section id="contact" className="bg-white text-[#2b1d16] py-16 px-6">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-4">Contact Me</h2>
            <p className="text-center text-lg mb-8 text-gray-700">
              Tertarik bekerja sama? Biaya jasa:{" "}
              <span className="font-semibold text-green-600">
                Rp 1.500.000,00 / project
              </span>
            </p>

            <div className="flex flex-col md:flex-row gap-8">
              {/* Kolom Sosial Media */}
              <div className="w-full md:w-1/3">
                <div className="bg-gray-100 p-6 rounded-lg shadow-sm text-lg">
                  <h3 className="text-2xl font-semibold mb-6 text-[#2b1d16] border-b border-gray-300 pb-2">
                    Sosial Media Saya
                  </h3>
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                      <Mail className="text-blue-500" />
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-blue-600 underline break-words"
                      >
                        {contact.email}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="text-green-600" />
                      <a
                        href={`https://wa.me/${contact.whatsapp}`}
                        className="text-green-600 underline break-words"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {contact.whatsapp}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Instagram className="text-pink-500" />
                      <a
                        href={`https://instagram.com/${contact.instagram}`}
                        className="text-pink-500 underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        @{contact.instagram}
                      </a>
                    </div>
                    <div className="flex items-center gap-3">
                      <Github className="text-gray-800" />
                      <a
                        href={`https://github.com/${contact.github}`}
                        className="text-gray-800 underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {contact.github}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulir Kontak */}
              <form
                onSubmit={handleSubmit}
                className="w-full md:w-2/3 bg-gray-100 p-6 rounded-lg shadow-sm space-y-4"
              >
                <div>
                  <label className="block mb-1 font-medium">Nama</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Nomor WhatsApp</label>
                  <input
                    type="text"
                    name="whatsapp"
                    value={form.whatsapp}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block mb-1 font-medium">Deskripsi Pesan</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 px-4 py-2 rounded resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-[#2b1d16] text-white px-6 py-2 rounded hover:bg-[#3c291f] flex items-center gap-2"
                >
                  <Send size={18} />
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-[#1f140f] text-white py-6 w-full">
          <div className="text-center text-sm">
            &copy; {new Date().getFullYear()} Faiz Arrafi. All rights reserved.
          </div>
        </footer>
      </>
    );
  };

  export default Contact;
