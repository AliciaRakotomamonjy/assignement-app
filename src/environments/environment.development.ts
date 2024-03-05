export const environment = {

  production: false,

  API_URL: 'http://localhost:3000',

  AUTH_API:'/api/auth',
  AUTH:{
    LOGIN:'/login',
    INSCRIPTION:"/inscription"
  },
  UTILISATEUR_SESSION_KEY:'UTILISATEUR_SESSION' ,

  UTILISATEUR_API: '/api/utilisateur',
  UTILISATEUR: {
  },

  ASSIGNMENT_API:'/api/assignment',
  ASSIGNMENT:{
    GETALL:'/getAllAssignment'
  }

};
