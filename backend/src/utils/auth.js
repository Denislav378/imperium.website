import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { config } from '../config/env.js';

/**
 * Hash password using argon2
 */
export async function hashPassword(password) {
  return await argon2.hash(password);
}

/**
 * Verify password against hash
 */
export async function verifyPassword(hash, password) {
  return await argon2.verify(hash, password);
}

/**
 * Generate JWT token
 */
export function generateToken(payload) {
  return jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}

/**
 * Verify JWT token
 */
export function verifyToken(token) {
  try {
    return jwt.verify(token, config.jwtSecret);
  } catch (error) {
    return null;
  }
}

/**
 * Extract token from Authorization header
 */
export function extractTokenFromHeader(authHeader) {
  if (!authHeader) return null;
  
  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }
  
  return parts[1];
}

/**
 * Get client IP address from request
 */
export function getClientIp(req) {
  return req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
         req.headers['x-real-ip'] ||
         req.connection?.remoteAddress ||
         req.socket?.remoteAddress ||
         'unknown';
}

/**
 * Get device info from request
 */
export function getDeviceInfo(req) {
  const userAgent = req.headers['user-agent'] || '';
  
  const isMobile = /Mobile|Android|iPhone|iPad/i.test(userAgent);
  const isDesktop = !isMobile;
  
  // Basic browser detection
  let browser = 'unknown';
  if (userAgent.includes('Chrome')) browser = 'Chrome';
  else if (userAgent.includes('Firefox')) browser = 'Firefox';
  else if (userAgent.includes('Safari')) browser = 'Safari';
  else if (userAgent.includes('Edge')) browser = 'Edge';
  
  // Basic OS detection
  let os = 'unknown';
  if (userAgent.includes('Windows')) os = 'Windows';
  else if (userAgent.includes('Mac')) os = 'macOS';
  else if (userAgent.includes('Linux')) os = 'Linux';
  else if (userAgent.includes('Android')) os = 'Android';
  else if (userAgent.includes('iOS')) os = 'iOS';
  
  return {
    mobile: isMobile,
    desktop: isDesktop,
    browser,
    os,
    userAgent,
  };
}


