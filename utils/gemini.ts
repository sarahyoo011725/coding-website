import { GoogleGenerativeAI } from "@google/generative-ai";

export const gemini_ai = new GoogleGenerativeAI(process.env.GEMINI_AI);
export const gemini_flash = gemini_ai.getGenerativeModel({model: "gemini-1.5-flash"});