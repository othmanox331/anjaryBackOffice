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
    List: async (params) => {
      try {
        const response = await backend.post(`/product/list`, params);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    Add: async (params) => {
      try {
        let formData = new FormData();
        formData.append("Name", params.name);
        formData.append("Description", params.description);
        formData.append("Price", params.price);
        formData.append("isBestSeller", params.isBestSeller);
        formData.append("StockQuantity", params.stockQuantity);
        formData.append("CategoryId", params.category);
        params.images.forEach((item, index) => {
          formData.append(`Images[${index}].Image`, item.Image);
          formData.append(`Images[${index}].ImageName`, "kjk");
          formData.append(`Images[${index}].IsPrincipale`, item.isPrinciple);
        });
        console.log(params);
        const response = await backend_form_data.post(`/product/add`, formData);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },

    Update: async (params) => {
      try {
        const response = await backend.put(`/product/update`, params);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    GetById: async (id) => {
      try {
        const response = await backend.get(`/product/` + id);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    GetImagesById: async (id) => {
      try {
        const response = await backend.get(`/product/images/` + id);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    DeleteImage: async (name) => {
      try {
        const response = await backend.delete(`/product/images/delete/` + name);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    AddImage: async (image, id) => {
      let formData = new FormData();
      formData.append("image", image);
      formData.append("Id", id);
      try {
        const response = await backend.post(`/product/images/add`, formData);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
    Delete: async (id) => {
      try {
        const response = await backend.delete(`/product/delete/` + id);
        return response.data;
      } catch (error) {
        console.error("Error deleting :", error);
        throw error;
      }
    },
    UpdateIsPrinciple: async (params) => {
      try {
        const response = await backend.post(
          `/product/isprincipale/update/`,
          params
        );
        return response.data;
      } catch (error) {
        console.error("Error deleting :", error);
        throw error;
      }
    },
  },
  Category: {
    SelectList: async () => {
      try {
        const response = await backend.get(`/category/select/list`);

        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    },
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
