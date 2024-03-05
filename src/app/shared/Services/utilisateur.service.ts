import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import moment from 'moment';
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private httpClient: HttpClient) {}

  Login(data: any): Observable<any> {
    let url = environment.API_URL+environment.AUTH_API+environment.AUTH.LOGIN;
    console.log(url);
    return this.httpClient.post(url, data);
  }

  setToken(token: any): void {
    const expirationDate = moment().locale('ru').add(2, 'days');
    localStorage.setItem(environment.UTILISATEUR_SESSION_KEY, JSON.stringify({ token, expirationDate }));
  }

}

//ng g s --skip-tests
