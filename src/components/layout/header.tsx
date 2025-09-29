import { Link } from "react-router";

export default function Header() {
  return (
    <header className="px-4 py-2 bg-gray-800 flex justify-between text-white">
      <h1 className="text-2xl font-bold">Portfolio</h1>
      <div className="flex space-x-4">
        <Link to="/proyects" className="hover:underline">
          Proyectos
        </Link>
        <Link to="/email" className="hover:underline">
          Emails
        </Link>
      </div>
    </header>
  );
}
