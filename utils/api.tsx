import axios from "axios";

export default async () => {
  try {
    const response = await axios.get("https://api.covid19api.com/countries");

    return response.data.sort(
      (a, b) => {
        if (a.Country > b.Country) {
          return 1;
        }
        if (a.Country < b.Country) {
          return -1;
        }
        return 0;
      }
    );

  } catch (error) {
    return [{"error": "Cannot retrieve countries"}];
  }
}