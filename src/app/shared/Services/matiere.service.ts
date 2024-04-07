import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { Matiere } from '../models/matiere.model';

@Injectable({
  providedIn: 'root'
})
export class MatiereService {

  constructor(private httpClient: HttpClient) {}

  GetAllMatiere(): Observable<Matiere[]> {
    let url = environment.API_URL+environment.MATIERE_API+environment.MATIERE.GET_ALL_MATIERE;
    return this.httpClient.get<Matiere[]>(url).pipe(
      map((data: any) => {
        return data.data;
      })
    );;
  }
}
