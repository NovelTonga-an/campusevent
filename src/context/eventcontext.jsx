import React, { createContext, useReducer, useContext, useEffect } from 'react';


const initialState = [
  { id: 1, title: 'Tech Conference', status: 'Pending' },
  { id: 2, title: 'Web Dev Workshop', status: 'Completed' },
];

const STORAGE_KEY = 'campusevent_events';

const getInitialState = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialState;
  } catch (error) {
    console.error('Failed to load events from localStorage:', error);
    return initialState;
  }
};

const eventReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EVENT':
      return [...state, action.payload];
    case 'DELETE_EVENT':
      return state.filter(event => event.id !== action.payload);
    case 'TOGGLE_STATUS':
      return state.map(event =>
        event.id === action.payload
          ? { ...event, status: event.status === 'Pending' ? 'Completed' : 'Pending' }
          : event
      );
    default:
      return state;
  }
};

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, dispatch] = useReducer(eventReducer, initialState, getInitialState);

  // Persist events to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
    } catch (error) {
      console.error('Failed to save events to localStorage:', error);
    }
  }, [events]);

  return (
    <EventContext.Provider value={{ events, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);