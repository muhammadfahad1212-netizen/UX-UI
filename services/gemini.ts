
import { GoogleGenAI } from "@google/genai";

export const getTopicExplanation = async (topicTitle: string): Promise<string> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `You are a world-class UX/UI mentor. 
      Briefly explain the following topic in a clear, professional, and minimal way (max 150 words): "${topicTitle}". 
      Include 1 key takeaway.`,
      config: {
        temperature: 0.7,
      },
    });
    return response.text || "I couldn't generate an explanation for this topic.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error: Could not connect to the AI mentor. Please check your API key.";
  }
};
