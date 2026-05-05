import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnimeAuth } from '../services/anime-auth';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private animeAuth: AnimeAuth) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = this.animeAuth.getToken();

    if (!token || !req.url.startsWith('https://127.0.0.1:8000/')) {
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });

    return next.handle(authReq);
  }
}
