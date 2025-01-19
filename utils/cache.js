import redis from "./redisConfig.js";

// Set a value in Redis
const setCache = async (key, value, ttl) => {
    await redis.set(key, value, "EX", ttl); // 'EX' sets expiration in seconds
    console.log(`Value set for key: ${key}`);
};

// Get a value from Redis
const getCache = async (key) => {
    const value = await redis.get(key);
    if (value) {
        console.log(`Cache hit for key: ${key}`);
        return value;
    } else {
        console.log(`Cache miss for key: ${key}`);
        return null;
    }
};

export { setCache, getCache };
