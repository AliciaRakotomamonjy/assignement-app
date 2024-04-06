import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Assignment } from '../models/assignment.model';
import { AssignmentElve } from '../models/assignmenteleve.model';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(private httpClient: HttpClient) { }

  AjouterAssignment(data: any): Observable<any> {
    let url = environment.API_URL + environment.ASSIGNMENT_API + environment.ASSIGNMENT.AJOUTER_ASSIGNMENT;
    console.log(url);
    return this.httpClient.post(url, data);
  }
  GetAllAssignmentWithPagination(page: number, limit: number, filtre: any): Observable<any> {
    let url = environment.API_URL + environment.ASSIGNMENT_API + environment.ASSIGNMENT.GETALL_WITH_PAGINATION + "?page=" + page + "&limit=" + limit;
    console.log("ity le filtre ary " + filtre.matiere)
    if (filtre) {
      if (filtre.matiere) {
        url += `&matiere=${filtre.matiere}`;
      }
      if (filtre.dateDebut) {
        url += `&dateDebut=${filtre.dateDebut}`;
      }
      if (filtre.dateFin) {
        url += `&dateFin=${filtre.dateFin}`;
      }
    }
    console.log("ity le url : " + url);
    return this.httpClient.get(url);
  }
  GetAssignmentById(id: string): Observable<Assignment> {
    let url = environment.API_URL + environment.ASSIGNMENT_API + environment.ASSIGNMENT.GET_ASSIGNMENT_BY_ID + "/" + id;
    return this.httpClient.get<Assignment>(url);
  }
  DeleteAssignmentById(id: string): Observable<any> {
    let url = environment.API_URL + environment.ASSIGNMENT_API + environment.ASSIGNMENT.DELETE_ASSIGNMENT + "/" + id;
    return this.httpClient.delete(url);
  }
  EditeAssignment(assignment:Assignment |undefined):Observable<any>{
    let url = environment.API_URL + environment.ASSIGNMENT_API + environment.ASSIGNMENT.EDIT_ASSIGNMENT;
    return this.httpClient.put<Assignment>(url, assignment);
  }

  GetAssignmentByIdWithDetail(id : string): Observable<Assignment> {
    let url = environment.API_URL+environment.ASSIGNMENT_API+environment.ASSIGNMENT.DETAIL_ASSIGNEMENT+id;
    return this.httpClient.get<Assignment>(url)
  }
}
