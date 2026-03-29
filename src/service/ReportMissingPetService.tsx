import axios from "axios";

const API_URL = "http://localhost:8080/api/pets/reportmissingpet";

export const reportMissingPet = async (data: any) => {
  try {
    console.log("Sending data to backend:", JSON.stringify(data, null, 2));
    const response = await axios.post(API_URL, data, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Response from backend:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Error reporting missing pet:", error);
    console.error("Error response data:", error.response?.data);
    console.error("Error status:", error.response?.status);
    console.error("Error headers:", error.response?.headers);
    throw error.response?.data || "An error occurred";
  }
};