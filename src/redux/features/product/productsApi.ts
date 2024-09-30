import { baseApi } from "../../api/baseApi";

const allProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({ searchTerm = "", sort = "price", minPrice = "", maxPrice = "" }) => ({
        url: `/products?searchTerm=${encodeURIComponent(searchTerm)}&sort=${sort}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
        method: 'GET',
      }),
    }),
    
    getSingleProduct: builder.query({
      query: (id) => ({
        url: `/products/${id}`, // Fetch a single product by ID
        method: 'GET',
      }),
      // providesTags: (result, error, id) => [{ type: 'Product', id }], // Cache invalidation for a specific product
    }),
    
    addProduct: builder.mutation({
      query: (newProduct) => ({
        url: '/products/create-product',
        method: 'POST',
        body: newProduct,
      }),
      // invalidatesTags: ['Products'], // Invalidate product list after adding
    }),
    
    updateProduct: builder.mutation({
      query: ({ id, ...updatedProduct }) => ({
        url: `/products/${id}`, // Update a product by ID
        method: 'PUT',
        body: updatedProduct,
      }),
      // invalidatesTags: (result, error, { id }) => [{ type: 'Product', id }, 'Products'], // Invalidate both the product list and the specific product cache
    }),
    
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`, // Delete a product by ID
        method: 'DELETE',
      }),
      // invalidatesTags: ['Products'], // Invalidate the product list after deletion
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetSingleProductQuery,
  useAddProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = allProductApi;

export default allProductApi;
