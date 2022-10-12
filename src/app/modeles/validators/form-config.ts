  export class Node{
        type: string;
        validator?: {
            id: string,
            error: string
        };
  }

  export class EvidenceNode extends Node{
    evidence: string | Array<EvidenceNode>;
    min?:number;
    max?:number;
    regex?: string;

    constructor(){
        super();
    }
}

