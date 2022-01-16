import { APIEndpoints } from "../components/config/Constants";

export async function getPrice() {
  try {
    const data = await fetch(APIEndpoints.TICKER_PRICE);
    return data.json();
  } catch (err) {
    return false;
  }
}
