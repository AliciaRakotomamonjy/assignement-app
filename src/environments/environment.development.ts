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
    FAIRE_LE_DEVOIR: '/fairedevoir'
  },

  ASSIGNMENT_API: '/api/assignment',
  ASSIGNMENT: {
    GETALL_WITH_PAGINATION: '/getAllAssignment',
    AJOUTER_ASSIGNMENT: '/ajouterassignment',
    GET_ASSIGNMENT_BY_ID:'/getassignmentbyid',
    EDIT_ASSIGNMENT:'/editeassignment',
    DELETE_ASSIGNMENT:'/deleteassignment',
    DETAIL_ASSIGNEMENT: '/getassignmentbyidwithdetails/',
    DETAIL_ASSIGNEMENT_FILTERED: '/getassignmentbyidwithdetailsfiltered/',
    DETAIL_ASSIGNEMENT_ELEVE: '/getassignmentelevebyid/',
    AJOUTER_NOTE_ASSIGNMENT_ELEVE: "/ajouternoteassignmenteleve"
  },
  MATIERE_API:'/api/matiere',
  MATIERE:{
    GET_ALL_MATIERE:'/getAllMatiere'
  }
    

};
