import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:justify-between">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-semibold mb-2">WisataApp</h2>
            <p className="text-gray-400">Platform manajemen destinasi wisata terbaik untuk Anda. Temukan dan kelola destinasi wisata dengan mudah.</p>
          </div>
          <div className="flex flex-col md:flex-row md:space-x-6 mb-6 md:mb-0">
            <div className="mb-6 md:mb-0">
              <h3 className="text-lg font-semibold mb-2">Tautan Penting</h3>
              <ul className="space-y-2">
                <li><Link href="/" className="hover:underline">Beranda</Link></li>
                <li><Link href="/about" className="hover:underline">Tentang Kami</Link></li>
                <li><Link href="/contact" className="hover:underline">Kontak</Link></li>
                <li><Link href="/feedback" className="hover:underline">Umpan Balik</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Ikuti Kami</h3>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 0H2C0.9 0 0 0.9 0 2V22c0 1.1 0.9 2 2 2h11v-9H8v-4h5V7c0-5 3-8 7-8 1.4 0 2.8 0.1 4 0.3V6h-3c-2.6 0-3 1.2-3 2.9v3.2h6l-1 4h-5v9h10c1.1 0 2-0.9 2-2V2c0-1.1-0.9-2-2-2z" />
                  </svg>
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23 3c-0.8 0.4-1.7 0.7-2.6 0.8 0.9-0.5 1.6-1.3 2-2.3-0.8 0.5-1.7 0.9-2.7 1.1-0.8-0.8-1.9-1.2-3-1.2-2.3 0-4.2 1.9-4.2 4.2 0 0.3 0 0.6 0.1 0.9-3.5-0.2-6.6-1.9-8.7-4.4-0.4 0.7-0.7 1.5-0.7 2.4 0 1.7 0.9 3.2 2.2 4-0.8 0-1.6-0.2-2.3-0.5v0.1c0 2.3 1.6 4.2 3.7 4.7-0.4 0.1-0.8 0.2-1.2 0.2-0.3 0-0.6 0-0.9-0.1 0.6 2 2.4 3.4 4.5 3.4-1.7 1.3-3.9 2.1-6.2 2.1-0.4 0-0.8 0-1.2-0.1 2.3 1.5 5.1 2.4 8.1 2.4 9.7 0 15-8 15-15 0-0.2 0-0.4 0-0.6 1-0.8 1.8-1.8 2.5-3 2.8z" />
                  </svg>
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-500">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.2c-3.5 0-6.4 2.9-6.4 6.4s2.9 6.4 6.4 6.4 6.4-2.9 6.4-6.4-2.9-6.4-6.4-6.4zM12 13.6c-2.3 0-4.1-1.8-4.1-4.1s1.8-4.1 4.1-4.1 4.1 1.8 4.1 4.1-1.8 4.1-4.1 4.1zM21.3 3.7c-0.1-0.6-0.7-1.1-1.3-1.1h-0.5c-0.4 0-0.8 0.1-1.1 0.3-0.3 0.2-0.5 0.4-0.7 0.7-0.3 0.3-0.5 0.7-0.7 1.1-0.2 0.3-0.3 0.7-0.3 1.1v0.5c0 0.6 0.5 1.1 1.1 1.1 0.4 0 0.8-0.1 1.1-0.3 0.3-0.2 0.5-0.4 0.7-0.7 0.2-0.3 0.3-0.7 0.3-1.1v-0.5c0-0.4-0.1-0.8-0.3-1.1-0.2-0.3-0.5-0.5-0.7-0.7zM12 5.3c-3.7 0-6.7 3-6.7 6.7s3 6.7 6.7 6.7 6.7-3 6.7-6.7-3-6.7-6.7-6.7zM12 0c-6.6 0-12 5.4-12 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-gray-700 pt-4 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} WisataApp. Semua hak cipta dilindungi.</p>
        </div>
      </div>
    </footer>
  );
}
