/**
 * API Key authentication middleware.
 * Compares X-API-Key header against API_KEY env var.
 * Applies only to non-GET requests (POST, PUT, DELETE, PATCH).
 */
function auth(req, res, next) {
  // Allow GET requests without auth
  if (req.method === 'GET') {
    return next();
  }

  const apiKey = req.headers['x-api-key'];

  if (!apiKey || apiKey !== process.env.API_KEY) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}

module.exports = auth;
