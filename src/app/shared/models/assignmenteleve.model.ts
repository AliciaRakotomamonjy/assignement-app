import { Assignment } from "./assignment.model";
import { Matiere } from "./matiere.model";
import { Utilisateur } from "./utilisateur.model";

export class AssignmentElve {
  _id?: string;
  description!: string;
  eleve!: Utilisateur;
  assignment!: Assignment;
  rendu!:boolean;
  dateRendu!:Date;
  note!:number;
  remarque!:string;
  fichier!:string;
}
