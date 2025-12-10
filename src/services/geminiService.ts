import { GoogleGenAI } from "@google/genai";

// Safely retrieve API Key to prevent crashes if process is undefined
const getApiKey = (): string => {
  try {
    if (typeof process !== "undefined" && process.env) {
      return process.env.API_KEY || "";
    }
  } catch (e) {
    console.warn("Unable to access process.env");
  }
  return "";
};

const apiKey = getApiKey();
const ai = new GoogleGenAI({ apiKey });

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
  if (!apiKey) {
    return "API Key is missing or environment is not configured correctly.";
  }

  try {
    const model = 'gemini-2.5-flash';
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
    return "I am currently offline due to a network error. Please try again later.";
  }
};