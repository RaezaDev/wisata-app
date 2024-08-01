// src/components/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {UserCircleIcon } from '@heroicons/react/24/outline';


const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    console.log("Admin logged out");
    router.push('/admin/login');
  };

  return (
    <nav className="bg-blue-600 p-4 shadow-md">
      <div className="container mx-auto flex items-center justify-between">
        <div className="text-white font-bold text-xl">Admin Panel</div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/" className="text-white hover:text-gray-300 transition">Kelola Wisata</Link>
          <Link href="/pengajuan-wisata" className="text-white hover:text-gray-300 transition">Pengajuan Wisata</Link>
          <Link href="/admin" className="text-white hover:text-gray-300 transition">About</Link>
          <div className="relative">
            <button onClick={toggleMenu} className="text-white focus:outline-none">
              <UserCircleIcon className="h-8 w-8" />
            </button>
            {isOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20">
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {/* {isOpen ? <XIcon className="h-8 w-8" /> : <MenuIcon className="h-8 w-8" />} */}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden mt-2 space-y-2">
          <Link href="/kelola-wisata" className="block px-4 py-2 text-white hover:bg-blue-700 transition">Kelola Wisata</Link>
          <Link href="/pengajuan-wisata" className="block px-4 py-2 text-white hover:bg-blue-700 transition">Pengajuan Wisata</Link>
          <Link href="/about" className="block px-4 py-2 text-white hover:bg-blue-700 transition">About</Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
