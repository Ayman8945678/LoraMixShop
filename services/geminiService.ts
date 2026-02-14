
import {GoogleGenAI} from "@google/genai";
import { Product } from "../types";
import { MOCK_PRODUCTS } from "../constants";

const getAIClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key is missing. AI assistant features will be limited.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const getShoppingAdvice = async (userPrompt: string, cart: Product[]): Promise<string> => {
  try {
    const ai = getAIClient();
    if (!ai) return "I'm currently maintaining my circuits. How else can I assist you with our collection?";

    const productsContext = MOCK_PRODUCTS.map(p => 
      `${p.name} ($${p.price}): ${p.description}`
    ).join('\n');
    
    const cartContext = cart.length > 0 
      ? `User currently has these in cart: ${cart.map(c => c.name).join(', ')}`
      : "User's cart is empty.";

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are an elite, high-end shopping assistant for "EliteGadget".
      Help the user with their request. Be polite, professional, and slightly luxury-oriented.
      
      Available Products:
      ${productsContext}
      
      ${cartContext}
      
      User request: "${userPrompt}"`,
      config: {
        systemInstruction: "You are a luxury tech concierge. Recommend products based on value and quality. Keep answers concise.",
        temperature: 0.7,
      },
    });

    return response.text || "I apologize, I'm having trouble processing that right now. How else can I assist you with your luxury tech needs?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm currently offline, but our collection remains available for your perusal.";
  }
};