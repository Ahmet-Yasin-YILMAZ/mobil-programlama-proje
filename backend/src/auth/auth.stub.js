export function validateToken(req) {
  const header = req.headers.authorization || "";
  return header.startsWith("Bearer ");
}
