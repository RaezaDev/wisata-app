"use client";
import { useEffect, useState } from "react";
import { getFirestore, collection, getDocs, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { firebaseSDK } from "@/services/firebase";
import useAuth from "@/hooks/useAuth"; // Ensure correct import path

export default function PengajuanWisata() {
  useAuth(); // Check authentication

  const firestore = getFirestore(firebaseSDK);
  const [pengajuanData, setPengajuanData] = useState([]);

  useEffect(() => {
    const fetchPengajuan = async () => {
      const pengajuanCollection = collection(firestore, "pengajuan_wisata");
      const pengajuanSnapshot = await getDocs(pengajuanCollection);
      const pengajuanList = pengajuanSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPengajuanData(pengajuanList);
    };

    fetchPengajuan();
  }, [firestore]);

  const handleApprove = async (id, data) => {
    try {
      // Move to main wisata collection
      await updateDoc(doc(firestore, "wisata", id), { ...data, status: "approved" });
      // Update the status in pengajuan_wisata
      await updateDoc(doc(firestore, "pengajuan_wisata", id), { status: "approved" });

      setPengajuanData((prevData) =>
        prevData.filter((pengajuan) => pengajuan.id !== id)
      );
    } catch (error) {
      console.error("Error approving document: ", error);
    }
  };

  const handleReject = async (id) => {
    try {
      await deleteDoc(doc(firestore, "pengajuan_wisata", id));
      setPengajuanData((prevData) =>
        prevData.filter((pengajuan) => pengajuan.id !== id)
      );
    } catch (error) {
      console.error("Error rejecting document: ", error);
    }
  };

  return (
    <main className="h-screen p-4 bg-gray-100">
      <div className="container mx-auto bg-white shadow-md rounded-lg p-6 overflow-x-auto">
        <h1 className="text-2xl font-bold mb-5">Pengajuan Wisata</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nama Wisata</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Alamat</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Waktu Operasional</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Harga Karcis</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deskripsi</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gambar</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lokasi</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pengajuanData.length > 0 ? (
              pengajuanData.map((pengajuan, index) => (
                <tr key={pengajuan.id} className="hover:bg-gray-100">
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{pengajuan.nama_wisata}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{pengajuan.kategori}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{pengajuan.alamat}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{pengajuan.waktu_operasional}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{pengajuan.karcis}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{pengajuan.rating}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{pengajuan.deskripsi}</td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    <img src={pengajuan.image} alt={pengajuan.nama_wisata} className="w-20 h-20 object-cover" />
                  </td>
                  <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                    Lat: {pengajuan.lokasi.latitude}, Lon: {pengajuan.lokasi.longitude}
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleApprove(pengajuan.id, pengajuan)}
                      className="text-green-500 mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(pengajuan.id)}
                      className="text-red-500"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500" colSpan="11">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
