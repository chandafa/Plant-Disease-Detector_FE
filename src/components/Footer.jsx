import { useState } from "react";

export default function Footer() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <footer className="py-6 text-center text-gray-600 ">
      <p>Create by Chann.ck© {new Date().getFullYear()}</p>
    </footer>
  );
}
