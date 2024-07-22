const { Redis } = require('ioredis')
const client = new Redis()
client.on('connect', () => {
    console.log('Connected to Redis');
});
client.on('error', (err) => {
    console.error('Redis connection error:', err);
    // Implement reconnection logic if needed
});
module.exports = client