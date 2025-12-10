import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are an AI assistant for the portfolio website of Kushal Khanal.
Kushal is an AI Engineer and student.
Here is his background info:
- Name: Kushal Khanal
- Age: 18
- Date of Birth: 2007-10-27 AD
- Gender: Male
- Permanent Address: Syangja
- Current Address: Kirtipur
- Employment/Income Status: Unemployed (Currently a Student)
- Education: Currently studying B.Tech in AI at NIET College, Kupondole. Completed High School at Capitol Hill College.
- Skills: Python, JavaScript, React, TensorFlow, AI/ML, Data Science.
- Contact: kushalgamer5656@gmail.com
- Social: Facebook (kushal.khanal.391505)
- Personality: Professional, futuristic, enthusiastic about technology.

Answer questions about Kushal as if you are his digital representative. Keep answers concise (under 100 words) and professional yet friendly.
If asked about something unrelated to Kushal or AI, politely steer the conversation back to his portfolio.
`;

export const sendMessageToGemini = async (message: string): Promise<string> => {
  try {
    const apiKey = import.meta.env.VITE_API_KEY;

    if (!apiKey) {
      console.warn("Gemini API Key is missing. Chat functionality is disabled.");
      return "I'm sorry, my connection to the AI brain is currently unconfigured (API Key missing). Please check back later.";
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.0-flash-exp'; // Updated to valid model or fallback

    const response = await ai.models.generateContent({
      model: model,
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });

    return response.text || "I processed that, but have no text response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I am currently offline due to a network error or API configuration issue. Please try again later.";
  }
};