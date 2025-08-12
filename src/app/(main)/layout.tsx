import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import "../globals.css";
import Navbar from "./components/Navbar";

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Next App with Bangla Font",
  description: "Bangla font applied using next/font/google",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className={hindSiliguri.className}>
        <Navbar></Navbar>
        {children}
      </body>
    </html>
  );
}
