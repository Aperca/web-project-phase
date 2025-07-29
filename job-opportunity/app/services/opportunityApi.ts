'use client';

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const opportunityApi = createApi({
  reducerPath: 'opportunityApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://akil-backend.onrender.com/' }),
  endpoints: (builder) => ({
    getOpportunities: builder.query<any, void>({
      query: () => 'opportunities/search',
    }),
    getJobById: builder.query<any, string>({
      query: (id) => `opportunities/${id}`,
    }),
  }),
});

export const { useGetOpportunitiesQuery, useGetJobByIdQuery } = opportunityApi;
