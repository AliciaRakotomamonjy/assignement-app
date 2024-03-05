import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionData = localStorage.getItem(environment.UTILISATEUR_SESSION_KEY);
  if (sessionData != null || sessionData != undefined) {
    const { token, expirationDate } = JSON.parse(sessionData);
    console.log("token  alo " + token);
  }
  return next(req);
};
