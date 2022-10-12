import { CategorieActivite } from "./categorie-activite";
import { Evidences } from "./evidences";

export class Activite {
    id:number;
    reference:string;
    libelle:string;
    typeEvidences:Array<Evidences> = [];
    evidences:string;
    actif:boolean = true;
    categorieActivite:CategorieActivite;
}
