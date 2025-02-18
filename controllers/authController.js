//Enthät die Registrierungs -und Login Logik
const path = require('path');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {User} = require('../database');
const { validationResult } = require('express-validator');
const bodyParser = require('body-parser');
const { error } = require('console');
const { strict } = require('assert');
require('dotenv').config();

//Registrieren
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'register.html'));
    };

exports.registerUser = async (req, res) => {
    console.log("🔍 Starte Registrierung...");

    //Validation Ergebnis
    const errors = validationResult(req);
        if(!errors.isEmpty()) {
            console.log("Validierungsfehler:", errors.array()); 
            return res.status(400).json({ errors: errors.array() });
        }

    try {
        const { username, password, email } = req.body;

        //Nachschauen, ob User bereits vorhanden ist
        const isExisting = await User.findOne({email: email});
        if (isExisting) {
            console.log("Die E-Mail ist bereis vorhanden");
            return res.status(404).json({ error: 'Die E-Mail ist bereits vorhanden' });
        }

        //Passwort hashen
        const passwordHash = await bcryptjs.hash(password, 10);
        console.log('Das Hashen des Passworts war erfolgreich');

        //neuen User erstellen
        const newUser = new User({
            username,
            email,
            password_hash: passwordHash,
            role: 'user'
        });

        //User speichern
        await newUser.save();
        console.log('Der Nutzer wurde erfolgreich gespeichert');
        res.status(201).json({ message: 'Registrierung erfolgreich!' });
    }

    catch (err) {
        console.error(err);
        res.status(500).json({ error: err + "Hallo" });
    
    }

};

//Anmelden
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, "..", "view", "login.html" ))
};

exports.loginUser = async (req, res) => {
    //Validation Ergebnis
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        console.error('Server: Fehler beim Login')
        return res.status(400).json({ errors: errors.array() });
    }

    try {
            const { email, password } = req.body;
            //User in der Datenbank suchen
            const existingUser = await User.findOne({email: email});
                if (!existingUser) {
                    console.error('Server: Der Benutzer wurde nicht gefunden');
                    return res.status(404).json({error: "Der Benutzer wurde nicht gefunden"});
                }
            //Passwort vergleichen
            const savedPassword = existingUser.password_hash;
            const isMatched = await bcryptjs.compare(password, savedPassword);
                if (!isMatched) {
                    console.error('Server: Das Passwort ' + password + ' stimmt nicht überein');
                    return res.status(401).json({error: "Das Passwort stimmt nicht überein"});
                }

            //JSON Web Token generieren
            const token = jwt.sign({email: existingUser.email, _id: existingUser._id}, process.env.JWT_TOKEN, {
                expiresIn: '7d'
            });
            
            //Token als HTTP-Only-Cookie senden
            console.log(`Der Token wurde für den User ${existingUser.username} erfolgreich erstellt: ${token}`);
            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'Strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.status(201).json( {
                message: 'Der Login war erfolgreich',
                token: token
            })
    
        }
    catch (err) {
        console.error(err + 'Server: Serverfehler bei der Anmeldung');
        res.status(500).json({ error: "Serverfehler bei der Anmeldung. Login fehlgeschlagen"});
    }
};