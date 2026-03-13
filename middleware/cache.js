const redis = require('redis');

// Initialize Redis Client
const client = redis.createClient({
    url: process.env.REDIS_URL || 'redis://localhost:6379',
    socket: {
        reconnectStrategy: false // Disable reconnect so it fails gracefully once
    }
});

client.on('error', (err) => {
    // Suppress console spam if Redis is offline
    if (err.code !== 'ECONNREFUSED') {
       console.log('Redis Client Error', err.message);
    }
});

// Connect to Redis immediately
const connectRedis = async () => {
    try {
        await client.connect();
        console.log('Connected to Redis Cache');
    } catch (error) {
        console.error('Failed to connect to Redis. Caching will be skipped.', error.message);
    }
};

connectRedis();

const cacheMiddleware = async (req, res, next) => {
    if (!client.isOpen) {
        console.log('Redis not connected, skipping cache');
        return next();
    }
    
    // We cache based on the URL (which includes pagination ?page=...)
    const key = `cache:${req.originalUrl}`;

    try {
        const cachedData = await client.get(key);
        if (cachedData) {
            console.log('Cache Hit:', key);
            return res.status(200).json(JSON.parse(cachedData));
        }
        
        console.log('Cache Miss:', key);
        
        // Override res.json to catch the response body and cache it
        const originalSend = res.json.bind(res);
        res.json = (body) => {
            // Set cache expiry to 1 hour (3600 seconds)
            client.setEx(key, 3600, JSON.stringify(body))
                .catch(err => console.error('Redis Set Error:', err));
            originalSend(body);
        };
        
        next();
    } catch (error) {
        console.error('Redis Error:', error);
        next();
    }
};

module.exports = { client, cacheMiddleware };
