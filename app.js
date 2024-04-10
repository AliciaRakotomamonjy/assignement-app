const express = require('express');
const path = require('path');
const app = express();

// Définition du dossier de build de l'application Angular
const angularBuildPath = path.join(__dirname, 'dist/assignement-app');

// Middleware pour servir les fichiers statiques de l'application Angular
app.use(express.static(angularBuildPath));

// Route pour toutes les URL, renvoie l'index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(angularBuildPath, 'index.html'));
});

// Port d'écoute du serveur
const port = process.env.PORT || 3000;

// Démarrage du serveur
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
