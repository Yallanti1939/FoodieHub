
import { GoogleGenAI } from "@google/genai";

/**
 * Formats a number as Indian Rupee (INR) currency.
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

/**
 * Performs a simple fuzzy search on a string.
 */
export const fuzzyMatch = (text: string, query: string): boolean => {
  if (!query) return true;
  const normalizedText = text.toLowerCase();
  const normalizedQuery = query.toLowerCase();
  
  // Basic includes check
  if (normalizedText.includes(normalizedQuery)) return true;
  
  // Keyword matching (checks if all words in query appear in text)
  const keywords = normalizedQuery.split(/\s+/).filter(k => k.length > 0);
  return keywords.every(kw => normalizedText.includes(kw));
};

/**
 * Generates an AI image for a dish or restaurant using Gemini.
 */
export const generateAIImage = async (prompt: string): Promise<string | null> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: `High-quality, professional food photography of ${prompt}. Clean background, appetizing lighting, appetizing presentation, 4k.`,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
    return null;
  } catch (error) {
    console.error("Failed to generate AI image:", error);
    return null;
  }
};
