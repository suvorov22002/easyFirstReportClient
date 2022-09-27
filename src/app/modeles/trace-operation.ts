import { StatutRapport } from "../enums/statut-rapport.enum";
import { Etape } from "./etape";
import { RapportJournalier } from "./rapport-journalier";


export class TraceOperation {
    id:number;
    dateOperation:Date;
    userOpe:string;
    commentaire:string;
    dureeOpeHr:number = 0;
    dureeOpeJr:number = 0;
    horsDelai:boolean;
    dateDebut:Date;
    dateFin:Date;
    etape:Etape;
    rapport:RapportJournalier;
    decision:StatutRapport
}
