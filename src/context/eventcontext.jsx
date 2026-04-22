import React, { createContext, useReducer, useContext } from 'react';


const initialState = [
  { id: 1, title: 'Tech Conference', status: 'Pending' },
  { id: 2, title: 'Web Dev Workshop', status: 'Completed' },
];


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
  const [events, dispatch] = useReducer(eventReducer, initialState);

  return (
    <EventContext.Provider value={{ events, dispatch }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);