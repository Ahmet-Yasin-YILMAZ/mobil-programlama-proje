// src/ai/roadmapService.js
exports.generateRoadmap = async (taskTitle) => {
    // OpenAI/Gemini bağlandığında buraya API çağrısı gelecek.
    // Şimdilik test için dummy (sahte) veri dönüyoruz:
    return [
        `${taskTitle} için gerekli malzemeleri hazırla`,
        "Temel adımları planla",
        "İlk uygulamayı gerçekleştir",
        "Hataları kontrol et ve düzelt",
        "Görevi başarıyla tamamla"
    ];
};