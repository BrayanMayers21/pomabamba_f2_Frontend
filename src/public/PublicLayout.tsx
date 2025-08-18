import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function PublicLayout() {
  return (
    <div className="font-sans bg-white">
      <Header />
      <Navbar />
      
      <main className="min-h-[75vh]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
