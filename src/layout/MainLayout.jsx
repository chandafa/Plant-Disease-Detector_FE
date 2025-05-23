import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />
      <main className="container flex-grow px-4 py-8 mx-auto">
        <Outlet />
        <Footer />
      </main>
    </div>
  );
}
