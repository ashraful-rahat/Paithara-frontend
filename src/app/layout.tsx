// src/app/layout.tsx
import type { Metadata } from "next";
import { Hind_Siliguri } from "next/font/google";
import './globals.css';

const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "পৈথারা উচ্চ বিদ্যালয়",
  description: "Bangla font applied using next/font/google",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="bn">
      <body className={hindSiliguri.className}>
        {children}
      </body>
    </html>
  );
}
