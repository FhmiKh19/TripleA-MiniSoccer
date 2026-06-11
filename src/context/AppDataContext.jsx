import { createContext, useContext, useState, useEffect } from "react";
import { fields, bookings, cancellations, timeSlots } from "../data/seeder";
import { apiGetLapangan, apiAddLapangan, apiUpdateLapangan, apiDeleteLapangan } from "../services/api";

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

  const [fieldList, setFieldList] = useState([]);
  const [fieldLoading, setFieldLoading] = useState(false);

  useEffect(() => {
    let mounted = true;
    setFieldLoading(true);
    apiGetLapangan()
      .then((res) => {
        if (!mounted) return;
        // expect API returns array or { data }
        const data = Array.isArray(res) ? res : res.data || [];
        setFieldList(data);
      })
      .catch(() => {
        setFieldList(fields);
      })
      .finally(() => mounted && setFieldLoading(false));
    return () => (mounted = false);
  }, []);

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

  const updateField = async (id, changes) => {
    const res = await apiUpdateLapangan(id, changes);
    const updatedField = res.data || res;
    setFieldList((prev) => prev.map((f) => (f.id === id ? updatedField : f)));
    return updatedField;
  };

  const addField = async (field) => {
    const res = await apiAddLapangan(field);
    const newField = res.data || res;
    setFieldList((prev) => [...prev, newField]);
    return newField;
  };

  const deleteField = async (id) => {
    await apiDeleteLapangan(id);
    setFieldList((prev) => prev.filter((f) => f.id !== id));
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
