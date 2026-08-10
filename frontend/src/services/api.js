// Central API service - connects frontend to backend
const BASE_URL = import.meta.env.PROD ? '' : 'http://localhost:5000';

const getHeaders = () => {
  const token = localStorage.getItem('neermitra_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const handleResponse = async (res) => {
  let data;
  try {
    data = await res.json();
  } catch (err) {
    throw new Error('Server is waking up from sleep. Please wait 30 seconds and try again!');
  }
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
};

// ─── Offline Caching Wrapper ───────────────────────────────
const fetchWithCache = async (url, options = {}) => {
  try {
    const res = await fetch(url, options);
    const data = await handleResponse(res);
    if (options.method === 'GET' || !options.method) {
      localStorage.setItem(`neermitra_cache_${url}`, JSON.stringify(data));
    }
    return data;
  } catch (error) {
    if (options.method === 'GET' || !options.method) {
      const cached = localStorage.getItem(`neermitra_cache_${url}`);
      if (cached) {
        console.warn('Network failed. Loading from local cache:', url);
        return JSON.parse(cached);
      }
    }
    throw error;
  }
};

// ─── Auth APIs ───────────────────────────────────────────────
export const registerUser = (payload) =>
  fetchWithCache(`${BASE_URL}/api/auth/register`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(payload) });

export const loginUser = (payload) =>
  fetchWithCache(`${BASE_URL}/api/auth/login`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(payload) });

export const getProfile = () =>
  fetchWithCache(`${BASE_URL}/api/auth/me`, { headers: getHeaders() });

// ─── Journal APIs ─────────────────────────────────────────────
export const getJournals = () =>
  fetchWithCache(`${BASE_URL}/api/journal`, { headers: getHeaders() });

export const saveJournal = (payload) =>
  fetchWithCache(`${BASE_URL}/api/journal`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(payload) });

// ─── AI Advisor API ──────────────────────────────────────────
export const askAdvisor = (query) =>
  fetchWithCache(`${BASE_URL}/api/advisor`, { method: 'POST', headers: getHeaders(), body: JSON.stringify({ query }) });

// ─── Reports APIs ────────────────────────────────────────────
export const getReports = (params = {}) => {
  const query = new URLSearchParams(params).toString();
  return fetchWithCache(`${BASE_URL}/api/reports?${query}`, { headers: getHeaders() });
};

export const submitReport = (payload) =>
  fetchWithCache(`${BASE_URL}/api/reports`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(payload) });

export const upvoteReport = (id) =>
  fetchWithCache(`${BASE_URL}/api/reports/${id}/upvote`, { method: 'PUT', headers: getHeaders() });

// ─── Crop Planner APIs ───────────────────────────────────────
export const getCropRecommendation = (payload) =>
  fetchWithCache(`${BASE_URL}/api/crops/recommend`, { method: 'POST', headers: getHeaders(), body: JSON.stringify(payload) });

export const getWaterHealth = () =>
  fetchWithCache(`${BASE_URL}/api/crops/water-health`, { headers: getHeaders() });

export const detectDisease = (payload) => {
  const headers = getHeaders();
  headers['Content-Type'] = 'application/json';
  return fetchWithCache(`${BASE_URL}/api/crops/detect-disease`, { method: 'POST', headers, body: JSON.stringify(payload) });
};

// ─── Government Schemes APIs ─────────────────────────────────
export const getSchemes = (search = '') =>
  fetchWithCache(`${BASE_URL}/api/schemes?search=${search}`, { headers: getHeaders() });

// ─── Impact APIs ─────────────────────────────────────────────
export const getImpactStats = () =>
  fetchWithCache(`${BASE_URL}/api/impact/stats`, { headers: getHeaders() });

export const getLeaderboard = () =>
  fetchWithCache(`${BASE_URL}/api/impact/leaderboard`, { headers: getHeaders() });

export const getBadges = () =>
  fetchWithCache(`${BASE_URL}/api/impact/badges`, { headers: getHeaders() });

// ─── Payment APIs ─────────────────────────────────────────────
export const getPlans = () =>
  fetchWithCache(`${BASE_URL}/api/payment/plans`, { headers: getHeaders() });

export const createOrder = (planId) =>
  fetchWithCache(`${BASE_URL}/api/payment/create-order`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify({ planId }),
  });

export const verifyPayment = (payload) =>
  fetchWithCache(`${BASE_URL}/api/payment/verify`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(payload),
  });
