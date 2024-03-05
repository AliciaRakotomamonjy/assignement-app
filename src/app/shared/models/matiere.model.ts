import { Utilisateur } from "./utilisateur.model";

export class Matiere{
  _id?: string;
  libelle!:string;
  professeur!:Utilisateur;
}
