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
    let url = environment.API_URL+environment.ASSIGNMENTELEVE_API+id;
    return this.httpClient.get<AssignmentElve>(url)
  }

  EditeAssignment(assignment:AssignmentElve |undefined):Observable<any>{
    let url = environment.API_URL + environment.ASSIGNMENTELEVE_API+assignment?._id+"/notes";
    return this.httpClient.put<AssignmentElve>(url, assignment);
  }

  EditeDescriptionAndFile(assignmentEleve: any) : Observable<any> {
    let url = environment.API_URL + environment.ASSIGNMENTELEVE_API+assignmentEleve?._id;
    const formData = new FormData();
    formData.append('file', assignmentEleve?.selectedFile, assignmentEleve?.selectedFile?.name);
    formData.append('description', assignmentEleve?.description);
    return this.httpClient.put<AssignmentElve>(url, formData);
  }

  GetAllAssignmentEleveWithPagination(page: number, limit : number, filtre: any): Observable<any>{
    let url = environment.API_URL + environment.ASSIGNMENTELEVE_API;
    url += `?page=${page}`;
    url += `&limit=${limit}`;
    if (filtre) {
      if (filtre.idMatiere) {
        url += `&idMatiere=${filtre?.idMatiere}`;
      }
      if (filtre.description) {
        url += `&description=${filtre?.description}`;
      }
      if (filtre.rendu) {
        url += `&rendu=${filtre?.rendu}`;
      }
      if (filtre.dateDebut) {
        url += `&dateDebut=${filtre?.dateDebut?.toISOString()?.split('T')[0]}`;
      }
      if (filtre.dateFin) {
        url += `&dateFin=${filtre?.dateFin?.toISOString()?.split('T')[0]}`;
      }
    }
    
    return this.httpClient.get<any>(url)
  }

  TelechargerFichierEleve(assignmentEleve: AssignmentElve){
    let url = environment.API_URL + environment.ASSIGNMENTELEVE_API+assignmentEleve?._id+"/fichier";
    return this.httpClient.get(url, { responseType: 'blob' });
  }
}
