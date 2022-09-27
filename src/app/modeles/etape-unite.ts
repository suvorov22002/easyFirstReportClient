import { Etape } from "./etape";
import { GroupeUnite } from "./groupe-unite";

export class EtapeUnite {
    id:number;
    etape:Array<Etape> = [];
    utilisateurs:string;
    groupeUnite:GroupeUnite;
}
