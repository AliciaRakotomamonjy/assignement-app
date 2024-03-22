export const environment = {

  production: false,

  API_URL: 'http://localhost:3001',

  AUTH_API: '/api/auth',
  AUTH: {
    LOGIN: '/login',
    INSCRIPTION: "/inscription"
  },
  UTILISATEUR_SESSION_KEY: 'UTILISATEUR_SESSION',
  UTILISATEUR_ROLE_KEY:'UTILISATEUR_ROLE',
  UTILISATEUR_API: '/api/utilisateur',
  UTILISATEUR: {
  },

  ASSIGNMENT_API: '/api/assignment',
  ASSIGNMENT: {
    GETALL_WITH_PAGINATION: '/getAllAssignment',
    AJOUTER_ASSIGNMENT: '/ajouterassignment'
  }

};
