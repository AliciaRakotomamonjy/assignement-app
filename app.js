const express = require('express');
const path = require('path');
const app = express();
const angularBuildPath = path.join(__dirname, 'dist/assignement-app');
app.use(express.static(angularBuildPath));
app.get('*', (req, res) => {
  res.sendFile(path.join(angularBuildPath, 'index.html'));
});
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Serveur démarré sur le port ${port}`);
});
