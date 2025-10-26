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
      typeof window !== "undefined" ? localStorage.getItem("token") : null;

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

request.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    const status = error?.response?.status;
    if (typeof window !== "undefined") {
      const path = window.location.pathname;

      if ([401, 403].includes(status)) {
        const isLoginPage = path === "/" || path.includes("login");

        if (!isLoginPage) {
          message.error("Iltimos, qayta tizimga kiring.");
          localStorage.clear();
          window.location.pathname = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default request;
