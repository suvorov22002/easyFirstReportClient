import { Activite } from "./activite";
import { ResponseBase } from "./response-base";

export class CategorieActivite extends ResponseBase{
    id:number;
    reference:string;
    libelle:string;
    profils:string;
    actif:boolean;
    activites:Array<Activite> = [];
}
