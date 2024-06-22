import { URL } from "@common";
import axios from "axios";

const backend = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
});


const AuthAPIs = {
    Auth: {
       Register: async (params) => {
         try {
           const response = await backend.post(`auth/register`, params);
           return {...response};
         } catch (error) {
           console.error("Error fetching data:", error);
           throw error;
         }
       },
       Login: async (params) => {
         try {
           const response = await backend.post(`auth/login`, params);
           return {...response};
         } catch (error) {
           console.error("Error fetching data:", error);
           throw error;
         }
       },
     },
   };
   
export default AuthAPIs;