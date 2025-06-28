import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="bg-[#1f140f] text-white sticky top-0 z-50 shadow-md">
      <nav className="max-w-5xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Faiz Arrafi</h1>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-yellow-400 transition">Home</Link>
          <Link to="/article" className="hover:text-yellow-400 transition">Article</Link>
          <Link to="/contact" className="hover:text-yellow-400 transition">Contact Me</Link>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
