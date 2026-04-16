import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root',
})
export class AnimeAuth {

  constructor(private monHttpClient: HttpClient) {}

  // (api angular) fetchJwtToken
  // fetchJwtToken() {
  //   return this.monHttpClient.get<{ token: string }>('http://api-nanimiru.loc:8080/jwt-login.php').pipe(
  //     tap(response => {
  //       localStorage.setItem('api_jwt', response.token);
  //     })
  //   );
  // }

  // getToken(): string | null {
  //   return localStorage.getItem('api_jwt');
  // }

  // clearToken(): void {
  //   localStorage.removeItem('api_jwt');
  // }
}
