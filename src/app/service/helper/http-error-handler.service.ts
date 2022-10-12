import { Injectable } from '@angular/core';
import { AfbcoreService } from 'afbcore';
import { Observable, throwError } from 'rxjs';
import { LogService } from './log.service';
import { ToastService } from './toast.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerService {

  constructor(
    private _log:LogService,
    private _toast: ToastService,
    private _afbcore: AfbcoreService                                            
  ) { }
  /**
   * Handle Http operation that failed.
   * Let app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(operation = 'operation', result?:T){
    return (error:any): Observable<T> => {
      console.log("Error append: ", error.error.message);
     // this._toast.showError(error.error.message);
      return throwError(error.error.message);
    };
  }
}
