/**
 * Feature 7: Session / Cookie Management
 * Cookie tabanlı refresh token yönetimi 
 */
export const setSessionCookie = (res, refreshToken) => {
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true, // XSS saldırılarına karşı koruma [cite: 19]
    secure: process.env.NODE_ENV === 'production', 
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 gün geçerli
  });
};

export const clearSessionCookie = (res) => {
  res.clearCookie('refreshToken');
};