// backend/src/lib/httpError.js

/**
 * Standart HTTP hata nesnesi üretmek için yardımcı fonksiyon.
 * 
 * Kullanım:
 *   throw httpError(404, "Todo not found");
 *   next(httpError.badRequest("title is required"));
 */

const DEFAULT_MESSAGES = {
  400: "Bad Request",
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  409: "Conflict",
  500: "Internal Server Error",
};

/**
 * Generic hata üreticisi
 * @param {number} status HTTP status kodu
 * @param {string} [message] İsteğe bağlı özel mesaj
 * @param {object} [extra] Ek alanlar (context, code vs.)
 * @returns {Error} status, isHttpError, details alanları ekli Error
 */
export function httpError(status, message, extra = {}) {
  const finalMessage = message || DEFAULT_MESSAGES[status] || "Error";

  const err = new Error(finalMessage);
  err.status = status;
  err.isHttpError = true;
  err.details = extra;

  return err;
}

// Convenience helpers

export function badRequest(message, extra) {
  return httpError(400, message, extra);
}

export function unauthorized(message, extra) {
  return httpError(401, message, extra);
}

export function forbidden(message, extra) {
  return httpError(403, message, extra);
}

export function notFound(message, extra) {
  return httpError(404, message, extra);
}

export function conflict(message, extra) {
  return httpError(409, message, extra);
}

export function internal(message, extra) {
  return httpError(500, message, extra);
}
