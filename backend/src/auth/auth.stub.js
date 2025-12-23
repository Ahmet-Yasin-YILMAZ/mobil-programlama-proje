// backend/src/auth/auth.stub.js

/**
 * Basit bir authorization middleware'i.
 * 
 * Beklenen header'lar:
 *  - x-user-id: kullanıcının ID'si (zorunlu)
 *  - x-user-role: rolü (opsiyonel, yoksa "USER" kabul ederiz)
 *
 * Eğer x-user-id yoksa -> 401 döner.
 * Varsa -> req.user içine user bilgisini koyar ve next() der.
 */
export function requireAuth(req, res, next) {
  const userId = req.header("x-user-id");
  const userRole = req.header("x-user-role") || "USER";

  if (!userId) {
    return res.status(401).json({ error: "unauthorized" });
  }

  req.user = {
    id: userId,
    role: userRole,
  };

  return next();
}
