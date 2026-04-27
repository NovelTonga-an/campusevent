import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore';
import { db } from '../firebase';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real-time listener — updates instantly on every device
  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('createdAt', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((d) => ({ firestoreId: d.id, ...d.data() }));
      setEvents(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const addEvent = async ({ title, status }) => {
    await addDoc(collection(db, 'events'), {
      title,
      status,
      createdAt: Date.now(),
    });
  };

  const deleteEvent = async (firestoreId) => {
    await deleteDoc(doc(db, 'events', firestoreId));
  };

  const toggleStatus = async (firestoreId, currentStatus) => {
    await updateDoc(doc(db, 'events', firestoreId), {
      status: currentStatus === 'Pending' ? 'Completed' : 'Pending',
    });
  };

  return (
    <EventContext.Provider value={{ events, loading, addEvent, deleteEvent, toggleStatus }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);