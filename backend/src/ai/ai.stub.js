// backend/src/ai/ai.stub.js

// Gerçek bir AI servisine bağlanmıyoruz;
// sadece "stub" – simüle edilmiş bir akıllı öneri.
export async function suggestTodoTitle(currentTitle) {
  const title = (currentTitle || "").trim();

  if (!title) {
    return "Yeni bir yapılacak iş ekleyin";
  }

  // Basit sahte "AI" mantığı
  if (title.length < 10) {
    return `AI önerisi: ${title} için daha açıklayıcı bir başlık yazın (tarih, yer, detay ekleyin).`;
  }

  return `AI önerisi: "${title}" görevini küçük adımlara bölün ve önceliklendirin.`;
}
