// export const USER_API_END_POINT="http://localhost:8000/api/v1/user";
// export const JOB_API_END_POINT="http://localhost:8000/api/v1/job";
// export const APPLICATION_API_END_POINT="http://localhost:8000/api/v1/application";
// export const COMPANY_API_END_POINT="http://localhost:8000/api/v1/company";
// frontend/src/utils/constant.js
// frontend/src/utils/constant.js
// frontend/src/utils/constant.js

// Use production backend on Netlify, local backend in development
const BASE_URL =
  typeof window !== "undefined" && window.location.hostname !== "localhost"
    ? "https://job-portal-web-7t1r.onrender.com"
    : "http://localhost:8000";

export const USER_API_END_POINT = `${BASE_URL}/api/v1/user`;
export const JOB_API_END_POINT = `${BASE_URL}/api/v1/job`;
export const APPLICATION_API_END_POINT = `${BASE_URL}/api/v1/application`;
export const COMPANY_API_END_POINT = `${BASE_URL}/api/v1/company`;
