import { Injectable } from '@angular/core';
import { AfbcoreService } from 'afbcore';
import { Activite } from '../modeles/activite';
import { RapportJournalier } from '../modeles/rapport-journalier';
import { ActiviteJournaliereService } from './activite-journaliere.service';
import { ActiviteService } from './activite.service';
import { CategorieService } from './categorie.service';
import { EtapeService } from './etape.service';
import { EvidencesService } from './evidences.service';
import { AppConfigService } from './helper/app-config.service';
import { ToastService } from './helper/toast.service';
import { ObjectsService } from './objects.service';
import { OperationRapportService } from './operation-rapport.service';
import { RapportJournalierService } from './rapport-journalier.service';
import { ReportingService } from './reporting.service';
import { ShareService } from './share.service';

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  url_3: string = "";
  url_1: string = "";
  url_2: string = "";
  url: string = "";
  url_4: string = "";
  url_5: string = "";
  url_6: string = "";
  url_7: string = "";
 



  constructor(
    private _rapJnr:RapportJournalierService,
    private _toast: ToastService,
    private _config:AppConfigService,
    private _activi:ActiviteService,
    private actvjr:ActiviteJournaliereService,
    private _evi:EvidencesService,
    private _catg:CategorieService,
    private _objservice:ObjectsService,
    private _etap:EtapeService,
    private _reportserv:ReportingService,
    private _opersev:OperationRapportService,
    private afbcore: AfbcoreService,
    private service: ShareService,
  ) { 
    this.service.apiHost = "http://192.168.11.75:9001/easyfirstreport-service/rest/api/easyfirstreport"
      this.url_3 = this.service.apiHost + this._rapJnr.getPath();
      this.url_1 = this.service.apiHost + this._activi.getPath();
      this.url_2 = this.service.apiHost + this._evi.getPath();
      this.url = this.service.apiHost + this._catg.getPath();
      this.url_4 = this.service.apiHost + this._etap.getPath();
      this.url_5 = this.service.apiHost + this._reportserv.getPath();
      this.url_6 = this.service.apiHost + this.actvjr.getPath();
      this.url_7 = this.service.apiHost + this._opersev.getPath();
  }

  /** liste de tous les rapports journaliers */
  getAllRapport(){
    return this._objservice.list(this.url_3, "/getall")
  }

  /** liste de tous les rapports journaliers */
  getAllRapportByUser(obj){
    return this._objservice._list(this.url_3 + "/findrapportjournalier", obj)
  }

  /** creation d'un nouveau rapport: init */
  saveR(rapport:RapportJournalier){
    return this._objservice.create(this.url_3 + "/create",  rapport)
  }

  /** liste des activités par reference */
  getActivityCode(ref:string){
    return this._objservice.get(this.url_1+"/findbyreference", ref)
  }

  /** liste des evidences par code */
  getEvidenceCode(code:string){
    return this._objservice.get(this.url_2 + "/findbycode", code)
  }

//  /** liste des categories par reference */
//  getCategorieRef(ref:string){
//    return this._catg.get(this.url+"/findbyreference", ref)
//  }

  /** ajouter une activité */
  addActivity(activite){
    return this._objservice.create(this.url_1 + "/add", activite)
  }
  /** liste des activités par */
  getActivite(obj:Activite){
    return this._activi.listAllActiviteId(this.url_1+"/findactivite", obj)
  }

  /** liste de toutes les activités */
  getAllActivite(){
    return  this._objservice.list(this.url_1 + "/getall")
  }

  /** liste de toutes les categories */
  getAllCategorie(){
  //  return this._catg.list(this.url, "/getall")
    return this._objservice.list(this.url, "/getall")
  }

  /** Get Category by reference */
  getCategoryByRef(ref){
    return this._objservice.get(this.url+"/findbyreference", ref);
  }

  /** Ajouter une categorie */
  addCategory(categ){
    return this._objservice.create(this.url + "/add", categ)
  }

  /** Ajouter une evidence */
  addEvidence(evidence){
    return this._objservice.create(this.url_2 + "/add", evidence)
  }

  /** liste de toutes les evidences */
  AllEvidence(){
    //return this.afbcore.callGetService(this.service.apiHost, this._evi.getPath()+'/getall', null, '', null)
    return this._objservice.list(this.url_2, "/getall")
  }

  /** Evidence par code */
  getEvidenceByCode(code){
    //return this.afbcore.callGetService(this.service.apiHost, this._evi.getPath()+'/findbycode', code, '', null)
    return this._objservice.get(this.url_2+"/findbycode", code)
  }

  /** Mise à jour de l'evidence */
  updateEvidence(e){
    return this._objservice.update(this.url_2 + "/update", e)
  }

  /** Ajouter etape */
  addEtape(etape){
    return this._objservice.create(this.url_4 + "/add", etape)
  }

  /** Liste de toutes les etapes */
  getAllEtapes(){
    return this._objservice.list(this.url_4 + "/getall")
  }

  /** Update une etape */
  updateEtape(etape){

  }

  /** Reporting */
  getAllReportRapport(obj){
    return this._objservice._list(this.url_5 + "/getstatactivites", obj)
  }

  /** liste des rapports journaliere par ref */
  getRapportJnrByRef(ref){
    return this._objservice.list(this.url_6+"/findbyrefrapportjournalier/", ref)
  }

  /** ajouter operation rapport */
  addOperationRapport(op){
    return  this._objservice.create(this.url_7 + "/saveoperationrapports", op)
  }

}
