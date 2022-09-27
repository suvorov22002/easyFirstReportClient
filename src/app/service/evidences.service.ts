import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AfbcoreService } from 'afbcore';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { Evidences } from '../modeles/evidences';
import { CrudService } from './crud.service';
import { AppConfigService } from './helper/app-config.service';
import { HttpErrorHandlerService } from './helper/http-error-handler.service';
import { LogService } from './helper/log.service';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root'
})
export class EvidencesService extends CrudService<Evidences> {
  

  getPath(): string {
    return "/typeevidence";
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

  listAllEvidence(url:string, _path?:string):Observable<Evidences[]>{
    //list(filter?:{}, _path?:any):Observable<T[]>{
      let params = new HttpParams();
      let filter = {};
   
      return this._client.post<Evidences[]>(url, {})
        .pipe(
          tap( _ => console.log()),
          catchError(this._errorHandler.handleError<Evidences[]>('list of all filter '+filter, 
          []))
        );
    }

}
