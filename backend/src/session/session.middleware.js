// backend/src/session/session.middleware.js
import cookieParser from "cookie-parser";

export function withSession(app) {
  app.use(cookieParser());

  // Cookie içinden user bilgisi al
  app.use((req, res, next) => {
    const rawUser = req.cookies.user;

    if (rawUser) {
      try {
        req.user = JSON.parse(rawUser);
      } catch (err) {
        req.user = null;
      }
    }

    next();
  });
}
