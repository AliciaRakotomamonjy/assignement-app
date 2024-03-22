import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const sessionData = localStorage.getItem(environment.UTILISATEUR_SESSION_KEY);
  if (sessionData != null || sessionData != undefined) {
    const { token} = JSON.parse(sessionData);
    return next(req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`),
    }));
  }
  return next(req);
};
