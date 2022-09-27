import { StatutRapport } from "../enums/statut-rapport.enum";
import { RapportJournalier } from "./rapport-journalier";

export class OperationRapport {
    id:number;
    etape:string; //action à cette etape
    dateOperation:Date;
    userOpe:string;
    userLevels:string;//pour les habilitations; si plusieurs splitter
    decision:StatutRapport;
    commentaire:string;
    rapports:Array<RapportJournalier>;
}
