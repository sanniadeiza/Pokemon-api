require('dotenv').config({ override: true });

console.log('--- Environment Check ---');
console.log('PORT:', process.env.PORT);
console.log('REDIS_URL:', process.env.REDIS_URL ? 'Loaded' : 'Not Loaded');
console.log('JWT_SECRET:', process.env.JWT_SECRET ? 'Loaded' : 'Not Loaded');
console.log('-------------------------');

if (!process.env.PORT || !process.env.REDIS_URL) {
    console.error('ERROR: Variables were not loaded from .env');
    console.log('Current Directory:', process.cwd());
    const fs = require('fs');
    const envPath = require('path').join(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
        console.log('.env file EXISTS at:', envPath);
        console.log('File Content Size:', fs.statSync(envPath).size, 'bytes');
    } else {
        console.log('.env file DOES NOT EXIST at:', envPath);
    }
} else {
    console.log('SUCCESS: All variables loaded!');
}
