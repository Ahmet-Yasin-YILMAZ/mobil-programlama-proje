// src/routes/aiRoutes.js
const express = require('express');
const router = express.Router();
const { generateTaskRoadmap } = require('../ai/aiService');

router.post('/roadmap', async (req, res) => {
    try {
        const { title } = req.body;
        const roadmap = await generateTaskRoadmap(title);
        res.status(200).json({ roadmap });
    } catch (error) {
        res.status(500).json({ error: "AI Hatası oluştu" });
    }
});
module.exports = router;