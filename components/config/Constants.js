const BASE_ENDPOINT = process.env.NEXT_PUBLIC_API_BASE;

export const APIEndpoints = {
  ADD_TRANSACTION: `${BASE_ENDPOINT}/api/v1/add/`,
  GET_DATA: `${BASE_ENDPOINT}/api/v1/data/`,
  SET_TABLE: `${BASE_ENDPOINT}/api/v1/set/`,
  TRANSACTION_DATA: `${BASE_ENDPOINT}/api/v1/transactions/`,
};
