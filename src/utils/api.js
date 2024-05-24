// utils/api.js
const BASE_URL = "https://dev-api.stage.in";

const fetchApi = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Failed to fetch data");
    }

    return data;
  } catch (error) {
    console.error("Error fetching data:", error.message);
    throw error;
  }
};

export default fetchApi;
