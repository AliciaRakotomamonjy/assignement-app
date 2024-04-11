# Contributions au Projet Assignment

## Rakotomamonjy Alicia

- **Mise en place de l'environnement de développement :**
  - Configuration de Git, Angular, MongoDB, Express, etc.
- **Template avec menu :**
  - Création d'un modèle de page avec un menu comprenant toolbar et sidebar.
- **Fiche de devoir & liste des devoirs des élèves avec widgets tables :**
  - Mise en place de la vue des devoirs et des listes de devoirs des élèves avec des widgets tables.
- **Affichage de devoirs rendus et non rendus avec drag and drop :**
  - Implémentation de la fonctionnalité permettant d'afficher les devoirs rendus et non rendus avec la possibilité de les trier par glisser-déposer.
- **Attribution de notes aux devoirs :**
  - Développement de la fonctionnalité permettant aux enseignants d'attribuer des notes aux devoirs avec notifications snack-bar.
- **Profil professeur avec édition de profil et import de photo de profil :**
  - Création de la page de profil du professeur avec possibilité d'édition de profil et d'import de photo de profil.
- **Déploiement :**
  - Déploiement du backend sur [https://mbds-assignement-api.onrender.com](https://mbds-assignement-api.onrender.com).
  - Déploiement du frontend 

## Ratsimbazafy Henintsoa Elysée

- **Login (back et front) avec Token :**
  - Implémentation de la fonctionnalité de connexion à l'application.
  - Utilisation de snack-bar et `<mat-progress-spinner>` pour les notifications et les indicateurs de chargement.
  - Configuration et intégration de l'envoi de courriels aux utilisateurs après leur conneexion.
- **Inscription :**
  - Mise en place de la fonctionnalité d'inscription avec snack-bar et `<mat-progress-spinner>`.
  - Configuration et intégration de l'envoi de courriels aux utilisateurs après leur inscription.
- **Pagination, Filtrage et Affichage de la liste des Assignments avec `<mat-paginator>` pour les professeurs:**
  - Développement de la fonctionnalité pour afficher les devoirs avec pagination.
  - Filtrage : Permet aux utilisateurs de filtrer les assignments de manière efficace selon des critères spécifiques :
      - **Par Matière :** Aide à trouver rapidement les assignments d'une matière donnée.
      - **Par Date Limite :** Offre la possibilité de filtrer les assignments en fonction de leur date limite, avec des conditions flexibles :
        - Si **une date** est spécifiée, les assignments affichés auront une date limite **supérieure** à cette date.
        - Si **deux dates** sont données, seuls les assignments situés **entre** ces dates seront présentés.
        - Si **seulement la deuxième date** est spécifiée, les assignments montrés auront une date limite **strictement inférieure** à cette date.
- **Ajout de devoir en utilisant stepper :**
  - Implémentation de l'ajout de devoirs via un processus de type stepper.
  - Intégration de la fonctionnalité d'envoi de notifications par courriel aux étudiants.
- **Édition et suppression de devoir :**
  - Ajout des fonctionnalités d'édition et de suppression de devoirs avec notifications snack-bar et `<mat-progress-spinner>`.
- **Liste de devoirs pour les élèves :**
  - Développement de la fonctionnalité permettant aux élèves de voir la liste des devoirs avec des widgets tables et `<mat-progress-spinner>` pour les indicateurs de chargement.
- **Faire les devoirs avec import de fichier :**
  - Mise en œuvre de la fonctionnalité permettant aux élèves de soumettre leurs devoirs en exportant des fichiers.
- **Profil élève avec édition de profil et import de photo de profil :**
  - Implémentation de la page de profil élève avec possibilité d'édition de profil et d'import de photo de profil.
- **Déploiement du Front-end Angular :**
  - Création d'un serveur Node.js pour héberger le build du projet Angular. Le build a été généré avec la commande `ng build`, et un serveur Node  `app.js` a été configuré pour servir les fichiers statiques générés lors de la construction de l'application Angular.
## Contribution commune
- **Conception et création des modèles sur Angular et Express :**
  - Définition des modèles nécessaires à l'application sur les frameworks Angular et Express.
- **Vidéo**

# Instructions pour exécuter le projet Assignment
1. **API Backend :**
- Accédez au dossier `assignment-api`.
- Installez les dépendances en exécutant la commande suivante :
  ```
  npm install
  ```
- Démarrez l'API localement en exécutant la commande :
  ```
  npm start
  ```
L'API sera disponible à l'adresse http://localhost:3001.

3. **Application Frontend Angular :**
- Accédez au dossier `assignment-app`.
- Si vous souhaitez utiliser l'API localement, ouvrez le fichier `src/environments/environment.ts` et modifiez la valeur de `API_URL` pour `http://localhost:3001`.
- Installez les dépendances en exécutant la commande suivante :
  ```
  npm install
  ```
- Lancez l'application en exécutant la commande :
  ```
  ng serve 
  ```
