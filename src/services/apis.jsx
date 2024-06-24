import { URL } from "@common";
import axios from "axios";
import { store } from "../redux/store";
import { toast } from "react-toastify";
import jwt_decode from "jwt-decode";
import { LOGOUT } from "@redux/account/types";

export const backend = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
});

backend.interceptors.request.use(
  (config) => {
    const access_token = store?.getState()?.account?.user?.token;
    if (!!access_token) {
      const { exp } = jwt_decode(access_token);
      const DateExp = new Date(exp * 1000);
      if (DateExp <= new Date()) {
        store.dispatch({ type: LOGOUT });
        toast.error(
          "Votre compte a expiré, veuillez réessayer de vous connecter"
        );
        return config;
      } else {
        config.headers.Authorization = `Bearer ${access_token}`;
        config.headers["Content-Type"] = "application/json";
        return config;
      }
    }
  },
  (error) => {
    if (error) {
      store.dispatch({ type: LOGOUT });
      toast.error(
        "Votre compte a expiré, veuillez réessayer de vous connecter"
      );
      //   navigate("/");
    }
  }
);
