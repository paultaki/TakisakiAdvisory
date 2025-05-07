/**
 * Simple Next.js API route rate limiting middleware
 * Based on https://github.com/vercel/next.js/blob/canary/examples/api-routes-rate-limit/utils/rate-limit.js
 * 
 * @param {Object} options - Rate limiting options
 * @param {number} options.interval - Time window in milliseconds
 * @param {number} options.maxRequests - Max number of requests per window per token
 * @param {number} options.uniqueTokenPerInterval - Max number of unique tokens to track
 * @returns {Object} Rate limiting functions
 */
export function rateLimit({ interval, maxRequests, uniqueTokenPerInterval }) {
  // Initialize cache to store rate limit data
  const tokenCache = new Map();
  const timestamps = {};
  let lastIntervalStart = 0;
  
  // Clean up expired tokens periodically
  const cleanup = () => {
    const now = Date.now();
    if (now - lastIntervalStart > interval) {
      lastIntervalStart = now;
      tokenCache.clear();
    }
  };

  return {
    /**
     * Check if the request should be rate limited
     * @param {Object} res - Next.js/Express response object
     * @param {number} limit - Rate limit to apply
     * @param {string} token - Unique token (usually IP address)
     * @returns {Promise<void>}
     * @throws {Error} If rate limit is exceeded
     */
    check: async (res, limit, token) => {
      cleanup();
      
      // Configure rate limit headers
      res.setHeader('X-RateLimit-Limit', maxRequests);
      
      // Get the timestamp array for this token
      const timestamps = tokenCache.get(token) || [];
      const now = Date.now();
      
      // Remove timestamps older than the current interval
      const newTimestamps = [...timestamps.filter(ts => now - ts < interval), now];
      
      // Count requests in the current interval
      const requestCount = newTimestamps.length;
      
      // Set remaining requests header
      res.setHeader('X-RateLimit-Remaining', Math.max(0, maxRequests - requestCount));
      
      // Update the cache with the new timestamps
      tokenCache.set(token, newTimestamps);
      
      // Ensure we're not using too much memory by limiting unique tokens
      if (tokenCache.size > uniqueTokenPerInterval) {
        // Delete the oldest entry
        const oldestToken = Array.from(tokenCache.keys())[0];
        tokenCache.delete(oldestToken);
      }
      
      // If rate limit exceeded, throw error
      if (requestCount > maxRequests) {
        const resetTime = timestamps[0] + interval;
        res.setHeader('X-RateLimit-Reset', Math.ceil(resetTime / 1000));
        throw new Error('Rate limit exceeded');
      }
    }
  };
}