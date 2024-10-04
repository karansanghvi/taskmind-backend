const crypto = require('crypto');

// Generate a random JWT secret key
const jwtSecretKey = crypto.randomBytes(32).toString('hex');

module.exports = jwtSecretKey; // Export the generated key
