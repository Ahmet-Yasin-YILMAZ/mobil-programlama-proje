const express = require('express');
const router = express.Router();

// GÖREV SİLME
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Burada veritabanı silme işlemini yap: await Task.findByIdAndDelete(id);
        res.json({ message: "Görev başarıyla silindi", id });
    } catch (error) {
        res.status(500).json({ error: "Silme işlemi başarısız" });
    }
});

// GÖREV DÜZENLEME (Update)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, dueDate } = req.body;

        // Backend tarafında tarih doğrulaması
        const today = new Date();
        today.setHours(0,0,0,0);
        if (new Date(dueDate) < today) {
            return res.status(400).json({ error: "Geçmiş bir tarih atanamaz!" });
        }

        // Güncelleme işlemi: await Task.findByIdAndUpdate(id, { title, dueDate });
        res.json({ message: "Görev güncellendi", updatedTask: { id, title, dueDate } });
    } catch (error) {
        res.status(500).json({ error: "Güncelleme hatası" });
    }
});

module.exports = router;