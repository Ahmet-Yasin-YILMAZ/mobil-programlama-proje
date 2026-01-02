export const suggestTodoTitle = async (title) => {
  // Basit bir yapay zeka simülasyonu: Anahtar kelimelere göre farklı cevaplar üretir
  const lowerTitle = title.toLowerCase();

  if (lowerTitle.includes("kod") || lowerTitle.includes("yazılım")) {
    return "Algoritma yapısını kurun ve temiz kod prensiplerine (SOLID) dikkat edin.";
  } else if (lowerTitle.includes("ders") || lowerTitle.includes("sınav")) {
    return "Konu özetlerini çıkarın ve geçmiş yılların sorularını mutlaka çözün.";
  } else if (lowerTitle.includes("spor") || lowerTitle.includes("antrenman")) {
    return "Isınma hareketlerini ihmal etmeyin ve su tüketiminizi artırın.";
  } else {
    return `${title} için odaklanmanızı sağlayacak sessiz bir ortam hazırlayın.`;
  }
};