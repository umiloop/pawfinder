import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the API with your API key
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY ;
const genAI = new GoogleGenerativeAI(API_KEY);

export const GeminiService = {
  async getChatResponse(prompt: string): Promise<string> {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
      const result = await model.generateContent(
        `You are a helpful pet adoption assistant for Paw Finder. You help people with questions about pet adoption, pet care, and our services. 
         Keep your responses friendly, informative, and focused on helping people adopt pets.
         
         User question: ${prompt}`
      );
      
      
      const response = await result.response;
      return response.text();
    } catch (error) {
      console.error('Error getting response from Gemini:', error);
      throw error;
    }
  }
};