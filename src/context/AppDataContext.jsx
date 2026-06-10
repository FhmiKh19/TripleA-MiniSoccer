import { createContext, useContext, useState } from "react";
import { fields, bookings, cancellations, timeSlots } from "../data/seeder";

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const [bookingList, setBookingList] = useState(() => {
    const saved = localStorage.getItem("bookingList");
    return saved ? JSON.parse(saved) : bookings;
  });

  const [cancellationList, setCancellationList] = useState(() => {
    const saved = localStorage.getItem("cancellationList");
    return saved ? JSON.parse(saved) : cancellations;
  });

  const [fieldList, setFieldList] = useState(() => {
    const saved = localStorage.getItem("fieldList");
    return saved ? JSON.parse(saved) : fields;
  });

  const [slotList, setSlotList] = useState(() => {
    const saved = localStorage.getItem("slotList");
    return saved ? JSON.parse(saved) : timeSlots;
  });

  const persist = (key, data) => localStorage.setItem(key, JSON.stringify(data));

  const addBooking = (booking) => {
    const updated = [...bookingList, booking];
    setBookingList(updated);
    persist("bookingList", updated);
  };

  const updateBooking = (id, changes) => {
    const updated = bookingList.map((b) => (b.id === id ? { ...b, ...changes } : b));
    setBookingList(updated);
    persist("bookingList", updated);
  };

  const deleteBooking = (id) => {
    const updated = bookingList.filter((b) => b.id !== id);
    setBookingList(updated);
    persist("bookingList", updated);
  };

  const addCancellation = (cancellation) => {
    const updated = [...cancellationList, cancellation];
    setCancellationList(updated);
    persist("cancellationList", updated);
  };

  const updateCancellation = (id, changes) => {
    const updated = cancellationList.map((c) =>
      c.id === id ? { ...c, ...changes } : c
    );
    setCancellationList(updated);
    persist("cancellationList", updated);
  };

  const updateField = (id, changes) => {
    const updated = fieldList.map((f) => (f.id === id ? { ...f, ...changes } : f));
    setFieldList(updated);
    persist("fieldList", updated);
  };

  const addField = (field) => {
    const newField = { ...field, id: Date.now() };
    const updated = [...fieldList, newField];
    setFieldList(updated);
    persist("fieldList", updated);
  };

  const deleteField = (id) => {
    const updated = fieldList.filter((f) => f.id !== id);
    setFieldList(updated);
    persist("fieldList", updated);
  };

  const updateSlotStatus = (slotId, status) => {
    const updated = slotList.map((s) => (s.id === slotId ? { ...s, status } : s));
    setSlotList(updated);
    persist("slotList", updated);
  };

  const blockSlot = (slotId) => updateSlotStatus(slotId, "Dipesan");

  const releaseSlot = (slotId) => updateSlotStatus(slotId, "Tersedia");

  return (
    <AppDataContext.Provider
      value={{
        bookingList,
        addBooking,
        updateBooking,
        deleteBooking,
        cancellationList,
        addCancellation,
        updateCancellation,
        fieldList,
        addField,
        updateField,
        deleteField,
        slotList,
        updateSlotStatus,
        blockSlot,
        releaseSlot,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  return useContext(AppDataContext);
}
