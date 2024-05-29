import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class StatistiqueService {

  constructor(private httpClient: HttpClient) {}

  GetStatEleve(filtre: any): Observable<any> {
    let url = environment.API_URL+environment.STAT_API+"?";
    if (filtre) {
      if (filtre.dateDebut) {
        if(!url.includes("?")) url += "&"
        url += `dateDebut=${filtre?.dateDebut?.toISOString()?.split('T')[0]}`;
      }
      if (filtre.dateFin) {
        if(!url.includes("?")) url += "&"
        url += `dateFin=${filtre?.dateFin?.toISOString()?.split('T')[0]}`;
      }
    }
    return this.httpClient.get<any>(url,{})
  }
}
