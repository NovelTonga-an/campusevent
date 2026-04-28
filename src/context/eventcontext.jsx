import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, supabaseConfigError } from '../supabase';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadEvents = async () => {
    if (!supabase) {
      setError(supabaseConfigError || 'Supabase client is not configured.');
      setLoading(false);
      return;
    }

    const { data, error: fetchError } = await supabase
      .from('events')
      .select('*')
      .order('created_at', { ascending: true });

    if (fetchError) {
      console.error('Failed to fetch Supabase events:', fetchError);
      setError('Unable to load events right now. Check your Supabase table and policies.');
      setLoading(false);
      return;
    }

    setEvents(data ?? []);
    setError('');
    setLoading(false);
  };

  // Real-time listener — updates instantly on every device
  useEffect(() => {
    if (!supabase) {
      setError(supabaseConfigError || 'Supabase client is not configured.');
      setLoading(false);
      return () => {};
    }

    loadEvents();

    const channel = supabase
      .channel('events-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'events' },
        () => {
          loadEvents();
        }
      )
      .subscribe((status) => {
        if (status === 'CHANNEL_ERROR') {
          setError('Realtime connection failed. Check Supabase Realtime and browser network settings.');
        }
      });

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const addEvent = async ({ title, status }) => {
    try {
      if (!supabase) {
        throw new Error(supabaseConfigError || 'Supabase client is not configured.');
      }

      const { error: insertError } = await supabase.from('events').insert({
        title,
        status,
      });

      if (insertError) {
        throw insertError;
      }

      setError('');
    } catch (addError) {
      console.error('Failed to add Supabase event:', addError);
      setError('Unable to save the event. Check your Supabase table and policies.');
      throw addError;
    }
  };

  const deleteEvent = async (id) => {
    try {
      if (!supabase) {
        throw new Error(supabaseConfigError || 'Supabase client is not configured.');
      }

      const { error: deleteError } = await supabase.from('events').delete().eq('id', id);

      if (deleteError) {
        throw deleteError;
      }

      setError('');
    } catch (deleteError) {
      console.error('Failed to delete Supabase event:', deleteError);
      setError('Unable to delete the event right now.');
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    try {
      if (!supabase) {
        throw new Error(supabaseConfigError || 'Supabase client is not configured.');
      }

      const { error: updateError } = await supabase
        .from('events')
        .update({
        status: currentStatus === 'Pending' ? 'Completed' : 'Pending',
        })
        .eq('id', id);

      if (updateError) {
        throw updateError;
      }

      setError('');
    } catch (toggleError) {
      console.error('Failed to update Supabase event:', toggleError);
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