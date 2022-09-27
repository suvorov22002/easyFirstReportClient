import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AfbcoreService } from 'afbcore';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Reporting } from '../modeles/reporting';
import { CrudService } from './crud.service';
import { AppConfigService } from './helper/app-config.service';
import { HttpErrorHandlerService } from './helper/http-error-handler.service';
import { LogService } from './helper/log.service';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root'
})
export class ReportingService extends CrudService<Reporting>{

  getPath(): string {
    return "/rapportjournalier";
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

  listRapport(url:string, _path?:string):Observable<Reporting[]>{
    //list(filter?:{}, _path?:any):Observable<T[]>{
      let params = new HttpParams();
      let filter = {};
   
      return this._client.post<Reporting[]>(url, {})
        .pipe(
          tap( _ => console.log()),
          catchError(this._errorHandler.handleError<Reporting[]>('list of all filter '+filter, 
          []))
        );
    }

    _listRapport(url:string, obj?:any):Observable<Reporting[]>{

      return this._client.post<Reporting[]>(url, obj)
      .pipe(
        tap( _ => console.log()),
        catchError(this._errorHandler.handleError<Reporting[]>('list of all report ', 
        []))
      );
    }
}
