import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const isAdmin = async (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        const user = await User.findById(verified._id);
        if (!user || !user.isAdmin) return res.status(403).send('Access Denied');
        
        req.user = verified;
        next();
    } catch (err) {
        res.status(400).send('Invalid Token');
    }
};

export default isAdmin;
