import { StatutRapport } from "../enums/statut-rapport.enum";
import { TypeOperation } from "../enums/type-operation.enum";

export class Etape {
    id:number;
    code:string;
    libelle:string;
    typeOperation:TypeOperation;
    ordre:number;
    dureeEtape:number = 0;
    enUnite:boolean;
    retours:Array<string>;
    decisions:Array<StatutRapport>;
    actif:boolean;
}
