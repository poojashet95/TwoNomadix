import { createContext, useContext, useMemo, useState } from "react";

const TripContext = createContext(null);

export function TripProvider({ children }) {
  const [trip, setTrip] = useState([]);

  function addDestination(destination) {
    setTrip((current) => {
      if (current.some((item) => item.destination === destination.destination)) {
        return current;
      }
      return [...current, destination];
    });
  }

  function removeDestination(name) {
    setTrip((current) =>
      current.filter((item) => item.destination !== name)
    );
  }

  function clearTrip() {
    setTrip([]);
  }

  const value = useMemo(
    () => ({ trip, addDestination, removeDestination, clearTrip }),
    [trip]
  );

  return <TripContext.Provider value={value}>{children}</TripContext.Provider>;
}

export function useTrip() {
  const context = useContext(TripContext);
  if (!context) throw new Error("useTrip must be used inside TripProvider");
  return context;
}
