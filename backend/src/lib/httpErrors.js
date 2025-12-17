export function badRequest(message = "Bad Request") {
  const err = new Error(message);
  err.status = 400;
  return err;
}
