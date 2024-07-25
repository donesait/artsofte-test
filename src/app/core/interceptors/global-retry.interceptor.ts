import {HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest} from '@angular/common/http';
import {Observable, retry, timer} from "rxjs";

export const globalRetryInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>> => {
  return next(req).pipe(
    retry({
      count: 2,
      delay: (_, retryCount: number) => timer(retryCount * 1000)
    })
  )
};
