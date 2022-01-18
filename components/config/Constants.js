const BASE_ENDPOINT = process.env.NEXT_PUBLIC_API_BASE;

export const APIEndpoints = {
  ADD_TRANSACTION: `${BASE_ENDPOINT}/api/v1/add/`,
  GET_DATA: `${BASE_ENDPOINT}/api/v1/data/`,
  TRANSACTION_DATA: `${BASE_ENDPOINT}/api/v1/transactions/`,
  TICKER_PRICE: `${BASE_ENDPOINT}/api/v1/price/`,
};
