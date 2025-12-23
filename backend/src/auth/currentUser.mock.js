// backend/src/auth/currentUser.mock.js

import { Roles } from "./roles.js";

export function getCurrentUser(req) {
  // İstediğin rolu header’dan gönder:
  //  - x-user-role: ADMIN
  //  - x-user-role: USER
  const roleFromHeader = req.header("x-user-role");

  const role = roleFromHeader === Roles.ADMIN ? Roles.ADMIN : Roles.USER;

  return {
    id: "demo-user",
    role,
  };
}
