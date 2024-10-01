import { baseApi } from "../../api/baseApi";
// Define the query argument type
type GetAllProductsQueryArgs = {
  searchTerm?: string;
  sort?: string;
  minPrice?: number;
  maxPrice?: number;
  page?: number;
  limit?: number;
};

const allProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<any, GetAllProductsQueryArgs>({
      query: ({ searchTerm = "", sort = "price", minPrice = 0, maxPrice = Infinity, page = 1, limit = 6 } = {}) => {
        const params = new URLSearchParams();
    
        if (searchTerm) params.append('searchTerm', searchTerm);
        if (sort) params.append('sort', sort);
        if (minPrice !== undefined) params.append('minPrice', minPrice.toString());
        if (maxPrice !== undefined) params.append('maxPrice', maxPrice.toString());
        params.append('page', page.toString());
        params.append('limit', limit.toString());
    
        return {
          url: `/products?${params.toString()}`,
          method: 'GET',
        };
      },
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
