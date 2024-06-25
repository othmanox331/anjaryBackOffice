import { backend, backend_form_data } from "./apis";

const APIs = {
  Order: {
    Add: async (params) => {
      try {
        const response = await backend.post(`/order/add`, params);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },

    List: async () => {
      try {
        const response = await backend.get(`/order/list`);
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
        const response = await backend.get(`/product/selectlist`);
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
        const response = await backend.post(`/category/list`, data);

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

        const response = await backend_form_data.post(
          `/category/add`,
          formData
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    Update: async (params) => {
      try {
        let formData = new FormData();
        formData.append("id", params.id);
        formData.append("Name", params.Name);
        formData.append("IsHome", params.IsHome);
        formData.append("Title", params.Title);
        // formData.append("Image", params.Image);

        const response = await backend_form_data.put(
          `/category/update`,
          formData
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    GetById: async (id) => {
      try {
        const response = await backend.get(`/category/` + id);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    Delete: async (id) => {
      try {
        const response = await backend.delete(`/category/delete?id=` + id);
        return response.data;
      } catch (error) {
        console.error("Error deleting :", error);
        throw error;
      }
    },
    UpdateImage: async (id, image) => {
      try {
        let formData = new FormData();
        formData.append("id", id);
        formData.append("image", image.file);
        const response = await backend_form_data.put(
          `/category/image/update`,
          formData
        );
        return response.data;
      } catch (error) {
        console.error("Error deleting :", error);
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
  Images: {
    getImage: async (name) => {
      try {
        const response = await backend.get(`/images/${name}`);
        return response;
      } catch (error) {
        return { ...error?.response };
      }
    },
  },
};

export default APIs;
