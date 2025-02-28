const Redis = require('ioredis');

// Create a new Redis instance with the specified configuration
const redis = new Redis({
  host: '192.168.127.112',  // Redis server IP address
  port: 6379,               // Redis server port
  connectTimeout: 60000,     // Connection timeout in milliseconds
});

// Test the connection by setting and getting a value
redis.set('key', 'value', (err, result) => {
  if (err) {
    console.error('Error setting value in Redis:', err);
  } else {
    console.log('Set value result:', result);  // Should output 'OK'
  }
});

redis.get('key', (err, result) => {
  if (err) {
    console.error('Error getting value from Redis:', err);
  } else {
    console.log('Got value from Redis:', result);  // Should output 'value'
  }
});