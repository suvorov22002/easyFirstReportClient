import { TypeInput } from "../enums/type-input.enum";
import { ResponseBase } from "./response-base";

export class Evidences extends ResponseBase{
    id:number;
    code:string;
    libelle:string;
    checked:boolean;
    actif:boolean;
    typeInput:TypeInput;
}
