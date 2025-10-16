// src/services/api.ts
import { message } from "antd";
import axios, {
  InternalAxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

interface RequestConfig extends InternalAxiosRequestConfig {
  i18n?: any;
}

const request = axios.create({
  baseURL: BASE_URL,
  timeout: 30000,
});

request.interceptors.request.use(
  (config: RequestConfig) => {
    const token =
      typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

    let rawLang =
      config.headers?.["Accept-Language"] ??
      (typeof window !== "undefined"
        ? localStorage.getItem("i18nextLng")
        : null);

    let mappedLang = rawLang === "uzcyrl" ? "uz-cyrl" : rawLang;

    if (!config.headers) config.headers = {} as AxiosRequestHeaders;
    config.headers["Accept-Language"] = mappedLang?.toUpperCase() ?? "EN";

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
request.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const status = error?.response?.status;
    if (typeof window !== "undefined") {
      const location = window.location.pathname;
      const isAdminRoute = location.startsWith("/dashboard");

      if (status === 401 || status === 403) {
        message.error("Iltimos qayta tizimga kiring.");
        sessionStorage.clear();

        if (isAdminRoute) {
          window.location.pathname = "/dashboard/login";
        } else {
          window.location.pathname = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default request;
