import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import moment from 'moment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {

  constructor(private httpClient: HttpClient) { }

  Login(data: any): Observable<any> {
    let url = environment.API_URL + environment.AUTH_API + environment.AUTH.LOGIN;
    console.log(url);
    return this.httpClient.post(url, data);
  }

  Inscription(data: any): Observable<any> {
    let url = environment.API_URL + environment.AUTH_API + environment.AUTH.INSCRIPTION;
    console.log(url);
    return this.httpClient.post(url, data);
  }

  setToken(token: any): void {
    const expirationDate = moment().locale('ru').add(2, 'days');
    localStorage.setItem(environment.UTILISATEUR_SESSION_KEY, JSON.stringify({ token, expirationDate }));
  }
  getInfoFromToken(info: string): any {
    const sessionData = localStorage.getItem(environment.UTILISATEUR_SESSION_KEY);
    if (!sessionData) return null;

    const token = JSON.parse(sessionData).token;
    if (!token) return null;

    try {
      const decodedToken: any = jwtDecode(token);
      return decodedToken[info];
    } catch (error) {
      console.error('Erreur lors du décodage du token JWT :', error);
      return null;
    }
  }
  logoutUtiliateur(): void {
    localStorage.removeItem(environment.UTILISATEUR_SESSION_KEY);
  }
}

//ng g s --skip-tests
