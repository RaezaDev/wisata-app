// src/app/feedback/edit/[id].tsx
"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import { firebaseSDK } from '@/services/firebase';
import Swal from 'sweetalert2';

const firestore = getFirestore(firebaseSDK);

const EditFeedback = ({ params }) => {
  const [feedback, setFeedback] = useState(null);
  const [rating, setRating] = useState('');
  const [feed, setFeed] = useState('');
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchFeedback = async () => {
      const docRef = doc(firestore, 'feedback', id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFeedback(docSnap.data());
        setRating(docSnap.data().rating);
        setFeed(docSnap.data().feed);
      } else {
        console.log('No such document!');
      }
    };

    fetchFeedback();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const docRef = doc(firestore, 'feedback', id);

    try {
      await updateDoc(docRef, {
        rating,
        feed,
        // Add other fields if necessary
      });
      Swal.fire('Success', 'Feedback updated successfully', 'success');
      router.push('/feedback');
    } catch (error) {
      console.error("Error updating feedback:", error);
      Swal.fire('Error', 'Failed to update feedback', 'error');
    }
  };

  if (!feedback) return <p>Loading...</p>;

  return (
    <main className="p-4 bg-gray-100">
      <div className="container mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-4">Edit Feedback</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">Rating</label>
            <input type="number" step="0.1" id="rating" value={rating} onChange={(e) => setRating(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="feed">Komentar</label>
            <textarea id="feed" value={feed} onChange={(e) => setFeed(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Update</button>
        </form>
      </div>
    </main>
  );
};

export default EditFeedback;
