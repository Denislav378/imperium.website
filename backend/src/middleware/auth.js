import { verifyToken, extractTokenFromHeader } from '../utils/auth.js';

/**
 * Middleware to verify JWT token and attach user to request
 */
export async function authenticate(req, res, next) {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }
    
    const decoded = verifyToken(token);
    
    if (!decoded) {
      return res.status(401).json({ error: 'Invalid or expired token' });
    }
    
    // Attach user info to request
    req.user = {
      id: decoded.userId,
      email: decoded.email,
    };
    
    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(401).json({ error: 'Authentication failed' });
  }
}

/**
 * Optional authentication - doesn't fail if no token
 */
export async function optionalAuth(req, res, next) {
  try {
    const token = extractTokenFromHeader(req.headers.authorization);
    
    if (token) {
      const decoded = verifyToken(token);
      if (decoded) {
        req.user = {
          id: decoded.userId,
          email: decoded.email,
        };
      }
    }
    
    next();
  } catch (error) {
    // Continue without auth
    next();
  }
}


