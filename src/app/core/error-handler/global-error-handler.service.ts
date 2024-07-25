import {ErrorHandler, Injectable, NgZone} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";

@Injectable()
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor(private zone: NgZone) {
  }

  public handleError(error: any): void {
    this.zone.run((): void => {
      if (error instanceof HttpErrorResponse) {
        console.error('Backend returned status code: ', error.status);
        console.error('Response body:', error.message);
      } else {
        console.error('An error occurred:', error.message!);
      }
    });
  }
}
