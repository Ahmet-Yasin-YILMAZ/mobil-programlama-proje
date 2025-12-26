import { OpenAI } from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Cloud Service (AI) Implementation - Kürşat Emircan BALTA
export const getAISuggestion = async (title) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Optimize this todo title for clarity: ${title}` }],
    });
    return response.choices[0].message.content;
  } catch (error) {
    return title; // Hata durumunda orijinal başlığı dön
  }
};