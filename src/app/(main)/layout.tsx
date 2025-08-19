'use client'; // এটি অবশ্যই প্রথম লাইন হতে হবে

import { usePathname } from "next/navigation";
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "../globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
});

// Metadata is not needed in a client component, it should be in a server component.
// If you want to use it, you can keep it in a separate server layout file.
// export const metadata: Metadata = {
//   title: "পৈথারা উচ্চ বিদ্যালয়",
//   description: "Bangla font applied using next/font/google",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();

  // যে রুটগুলোতে Navbar এবং Footer দেখানোর প্রয়োজন নেই
  const routesWithoutNavAndFooter = ["/login", "/register"];
  const showNavAndFooter = !routesWithoutNavAndFooter.includes(pathname);

  return (
    <html lang="bn">
      <body className={hindSiliguri.className}>
        {showNavAndFooter && <Navbar />}
        {children}
        {showNavAndFooter && <Footer />}
      </body>
    </html>
  );
}
