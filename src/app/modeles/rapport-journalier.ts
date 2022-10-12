import { StatutRapport } from "../enums/statut-rapport.enum";
import { ActiviteJournaliere } from "./activite-journaliere";

export class RapportJournalier {
    id:number;
    reference:string;
    editeur:string;
    nomEditeur:string;
    dateSaisie:Date = new Date();
    dateRapport:Date = new Date();
    dateModification:Date = new Date();
    statut:StatutRapport;
    unite:string;
    etapeSuivante:string;
    activites:Array<ActiviteJournaliere> = [];
    dateDebut:Date;
    dateFin:Date;
    specialite:string;
}
