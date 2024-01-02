import jwt from 'jsonwebtoken';
import db from '../models/index';

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_KEY);

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

const decodeJWT = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_KEY);

        const user = await db.User.findOne({
            where: {
                id: decoded.id,
            },
        });

        req.user = user;
        console.log(req.user.dataValues.full_name);
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({ error: 'Unauthorized access.' });
    }
};

module.exports = {
    authMiddleware: authMiddleware,
    decodeJWT: decodeJWT
}
