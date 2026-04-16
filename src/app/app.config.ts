import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http'; 
// import { withInterceptorsFromDi } from '@angular/common/http'; 
// import { HTTP_INTERCEPTORS } from '@angular/common/http'; 
// import { JwtInterceptor } from './interceptors/jwt-interceptor'; 

export const appConfig: ApplicationConfig = { 
  providers: [ 
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),

    provideRouter(routes), 
    provideHttpClient(),

    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: JwtInterceptor,
    //   multi: true,
    // }
  ] 
};