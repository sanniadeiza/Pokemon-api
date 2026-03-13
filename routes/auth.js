const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

/**
 * @route POST /api/auth/login
 * @desc Authenticate user & get token. For demo, username=admin, password=password
 * @access Public
 */
router.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (username === 'admin' && password === 'password') {
        const payload = {
            user: {
                id: 1,
                role: 'admin'
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'supersecretkey',
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token, message: "Use this token as Bearer Token to access Admin routes" });
            }
        );
    } else {
        res.status(400).json({ message: 'Invalid Credentials' });
    }
});

module.exports = router;
