import {ApplicationConfig, ErrorHandler, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideHttpClient, withInterceptors} from "@angular/common/http";
import {GlobalErrorHandlerService} from "./core";
import {globalRetryInterceptor} from "./core/interceptors/global-retry.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes),
    provideHttpClient(),
    {provide: ErrorHandler, useClass: GlobalErrorHandlerService},
    provideHttpClient(withInterceptors([globalRetryInterceptor]))
  ]
};
