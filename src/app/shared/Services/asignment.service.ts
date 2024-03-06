import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AsignmentService {

  constructor(private httpClient: HttpClient) {}

  AjouterAssignment(data: any): Observable<any> {
    let url = environment.API_URL+environment.ASSIGNMENT_API+environment.ASSIGNMENT.AJOUTER_ASSIGNMENT;
    console.log(url);
    return this.httpClient.post(url, data);
  }
}
