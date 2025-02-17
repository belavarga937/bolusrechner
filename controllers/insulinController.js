const {InsulinSettings} = require('../database');
const bodyParser = require('body-parser');
const { error } = require('console');
const path = require('path');
require('dotenv').config;

exports.getSettingsPage = (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'view', 'settings.html'));
}

exports.getShowingInsulinData = async (req, res) => {
    const userId = req.user._id;

    try {
        const searchingUser = await InsulinSettings.findOne({_id: userId});
        console.log('Gesendete Daten:', searchingUser);
        if (searchingUser) {
            console.log('Der User ' + userId + ' wurde gefunden: ' + searchingUser);
            res.status(200).json({
                message: "Die Daten wurden gefunden",
                meals: searchingUser.meals });
        }
        else {
            console.log('Der User konnte nicht gefunden werden');
            res.status(404).json({error: "Der User konnte nicht gefunden werden"});
        }
    }
    catch (err) {
        console.error('Fehler beim Suchen des Users: ' + err);
        res.status(404).json({error: 'Serverfehler beim Abrufen der Daten'});
    }
    
}

exports.saveInsulinData = async (req, res) => {
    const { meal } = req.params;
    const { correctionFactor, carbFactor, targetBloodSugar} = req.body;
    const userId = req.user._id;

    console.log(userId);

    if (isNaN(correctionFactor) || isNaN(carbFactor) || isNaN(targetBloodSugar)) {
        return res.status(400).json({ error: "Alle Werte müssen gültige Zahlen sein." });
    }

    try {
        const updateSettings = await InsulinSettings.findOneAndUpdate(
            { _id: userId },
            {
                $set: {
                    [ `meals.${meal}.correctionFactor` ]: correctionFactor,
                    [ `meals.${meal}.carbFactor` ]: carbFactor,
                    [ `meals.${meal}.targetBloodSugar` ]: targetBloodSugar,
                }
            },
            { new: true, upsert: true}
        )

        if (updateSettings) {
            console.log('Daten wurden erfolgreich aktualisiert:' + updateSettings);
            res.status(202).json({ message: meal + "Daten wurden aktualisiert"});
        }
        else {
            console.error('Fehler beim Speichern der Daten');
            res.status(404).json({ error: "Fehler beim Speichern der Daten"});
        }
    }
    catch (err) {
        console.error("Es gab ein Problem auf dem Server." + err);
        res.status(404).json({ error: "Es gab ein Problem auf dem Server. Bitte versuche es später erneut."});
    }

}