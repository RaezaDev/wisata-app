// src/app/feedback/page.tsx
"use client";

import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { firebaseSDK } from '@/services/firebase';
import { format } from 'date-fns'; // Import date-fns untuk format tanggal
import Link from 'next/link';

const firestore = getFirestore(firebaseSDK);

export default function FeedbackPage() {
  const [feedbackList, setFeedbackList] = useState([]);

  useEffect(() => {
    const fetchFeedback = async () => {
      const feedbackCollection = collection(firestore, 'feedback');
      const feedbackSnapshot = await getDocs(feedbackCollection);
      const feedbackData = feedbackSnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          tmtFormatted: data.tmt ? format(data.tmt.toDate(), 'dd MMM yyyy HH:mm:ss') : 'N/A' // Format timestamp
        };
      });
      setFeedbackList(feedbackData);
    };

    fetchFeedback();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        await deleteDoc(doc(firestore, 'feedback', id));
        setFeedbackList(prevList => prevList.filter(feedback => feedback.id !== id));
        Swal.fire('Deleted!', 'Feedback has been deleted.', 'success');
      } catch (error) {
        console.error("Error deleting feedback:", error);
        Swal.fire('Error!', 'There was an error deleting the feedback.', 'error');
      }
    }
  };

  return (
    <main className="h-screen p-4 bg-gray-100">
  <div className="container mx-auto bg-white shadow-md rounded-lg p-6 overflow-x-auto">
    <h1 className="text-2xl font-bold mb-4">Daftar Umpan Balik</h1>
    <table className="min-w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wisata ID</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Komentar</th>
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th> {/* Tambahkan kolom untuk timestamp */}
          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {feedbackList.length > 0 ? (
          feedbackList.map((feedback, index) => (
            <tr key={feedback.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">{index + 1}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{feedback.id_wisata}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{feedback.rating}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{feedback.feed}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">{feedback.tmtFormatted}</td> {/* Tampilkan timestamp */}
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
              <Link href={`/feedback/edit/${feedback.id}`} className="text-blue-500 hover:text-blue-700">Edit</Link>
              {/* Link untuk edit */}
                <button onClick={() => handleDelete(feedback.id)} className="text-red-500 ml-4">Delete</button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500" colSpan="6">No feedback available</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
</main>
  );
}
