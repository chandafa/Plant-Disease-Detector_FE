import { FaLeaf } from "react-icons/fa";

export default function Header() {
  return (
    <header className="text-white shadow-md bg-primary">
      <div className="container px-4 py-6 mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-blue-950">
            <FaLeaf className="text-3xl" />
            <h1 className="text-2xl font-bold">Plant Disease Detector</h1>
          </div>
          <nav>
            <ul className="flex space-x-6 text-blue-950">
              <li>
                <a href="#" className="hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}
