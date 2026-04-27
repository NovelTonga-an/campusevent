import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from 'firebase/firestore';
import { db } from '../firebase';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Real-time listener — updates instantly on every device
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'events'),
      (snapshot) => {
        const data = snapshot.docs
          .map((snapshotDoc) => ({ firestoreId: snapshotDoc.id, ...snapshotDoc.data() }))
          .sort((left, right) => {
            const leftTime = left.createdAt?.toMillis?.() ?? 0;
            const rightTime = right.createdAt?.toMillis?.() ?? 0;
            return leftTime - rightTime;
          });

        setEvents(data);
        setError('');
        setLoading(false);
      },
      (snapshotError) => {
        console.error('Failed to subscribe to Firestore events:', snapshotError);
        setError('Unable to sync events right now. Check your Firestore rules and network.');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const addEvent = async ({ title, status }) => {
    try {
      await addDoc(collection(db, 'events'), {
        title,
        status,
        createdAt: serverTimestamp(),
      });
      setError('');
    } catch (addError) {
      console.error('Failed to add Firestore event:', addError);
      setError('Unable to save the event. Check your Firestore rules and network.');
      throw addError;
    }
  };

  const deleteEvent = async (firestoreId) => {
    try {
      await deleteDoc(doc(db, 'events', firestoreId));
      setError('');
    } catch (deleteError) {
      console.error('Failed to delete Firestore event:', deleteError);
      setError('Unable to delete the event right now.');
    }
  };

  const toggleStatus = async (firestoreId, currentStatus) => {
    try {
      await updateDoc(doc(db, 'events', firestoreId), {
        status: currentStatus === 'Pending' ? 'Completed' : 'Pending',
      });
      setError('');
    } catch (toggleError) {
      console.error('Failed to update Firestore event:', toggleError);
      setError('Unable to update the event status right now.');
    }
  };

  return (
    <EventContext.Provider value={{ events, loading, error, addEvent, deleteEvent, toggleStatus }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);