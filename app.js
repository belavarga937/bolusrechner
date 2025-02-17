const express = require('express');
const app = express();
const port = 3000;
const path = require('path');
const MobileDetect = require('mobile-detect');
const mongoose = require('mongoose');
const db = require('./database.js');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('dotenv').config();

app.use(express.static(__dirname + '/public'));
app.use(express.json());
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }));

//Datenbankanbindung
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ Datenbankanbindung ist erfolgreich'))
.catch((err) => console.error('❌ Datenbankanbing war nicht erfolgreich: ' + err));

//Landing-Page
app.get('/', (req, res) => {
    try {
            const md = new MobileDetect(req.headers['user-agent']);

            if (md.phone() && !md.tablet()) {
                res.sendFile(path.join(__dirname, 'view', 'index.html'));
            }
            else {
                res.sendFile(path.join(__dirname, 'view', 'maintenance.html'));
                console.log("Endgerät ist kein Handy");
            }}
    catch (err) {
        console.error("Fehler bei der Erkennung des Geräts:", err);
        res.status(500).send("Serverfehler");
    }
    
});

//Registrierung
const authRoutes = require('./routes/authRoute.js');
app.use('/auth', authRoutes);

//Settings
const insulinRoutes = require('./routes/insulinRoutes.js');
app.use('/settings', insulinRoutes);





app.listen(3000, () => console.log('Server läuft auf Port ' + port));