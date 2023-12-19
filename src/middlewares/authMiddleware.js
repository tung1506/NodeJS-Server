import jwt from 'jsonwebtoken';
import db from '../models/index';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, 'your_secret_key');

        const user = await db.User.findOne({
            where: {
                id: decoded.id,
            },
        });

        if (!user || user.role != 1) {
            throw new Error();
        }

        req.user = user;
        console.log(req.user);
        next();
    } catch (error) {
        res.status(401).send({ error: 'Unauthorized access.' });
    }
};

module.exports = authMiddleware;
