import axios from 'axios';

export const generateRealRoadmap = async (taskTitle) => {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "meta-llama/llama-3.3-70b-instruct:free", // Stabil OpenAI alternatifi
        messages: [
          {
            role: "system",
            content: "Sen profesyonel bir asistansın. Görevi tamamlamak için tam olarak 4 kısa adım oluştur. Yanıtı sadece adımların arasına virgül koyarak Türkçe ver."
          },
          { role: "user", content: `Görev: "${taskTitle}".` }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000"
        }
      }
    );

    const content = response.data.choices[0].message.content;
    return content.split(",").map(step => step.trim()).slice(0, 4);
  } catch (error) {
    const msg = error.response?.data?.error?.message || "AI şu an meşgul, lütfen tekrar deneyin.";
    throw new Error(msg);
  }
};