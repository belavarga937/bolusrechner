//Authentifizierungs -und Zugriffschutz
const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        console.error('Der Token ist nicht gültig');
        return res.status(401).json({error: 'Der Zugriff wurde verweigert'});
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_TOKEN);
        req.user = { _id: decodedToken._id };
        console.log('Der Token ist gültig und wurde in req.user gespeichert');
        next();
    }

    catch (err) {
        console.error(err);
        res.status(401).json({ error: 'Bitte logge dich zuerst ein' });
    }
};

module.exports = verifyToken;