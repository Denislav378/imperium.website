import express from 'express';
import { db } from '../config/database.js';
import { optionalAuth, authenticate } from '../middleware/auth.js';
import { getClientIp, getDeviceInfo } from '../utils/auth.js';

const router = express.Router();

/**
 * Track event
 */
router.post('/track', optionalAuth, async (req, res, next) => {
  try {
    const { event_name, properties } = req.body;
    
    if (!event_name) {
      return res.status(400).json({ error: 'event_name is required' });
    }
    
    const ip = getClientIp(req);
    const deviceInfo = getDeviceInfo(req);
    
    await db.events.create({
      user_id: req.user?.id || null,
      event_name,
      properties: properties || {},
      device_info: deviceInfo,
    });
    
    res.status(201).json({ message: 'Event tracked successfully' });
  } catch (error) {
    next(error);
  }
});

/**
 * Get user events (authenticated only)
 */
router.get('/events', authenticate, async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 100;
    const events = await db.events.findByUserId(req.user.id, limit);
    res.json({ events });
  } catch (error) {
    next(error);
  }
});

export default router;


