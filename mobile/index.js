import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 dakika
  max: 100 // IP başına 100 istek sınırı
});

app.use(limiter); // Web Security Implementation: Rate Limiting