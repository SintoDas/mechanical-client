import { baseApi } from "../../api/baseApi";


const singleProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleProduct: builder.query({
      query: () => ({
        url: '/products/:id',
        method: 'GET',
      }),
    }),
  }),
});

export const {useGetSingleProductQuery} =singleProductApi;