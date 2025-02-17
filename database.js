const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bcryptjs = require('bcryptjs');
require('dotenv').config();


//Model-Schema für den USER designen
const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    email: {type: String, unique: true, required: true},
    password_hash: {type: String, required: true},
    created_at: {type: Date, default: Date.now},
    role: {type: String, enum: ['user', 'admin'], default: 'user'}
});

//Model anbinden
const User = mongoose.model('User', UserSchema);

//Model-Schema für die Messwerte designen
const InsulinSettingsSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    meals: {
        breakfast: {
            correctionFactor: { type: Number, required: true },  // Korrekturfaktor
            carbFactor: { type: Number, required: true },        // KE-Faktor
            targetBloodSugar: { type: Number, required: true }   // Zielblutzucker
        },
        lunch: {
            correctionFactor: { type: Number, required: true },
            carbFactor: { type: Number, required: true },
            targetBloodSugar: { type: Number, required: true }
        },
        dinner: {
            correctionFactor: { type: Number, required: true },
            carbFactor: { type: Number, required: true },
            targetBloodSugar: { type: Number, required: true }
        },
        night: {
            correctionFactor: { type: Number, required: true },
            carbFactor: { type: Number, required: true },
            targetBloodSugar: { type: Number, required: true }
        }
    },

    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

const InsulinSettings = mongoose.model("InsulinSettings", InsulinSettingsSchema);





module.exports = {
    User,
    InsulinSettings
}