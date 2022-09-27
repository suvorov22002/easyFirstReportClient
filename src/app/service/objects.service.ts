import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AfbcoreService } from 'afbcore';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AppConfigService } from './helper/app-config.service';
import { HttpErrorHandlerService } from './helper/http-error-handler.service';
import { LogService } from './helper/log.service';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root'
})
export class ObjectsService {

  constructor(
    protected _client:HttpClient,
    protected _log:LogService,
    protected _errorHandler:HttpErrorHandlerService,
    protected _shared:ShareService,
    protected _afbcore:AfbcoreService
  ) { }

  list(url:string, _path?:string):Observable<any>{
      let params = new HttpParams();
      let filter = {};
   
      if(_path == undefined) _path = "";
      return this._client.get<any>(url + _path, {params:params})
        .pipe(
          tap( _ => console.log()),
          catchError(this._errorHandler.handleError<any>('list of all filter '+filter, 
          []))
        );
    }

    _list(url:string, obj?:any):Observable<any>{
      //console.log(JSON.stringify(obj))
      return this._client.post<any>(url, obj)
      .pipe(
        tap( _ => console.log()),
        catchError(this._errorHandler.handleError<any>('list of all report ', 
        []))
      );
    }
  
    get(url:string, id:string|string|number):Observable<any>{
      return this._client.get<any>(url + "/" + id)
        .pipe(
          tap(_ => console.log()),
          catchError(
            this._errorHandler.handleError<any>('Get '+id)
          )
        );
    }
  
    update(url:string, obj:any ):Observable<any>{
      return this._client.put<any>(url , obj)
        .pipe(
          tap(_ => console.log("Update object" + obj)),
          catchError(this._errorHandler.handleError<any>('Update object '+obj))
        )
    }
  
    create(url:string, obj:any):Observable<any>{
      console.log("Url post: "+url+" Obj: "+obj);
      return this._client.post<any>(url , obj)
        .pipe(
          tap(_ => this._log.log("Create object") ),
          catchError(this._errorHandler.handleError<any>('Create new obj '+obj))
          //catchError(this.processError)
        )
    }
  
    delete(url:string, id:string | string | number):Observable<any>{
      return this._client.delete<any>(url+"/"+id)
      .pipe(
        tap(_ => this._log.log("Delete obj") ),
        catchError(this._errorHandler.handleError<any>('Suppression du dossier '+id))
      )
    }
  
    processError(err) {
      let message = '';
      if(err.error instanceof ErrorEvent) {
       message = err.error.message;
      } else {
       message = `Error Code: ${err.status}\nMessage: ${err.message}`;
      }
      console.log(message);
    
      return throwError(err.status);
   }
}
