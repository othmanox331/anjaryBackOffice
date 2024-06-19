import { URL } from "@common";
import axios from "axios";

const backend = axios.create({
  baseURL: URL,
  headers: { "Content-Type": "application/json" },
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
};

export default APIs;
