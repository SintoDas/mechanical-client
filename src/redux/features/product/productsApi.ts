import { baseApi } from "../../api/baseApi";


const allProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: () => ({
        url: '/products',
        method: 'GET',
      }),
    }),
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`, // Use the product ID to fetch the specific product
        method: 'GET',
      }),
    }),
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: '/products/create-product',
        method: 'POST',
        body: newProduct,
      }),
    }),
    updateProduct: builder.mutation({
      query: ({ id, updatedProduct }) => ({
        url: `/products/${id}`, // Update the URL as per your API
        method: 'PUT', // Typically, PUT is used for updates
        body: updatedProduct,
      }),
    }),
  })
});

export const { useGetAllProductsQuery,useAddProductMutation, useGetSingleProductQuery, useUpdateProductMutation } =allProductApi;