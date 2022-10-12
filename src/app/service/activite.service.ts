import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AfbcoreService } from 'afbcore';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Activite } from '../modeles/activite';
import { CrudService } from './crud.service';
import { AppConfigService } from './helper/app-config.service';
import { HttpErrorHandlerService } from './helper/http-error-handler.service';
import { LogService } from './helper/log.service';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root'
})
export class ActiviteService extends CrudService<Activite> {

  getPath(): string {
    return "/activite";
  }
  
  constructor(
    _client : HttpClient,
     _log : LogService,
     _errorHandler : HttpErrorHandlerService,
     _config : AppConfigService,
     _shared : ShareService,
     afbcore: AfbcoreService
  ) {
    super(_client, _log, _errorHandler, _shared, afbcore);
  }

  listAllActivite(url:string, _path?:string):Observable<Activite[]>{
    //list(filter?:{}, _path?:any):Observable<T[]>{
      let params = new HttpParams();
      let filter = {};
   
      return this._client.get<Activite[]>(url, {})
        .pipe(
          tap( _ => console.log()),
          catchError(this._errorHandler.handleError<Activite[]>('list of all activites ', 
          []))
        );
    }

    listAllActiviteId(url:string, obj?:any):Observable<Activite[]>{

      return this._client.post<Activite[]>(url, obj)
      .pipe(
        tap( _ => console.log()),
        catchError(this._errorHandler.handleError<Activite[]>('list of all activites ', 
        []))
      );
    }

}
