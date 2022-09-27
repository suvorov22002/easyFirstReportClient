import { EtapeUnite } from "./etape-unite";

export class GroupeUnite {
    id:number;
    unite:string;
    specialite:string;
    etapes:Array<EtapeUnite> = [];
    actif:boolean;
}
