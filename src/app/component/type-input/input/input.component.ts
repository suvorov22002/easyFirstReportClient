import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Validators } from '@angular/forms';
import { DynamicEvidence } from 'src/app/modeles/dynamic-evidence';
import { EvidencesService } from 'src/app/service/evidences.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent extends DynamicEvidence implements OnInit {

  

  min:number;
  max:number;
  regex: string;

  public type:string = "text";

  TYPES = [
    "color",
    "date",
    "datetime-local",
    "email",
    "month",
    "number",
    "password",
    "search",
    "tel",
    "text",
    "time",
    "url",
    "week",
  ]

  constructor(
    _evidences:EvidencesService
  ) { 
    super(_evidences);
  }

  initType(){
    let type =  this.evidences.typeInput.valueOf().split("-")[1];
    if(this.TYPES.indexOf(type) >= 0){
      this.type = type;
      console.log('input component: '+this.type);
    }
   }

  
 
  ngOnInit() {
    this.initType();
  }

  get validators(){
    let validator = [];
    let d:Date;
    let minDate:Date;
    let maxDate:Date;
    switch(this.type){
      case 'color':
        break;
      case 'date':
          d = new Date();
          minDate = (new Date())
          minDate.setDate(d.getDate()-(this.min));
          maxDate = (new Date())
          maxDate.setDate(d.getDate()+(this.max))
          validator.push(Validators.min(minDate.getTime()))
          validator.push(Validators.max(maxDate.getTime()))
        break;
      case 'datetime-local':
          d = new Date();
          minDate = (new Date())
          minDate.setMinutes(d.getMinutes()-(this.min));
          maxDate = (new Date())
          maxDate.setMinutes(d.getMinutes()+(this.max))
          validator.push(Validators.min(minDate.getTime()))
          validator.push(Validators.max(maxDate.getTime()))
          break;
      case 'email':
        validator.push(Validators.email);
      case 'month':
      case 'number':
      case 'week':
        validator.push(Validators.min(this.min))
        validator.push(Validators.max(this.max))
        break;
      case 'password':
        validator.push(Validators.pattern(this.regex))
        break;
      case 'search':
        validator.push(Validators.pattern(this.regex))
        break;
      case 'text':
        validator.push(Validators.minLength(this.min))
        validator.push(Validators.maxLength(this.max))
        break;
      case 'time':
        //validate time
        break;
      case 'url':
        validator.push(Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'))
        break;
      case 'week':
        break;
    }
    return validator;
  }

  getErrorMessage() {
    return ( this.control.hasError('min') ? ' La valeur minimal est ' + this.min :
           this.control.hasError('max') ? ' La valeur maximal est ' + this.max :
           this.control.hasError('minlength') ? ' La chaine doit avoir au moins ' + this.min :
           this.control.hasError('maxlength') ? ' La chaine doit avoir au plus ' + this.max :
           this.control.hasError('regex') ? ' Le format de donnée est incorect' :
           this.control.hasError('required') ? ' Ce champs est obligatoire' :
           '' + JSON.stringify(this.control.errors)) + " mais vous avez saisie :" + this.control.value;
  }

}
