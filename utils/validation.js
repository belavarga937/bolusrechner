//Funktionen zur Validierung der Daten
const { body, param, validationResult } = require('express-validator');
const { User } = require('../database');

    //Register
const validationRegister = [
    body('username').notEmpty().withMessage('Benutzername erforderlich')
    .custom( async (value) => {
        const existingUser = await User.findOne({username: value});
        if (existingUser) {
            throw new Error('Der Benutzername ist bereits vergeben');
        }
        return true;
    }),

    body('email').isEmail().withMessage('Ungültige Email-Adresse'),
    body('password').isLength({ "min": "8"}).withMessage('Das Passwort muss midnestens 8 Zeichen lang sein'),
    body('confirm_password').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwörter stimmen nicht überein.');
        }
        return true;
    })
];

    //Login
const validationLogin = [
    body('email').isEmail().withMessage('Ungültige Email-Adresse'),
    body('password').notEmpty().withMessage('Passwort wurde nicht angegeben')
];


    //Messwerte
const validationInsulinData = [
    param('meal').isIn(["breakfast", "lunch", "dinner", "night"])
    .withMessage("Ungültige Mahlzeit angegeben."),

    body('correctionFactor').isFloat({ min: 0 }).withMessage('Korrekturfaktor muss eine positive Zahl sein'),
    body('targetBloodSugar').isFloat({ min: 0 }).withMessage('Zielblutzucker muss eine positive Zahl sein'),
    body('carbFactor').isFloat({ min: 0 }).withMessage('KE-Faktor muss eine positive Zahl sein'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]





module.exports = {
    validationRegister,
    validationLogin,
    validationInsulinData
}