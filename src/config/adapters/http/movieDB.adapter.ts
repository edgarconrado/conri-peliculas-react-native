import { AxiosAdapter } from "./axios.adapter";

export const movieDBFetcher = new AxiosAdapter({
   baseUrl: 'https://api.themoviedb.org/3/movie',
   params: {
    api_key: '1df4f5b954359f8d12bfb9e44b188a08',
    language: 'es',
   }
})