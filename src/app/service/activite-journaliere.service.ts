import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AfbcoreService } from 'afbcore';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ActiviteJournaliere } from '../modeles/activite-journaliere';
import { CrudService } from './crud.service';
import { AppConfigService } from './helper/app-config.service';
import { HttpErrorHandlerService } from './helper/http-error-handler.service';
import { LogService } from './helper/log.service';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root'
})
export class ActiviteJournaliereService extends CrudService<ActiviteJournaliere>{

  getPath(): string {
    return "/activitejournaliere";
  }

  constructor(
    _client : HttpClient,
    _log : LogService,
    _errorHandler : HttpErrorHandlerService,
    _config : AppConfigService,
    _shared : ShareService,
    afbcore: AfbcoreService
  ) 
  { 
    super(_client, _log, _errorHandler, _shared, afbcore);
  }
  
}
