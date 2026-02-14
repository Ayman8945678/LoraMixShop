
import {GoogleGenAI} from "@google/genai";
import { Product } from "../types";
import { MOCK_PRODUCTS } from "../constants";

// Fix: Always use the named parameter `apiKey` and access `process.env.API_KEY` directly for initialization.
const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

export const getShoppingAdvice = async (userPrompt: string, cart: Product[]): Promise<string> => {
  try {
    const productsContext = MOCK_PRODUCTS.map(p => 
      `${p.name} ($${p.price}): ${p.description}`
    ).join('\n');
    
    const cartContext = cart.length > 0 
      ? `User currently has these in cart: ${cart.map(c => c.name).join(', ')}`
      : "User's cart is empty.";

    // Fix: Call `generateContent` directly from `ai.models` with both model and contents.
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

    // Fix: Access the `.text` property directly as it is a getter, not a method.
    return response.text || "I apologize, I'm having trouble processing that right now. How else can I assist you with your luxury tech needs?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm currently offline, but our collection remains available for your perusal.";
  }
};
