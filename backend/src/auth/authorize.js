// backend/src/auth/authorize.js

import { getCurrentUser } from "./currentUser.mock.js";

/**
 * RBAC middleware:
 *   - allowedRoles: ["ADMIN"], ["ADMIN", "USER"] vs.
 */
export function authorize(allowedRoles = []) {
  return (req, res, next) => {
    const user = getCurrentUser(req);

    if (!user || !allowedRoles.includes(user.role)) {
      return res.status(403).json({ error: "forbidden" });
    }

    req.user = user;
    return next();
  };
}
