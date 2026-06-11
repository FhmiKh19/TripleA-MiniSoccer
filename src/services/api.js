const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const getHeaders = () => ({
  'Content-Type': 'application/json',
  'Accept': 'application/json',
  ...(localStorage.getItem('token') && {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  }),
});

const handleResponse = async (response) => {
  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');
  const body = isJson ? await response.json().catch(() => null) : null;

  if (!response.ok) {
    return body || { message: body?.message || response.statusText || 'Terjadi kesalahan jaringan.' };
  }

  return body;
};

// AUTH
export const apiLogin = (email, password) =>
  fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ email, password }),
  }).then(handleResponse);

export const apiRegister = (data) =>
  fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const apiLogout = () =>
  fetch(`${BASE_URL}/logout`, {
    method: 'POST',
    headers: getHeaders(),
  }).then(handleResponse);

// LAPANGAN
export const apiGetLapangan = () =>
  fetch(`${BASE_URL}/lapangan`, { headers: getHeaders() }).then(handleResponse);

export const apiAddLapangan = (data) =>
  fetch(`${BASE_URL}/lapangan`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const apiUpdateLapangan = (id, data) =>
  fetch(`${BASE_URL}/lapangan/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const apiDeleteLapangan = (id) =>
  fetch(`${BASE_URL}/lapangan/${id}`, {
    method: 'DELETE',
    headers: getHeaders(),
  }).then(handleResponse);

export const apiToggleStatusLapangan = (id) =>
  fetch(`${BASE_URL}/lapangan/${id}/status`, {
    method: 'PATCH',
    headers: getHeaders(),
  }).then(handleResponse);

// BOOKING
export const apiGetBooking = () =>
  fetch(`${BASE_URL}/booking`, { headers: getHeaders() }).then(handleResponse);

export const apiCreateBooking = (data) =>
  fetch(`${BASE_URL}/booking`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(data),
  }).then(handleResponse);

export const apiVerifyPayment = (id) =>
  fetch(`${BASE_URL}/booking/${id}/verify`, {
    method: 'PATCH',
    headers: getHeaders(),
  }).then(handleResponse);

export const apiGetJadwal = (date) =>
  fetch(`${BASE_URL}/jadwal?date=${date}`, { headers: getHeaders() }).then(handleResponse);

// PEMBATALAN
export const apiAjukanPembatalan = (bookingId, reason) =>
  fetch(`${BASE_URL}/pembatalan`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ booking_id: bookingId, reason }),
  }).then(handleResponse);

export const apiGetPembatalan = () =>
  fetch(`${BASE_URL}/pembatalan`, { headers: getHeaders() }).then(handleResponse);

export const apiKonfirmasiPembatalan = (id, action) =>
  fetch(`${BASE_URL}/pembatalan/${id}/konfirmasi`, {
    method: 'PATCH',
    headers: getHeaders(),
    body: JSON.stringify({ action }), // "setujui" atau "tolak"
  }).then(handleResponse);

// STATISTIK & LAPORAN
export const apiGetStatistik = () =>
  fetch(`${BASE_URL}/statistik`, { headers: getHeaders() }).then(handleResponse);

export const apiGetLaporan = (start, end) =>
  fetch(`${BASE_URL}/laporan?start=${start}&end=${end}`, { headers: getHeaders() }).then(handleResponse);
