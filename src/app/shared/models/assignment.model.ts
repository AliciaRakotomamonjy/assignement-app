import { Matiere } from "./matiere.model";

export class Assignment {
  _id?: string;
  description!: string;
  matiere!: Matiere;
  datePublication!: Date;
  dateLimite!:Date;
}
