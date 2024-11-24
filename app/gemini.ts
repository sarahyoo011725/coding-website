import { GoogleGenerativeAI } from "@google/generative-ai";

export const genAi = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
export const gemini_flash = genAi.getGenerativeModel({model: "gemini-1.5-flash"});