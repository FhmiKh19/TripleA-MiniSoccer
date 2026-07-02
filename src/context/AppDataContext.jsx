import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { fields as fallbackFields } from "../data/seeder";
import { useAuth } from "./AuthContext";
import {
  apiGetLapangan,
  apiAddLapangan,
  apiUpdateLapangan,
  apiDeleteLapangan,
  apiGetBooking,
  apiCreateBooking,
  apiGetJadwal,
  apiAjukanPembatalan,
  apiGetPembatalan,
  apiKonfirmasiPembatalan,
  apiVerifyPayment,
  apiExtendBooking,
  apiGetStatistik,
  apiGetLaporan,
} from "../services/api";
import { mapBookingFromApi, mapCancellationFromApi, mapFieldFromApi, toApiBookingPayload } from "../utils/apiMappers";
import { generateSlotsForFields, markBookedSlots } from "../utils/slotHelpers";

const AppDataContext = createContext(null);

export function AppDataProvider({ children }) {
  const { currentUser } = useAuth();
  const [bookingList, setBookingList] = useState([]);
  const [cancellationList, setCancellationList] = useState([]);
  const [fieldList, setFieldList] = useState([]);
  const [slotList, setSlotList] = useState([]);
  const [fieldLoading, setFieldLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);

  const loadFields = useCallback(async () => {
    setFieldLoading(true);
    try {
      const res = await apiGetLapangan();
      const data = Array.isArray(res) ? res : res.data || [];
      const mapped = data.map(mapFieldFromApi);
      setFieldList(mapped.length > 0 ? mapped : fallbackFields);
      return mapped.length > 0 ? mapped : fallbackFields;
    } catch {
      setFieldList(fallbackFields);
      return fallbackFields;
    } finally {
      setFieldLoading(false);
    }
  }, []);

  const refreshBookings = useCallback(async () => {
    if (!currentUser || !localStorage.getItem("token")) return [];
    try {
      const res = await apiGetBooking();
      const data = Array.isArray(res) ? res : [];
      const mapped = data.map(mapBookingFromApi);
      setBookingList(mapped);
      return mapped;
    } catch {
      return [];
    }
  }, [currentUser]);

  const refreshCancellations = useCallback(async () => {
    if (!currentUser || currentUser.role !== "admin") return [];
    try {
      const res = await apiGetPembatalan();
      const data = Array.isArray(res) ? res : [];
      const mapped = data.map(mapCancellationFromApi);
      setCancellationList(mapped);
      return mapped;
    } catch {
      return [];
    }
  }, [currentUser]);

  const refreshSlots = useCallback(async (fields, bookings) => {
    const base = generateSlotsForFields(fields.length ? fields : fallbackFields);
    const marked = markBookedSlots(base, bookings || []);
    setSlotList(marked);
    return marked;
  }, []);

  const loadJadwalForDate = useCallback(async (date, fields) => {
    if (!date || !localStorage.getItem("token")) return;
    try {
      const res = await apiGetJadwal(date);
      const jadwal = Array.isArray(res) ? res : [];
      const base = generateSlotsForFields(fields.length ? fields : fallbackFields);
      const marked = markBookedSlots(base, jadwal);
      setSlotList(marked);
    } catch {
      // keep existing slots
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      loadFields();
    }
  }, [currentUser, loadFields]);

  useEffect(() => {
    if (!currentUser) {
      setBookingList([]);
      setCancellationList([]);
      return;
    }
    const load = async () => {
      setDataLoading(true);
      const fields = fieldList.length ? fieldList : fallbackFields;
      const bookings = await refreshBookings();
      if (currentUser.role === "admin") {
        await refreshCancellations();
      }
      await refreshSlots(fields, bookings);
      setDataLoading(false);
    };
    load();
  }, [currentUser, fieldList.length, refreshBookings, refreshCancellations, refreshSlots]);

  const createBooking = async (payload) => {
    const apiPayload = toApiBookingPayload({
      lapanganId: payload.lapanganId || payload.fieldId,
      date: payload.date,
      startTime: payload.startTime,
      endTime: payload.endTime,
      duration: payload.duration || 1,
      totalPrice: payload.totalPrice,
    });
    const res = await apiCreateBooking(apiPayload);
    if (!res?.id && !res?.booking_code) {
      throw new Error(res?.message || "Gagal membuat reservasi");
    }
    const booking = mapBookingFromApi(res);
    setBookingList((prev) => {
      const updated = [...prev, booking];
      refreshSlots(fieldList, updated);
      return updated;
    });
    return booking;
  };

  const updateBookingLocal = (id, changes) => {
    setBookingList((prev) => prev.map((b) => (b.id === id ? { ...b, ...changes } : b)));
  };

  const verifyPayment = async (id, action) => {
    const res = await apiVerifyPayment(id, action);
    if (res?.booking) {
      const updated = mapBookingFromApi(res.booking);
      setBookingList((prev) => prev.map((b) => (b.id === id ? updated : b)));
    }
    return res;
  };

  const submitCancellation = async (bookingId, reason) => {
    const res = await apiAjukanPembatalan(bookingId, reason);
    const updatedBookings = await refreshBookings();
    // Update slots supaya sinkron dengan status booking terbaru
    const fields = fieldList.length ? fieldList : fallbackFields;
    await refreshSlots(fields, updatedBookings);
    return res;
  };

  const confirmCancellation = async (id, action) => {
    const res = await apiKonfirmasiPembatalan(id, action);
    const updatedBookings = await refreshBookings();   // dapatkan list terbaru
    await refreshCancellations();
    // Bebaskan slot dari booking yang sudah dibatalkan
    const fields = fieldList.length ? fieldList : fallbackFields;
    await refreshSlots(fields, updatedBookings);
    return res;
  };

  const extendBooking = async (id, { extraHours, extraPrice }) => {
    const res = await apiExtendBooking(id, {
      extra_hours: extraHours,
      extra_price: extraPrice,
    });
    if (res?.booking) {
      const updated = mapBookingFromApi(res.booking);
      setBookingList((prev) => prev.map((b) => (b.id === id ? updated : b)));
    }
    return res;
  };

  const addField = async (field, imageFile = null) => {
    const res = await apiAddLapangan(field, imageFile);
    const newField = mapFieldFromApi(res.data || res);
    setFieldList((prev) => [...prev, newField]);
    return newField;
  };

  const updateField = async (id, changes, imageFile = null) => {
    const res = await apiUpdateLapangan(id, changes, imageFile);
    const updatedField = mapFieldFromApi(res.data || res);
    setFieldList((prev) => prev.map((f) => (f.id === id ? updatedField : f)));
    return updatedField;
  };

  const deleteField = async (id) => {
    await apiDeleteLapangan(id);
    setFieldList((prev) => prev.filter((f) => f.id !== id));
  };

  const fetchStatistik = () => apiGetStatistik();
  const fetchLaporan = (start, end) => apiGetLaporan(start, end);

  return (
    <AppDataContext.Provider
      value={{
        bookingList,
        cancellationList,
        fieldList,
        slotList,
        fieldLoading,
        dataLoading,
        createBooking,
        updateBooking: updateBookingLocal,
        refreshBookings,
        refreshCancellations,
        verifyPayment,
        submitCancellation,
        confirmCancellation,
        extendBooking,
        loadJadwalForDate,
        refreshSlots,
        addField,
        updateField,
        deleteField,
        fetchStatistik,
        fetchLaporan,
        // legacy aliases
        addBooking: createBooking,
        addCancellation: submitCancellation,
        updateCancellation: () => {},
        deleteBooking: () => {},
        blockSlot: () => {},
        releaseSlot: () => {},
        updateSlotStatus: () => {},
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export function useAppData() {
  return useContext(AppDataContext);
}
