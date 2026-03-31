import axios from 'axios';

const API_URL = "https://pawfinder-backend.onrender.com/api";

export interface MissingPetReport {
  id: number;
  petName: string;
  petType: string;
  breed: string;
  age: number;
  ageUnit: string;
  gender: string;
  description: string;
  location_coordinates: string;
  location_address: string;
  location_city: string;
  location_details: string;
  userId: number;
  username: string;
  ownerName: string;
  phoneNumber: string;
  email: string;
  contactPreference: string;
  offerReward: boolean;
  rewardAmount: number;
  reviewStatus: string;
  photoURLs: string[];
  createdAt: string;
}

export class RescueService {
  static async getAllMissingPetReports(): Promise<MissingPetReport[]> {
    try {
      const response = await axios.get(`${API_URL}/pets/missingpets`);
      return response.data;
    } catch (error) {
      console.error('Error fetching missing pet reports:', error);
      throw error;
    }
  }
} 