import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AssignmentElve } from '../models/assignmenteleve.model';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AssignmentEleveService {

  constructor(private httpClient: HttpClient) { }

  GetAssignmentEleveById(id : string): Observable<AssignmentElve> {
    let url = environment.API_URL+environment.ASSIGNMENT_API+environment.ASSIGNMENT.DETAIL_ASSIGNEMENT_ELEVE+id;
    return this.httpClient.get<AssignmentElve>(url)
  }

  EditeAssignment(assignment:AssignmentElve |undefined):Observable<any>{
    let url = environment.API_URL + environment.ASSIGNMENT_API + environment.ASSIGNMENT.AJOUTER_NOTE_ASSIGNMENT_ELEVE;
    return this.httpClient.put<AssignmentElve>(url, assignment);
  }
}
