import { URL } from "@common";
import axios from "axios";

const backend = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
});
const backend_for_files = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "multipart/form-data" },
});

const APIs = {
  Order: {
    Add: async (params) => {
      try {
        const response = await backend.post(`${URL}order/add`, params);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },

    List: async () => {
      try {
        const response = await backend.get(`${URL}order/list`);
        if (Array.isArray(response.data)) {
          return response.data;
        } else {
          // Transform the response data to an array if necessary
          return Object.values(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  },
  Product: {
    SelectList: async () => {
      try {
        const response = await backend.get(`${URL}product/selectlist`);
        if (Array.isArray(response.data)) {
          return response.data;
        } else {
          // Transform the response data to an array if necessary
          return Object.values(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  },
  Slider: {
    addNewSlider: async (params) => {
      try {
        const token =
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTkwMTQ2MDEsImlzcyI6IkFuamFyeVN0b3JlLmNvbSIsImF1ZCI6IkFuamFyeVN0b3JlIn0.7K811rlEmL99KKtHV_J6xUGHOSJTAvxqzH6cTB0ekI0"; // Replace with actual token retrieval logic
        const response = await backend_for_files.post(
          `/images/addslider`,
          params,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the Authorization header
            },
          }
        );
        
        return  {...response};
      } catch (error) {
        return {...error?.response}
      }
    },
    List: async () => {
      try {
        const response = await backend.get(`/images/getsliders`);
        if (Array.isArray(response.data)) {
          return response;
        } else {
          // Transform the response data to an array if necessary
          return Object.values(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  },
};

export default APIs;
