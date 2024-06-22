import { backend } from "./apis";

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
        const response = await backend.post(`/images/addslider`, params);

        return { ...response };
      } catch (error) {
        return { ...error?.response };
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
