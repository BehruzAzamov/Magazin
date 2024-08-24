import axios from "axios";

const mainUrl = "https://json-api.uz/api/project/devjob";

export const axiosClient = axios.create({
  baseURL: mainUrl,
});

axiosClient.interceptors.request.use((config) => {
  const token = window.localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh_token = window.localStorage.getItem("refresh_token");

      try {
        const { data } = await axios.post(`${mainUrl}/auth/refresh-token`, {
          refresh_token,
        });

        window.localStorage.setItem("access_token", data.access_token);
        axiosClient.defaults.headers.Authorization = `Bearer ${data.access_token}`;

        return axiosClient(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token error:", refreshError.message);
        window.localStorage.removeItem("access_token");
        window.localStorage.removeItem("refresh_token");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);