export const environment = {

  production: false,

  API_URL: 'https://mbds-assignement-api.onrender.com',

  AUTH_API: '/api/auth',
  IMAGE_API:'/api/img',
  FICHIER_API:'/api/fichier_assignment_eleve',
  AUTH: {
    LOGIN: '/login',
    INSCRIPTION: "/inscription"
  },
  UTILISATEUR_SESSION_KEY: 'UTILISATEUR_SESSION',
  UTILISATEUR_ROLE_KEY:'UTILISATEUR_ROLE',
  UTILISATEUR_API: '/api/utilisateur',
  UTILISATEUR: {
    FAIRE_LE_DEVOIR: '/fairedevoir',
    MODIFIER_PROFILE:'/modifier_profile'
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
    AJOUTER_NOTE_ASSIGNMENT_ELEVE: "/ajouternoteassignmenteleve",
    GET_ASSIGNMENT_ELEVE: '/eleve'
  },
  MATIERE_API:'/api/matiere',
  MATIERE:{
    GET_ALL_MATIERE:'/getAllMatiere'
  }


};
