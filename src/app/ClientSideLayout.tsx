// src/app/ClientSideLayout.tsx
"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // Pastikan path benar

const ClientSideLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  // Tampilkan Navbar hanya jika bukan halaman login admin
  const showNavbar = pathname !== "/admin";

  return (
    <div className="flex flex-col min-h-screen">
      {showNavbar && <Navbar />}
      <main className="flex-grow">{children}</main>
      <Footer /> {/* Tambahkan Footer di sini */}
    </div>
  );
};

export default ClientSideLayout;
