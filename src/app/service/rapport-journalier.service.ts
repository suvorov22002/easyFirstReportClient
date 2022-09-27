import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AfbcoreService } from 'afbcore';
import { RapportJournalier } from '../modeles/rapport-journalier';
import { CrudService } from './crud.service';
import { AppConfigService } from './helper/app-config.service';
import { HttpErrorHandlerService } from './helper/http-error-handler.service';
import { LogService } from './helper/log.service';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root'
})
export class RapportJournalierService extends CrudService<RapportJournalier>{

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
}
