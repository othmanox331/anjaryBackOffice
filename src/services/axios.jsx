import { URL } from "@common";
import axios from "axios";

const backend = axios.create({
  baseURL: URL,
  headers: {
    "Content-Type": "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTkwNzQ3NzAsImlzcyI6IkFuamFyeVN0b3JlLmNvbSIsImF1ZCI6IkFuamFyeVN0b3JlIn0.o6_ZBO7tuRchJK3Va6zJD7tFOFj7YIV8YHU4qgHzX_w",
  },
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
  Category: {
    List: async (size, page, searchValue) => {
      try {
        let data = {
          size: size,
          page: page,
          searchValue: searchValue,
        };
        const response = await backend.post(`${URL}category/list`, data);

        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    Add: async (params) => {
      try {
        let formData = new FormData();
        formData.append("Name", params.Name);
        formData.append("IsHome", params.IsHome);
        formData.append("Title", params.Title);
        formData.append("Image", params.Image);

        const response = await backend.post(`${URL}category/add`, formData);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    GetById: async (id) => {
      try {
        const response = await backend.get(`${URL}category/` + id);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
  },
};

export default APIs;
