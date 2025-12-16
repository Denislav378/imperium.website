/**
 * Error handling middleware
 */
export function errorHandler(err, req, res, next) {
  console.error('Error:', err);
  
  // Default error
  let status = err.status || err.statusCode || 500;
  let message = err.message || 'Internal server error';
  
  // Database errors
  if (err.code === '23505') { // Unique violation
    status = 409;
    message = 'This record already exists';
  } else if (err.code === '23503') { // Foreign key violation
    status = 400;
    message = 'Invalid reference';
  } else if (err.code === 'PGRST116') { // Not found
    status = 404;
    message = 'Record not found';
  }
  
  // Validation errors
  if (err.name === 'ValidationError') {
    status = 400;
    message = err.message;
  }
  
  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    status = 401;
    message = 'Invalid token';
  } else if (err.name === 'TokenExpiredError') {
    status = 401;
    message = 'Token expired';
  }
  
  res.status(status).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
}

/**
 * 404 handler
 */
export function notFoundHandler(req, res) {
  res.status(404).json({ error: 'Route not found' });
}


