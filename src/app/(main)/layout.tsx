'use client';
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function MainLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = ["/login", "/register"];
  const showNav = !hideNav.includes(pathname);

  return (
    <div>
      {showNav && <Navbar />}
      {children}
      {showNav && <Footer />}
    </div>
  );
}
