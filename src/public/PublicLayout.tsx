import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function PublicLayout() {
  return (
    <div className="font-sans bg-white">
      <Header />

      <main className="min-h-[75vh] pt-32">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
