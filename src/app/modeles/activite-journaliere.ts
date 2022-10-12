import { Activite } from "./activite";
import { RapportJournalier } from "./rapport-journalier";

export class ActiviteJournaliere {
    nombre:number;
    volume:number;
    commentaire:string;
    activite:Activite;
    dateSaisie:Date = new Date();
    rapport:RapportJournalier;
    evidences:string;
}
