// backend/src/security/rateLimit.stub.js

const WINDOW_MS = 60_000; // 1 dakika
const MAX_REQUESTS = 10;  // 1 dakikada en fazla 10 istek

// IP -> { count, firstRequestAt }
const ipStore = new Map();

export function rateLimit(req, res, next) {
  const now = Date.now();
  const ip =
    req.ip ||
    req.headers["x-forwarded-for"] ||
    req.connection?.remoteAddress ||
    "unknown";

  let entry = ipStore.get(ip);

  // Yeni pencere başlat
  if (!entry || now - entry.firstRequestAt > WINDOW_MS) {
    entry = { count: 0, firstRequestAt: now };
  }

  entry.count += 1;
  ipStore.set(ip, entry);

  // Limit aşıldı mı?
  if (entry.count > MAX_REQUESTS) {
    return res.status(429).json({
      error: "too_many_requests",
      message: "Çok fazla istek gönderdiniz, lütfen biraz sonra tekrar deneyin.",
    });
  }

  // Bilgi amaçlı header’lar
  res.setHeader("X-RateLimit-Limit", String(MAX_REQUESTS));
  res.setHeader("X-RateLimit-Remaining", String(Math.max(0, MAX_REQUESTS - entry.count)));
  res.setHeader("X-RateLimit-Reset", String(entry.firstRequestAt + WINDOW_MS));

  return next();
}
