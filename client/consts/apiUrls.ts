const apiBaseUrl = import.meta.env.VITE_API_BASE_URL + '/api';

export default {
  GET_ALL_BOOKS: `${apiBaseUrl}/books`,
  GET_BOOK_BY_ID: (id: string) => `${apiBaseUrl}/books/${id}`,
  DELETE_BOOK_BY_ID: (id: string) => `${apiBaseUrl}/books/${id}`,
  CREATE_BOOK: `${apiBaseUrl}/books`,
};
