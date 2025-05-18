import { useState } from "react";
import { FaLeaf, FaBars } from "react-icons/fa";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="text-white shadow-md bg-primary">
      <div className="container px-4 py-4 mx-auto">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2 text-blue-950">
            <FaLeaf className="text-3xl" />
            <h1 className="block text-2xl font-bold md:hidden">Plant</h1>
            <h1 className="hidden text-2xl font-bold md:block">Plant Disease Detector</h1>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:block">
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

          {/* Mobile Hamburger */}
          <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              <FaBars className="text-2xl text-blue-950" />
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMobileMenuOpen && (
          <div className="mt-4 md:hidden">
            <ul className="flex flex-col space-y-2 text-blue-950">
              <li>
                <a href="#" className="block hover:underline">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="block hover:underline">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="block hover:underline">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
