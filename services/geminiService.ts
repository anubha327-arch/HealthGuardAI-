import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateHealthTip = async (): Promise<string> => {
  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: 'Provide a single, short, actionable daily health tip (max 20 words) for a general audience. Keep it encouraging.',
    });
    return response.text || "Stay hydrated and keep moving!";
  } catch (error) {
    console.error("Error generating tip:", error);
    return "Drink water and take a short walk today.";
  }
};

export const chatWithHealthAssistant = async (
  history: { role: 'user' | 'model'; text: string }[],
  newMessage: string
): Promise<string> => {
  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "You are a helpful, empathetic, and professional health assistant. You provide general wellness advice, explain medical terms simply, and help users navigate their health journey. IMPORTANT: You must always include a disclaimer that you are an AI and not a doctor, especially for symptom analysis. Keep answers concise and mobile-friendly.",
      },
      history: history.map(h => ({
        role: h.role,
        parts: [{ text: h.text }],
      })),
    });

    const response = await chat.sendMessage({ message: newMessage });
    return response.text || "I apologize, I couldn't process that request.";
  } catch (error) {
    console.error("Chat error:", error);
    return "I'm having trouble connecting right now. Please try again later.";
  }
};