import { Component, ComponentFactoryResolver, ComponentRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { TypeInput } from 'src/app/enums/type-input.enum';
import { DynamicEvidence } from 'src/app/modeles/dynamic-evidence';
import { Evidence } from 'src/app/modeles/evidence';
import { Evidences } from 'src/app/modeles/evidences';
import { DatepickerComponent } from '../type-input/datepicker/datepicker.component';
import { InputBooleanComponent } from '../type-input/input-boolean/input-boolean.component';
import { InputRadioComponent } from '../type-input/input-radio/input-radio.component';
import { InputSelectComponent } from '../type-input/input-select/input-select.component';
import { InputComponent } from '../type-input/input/input.component';
import { RichTextComponent } from '../type-input/rich-text/rich-text.component';
import { SimpleTextComponent } from '../type-input/simple-text/simple-text.component';
import { UnknowQuestionComponent } from '../unknow-question/unknow-question.component';

@Component({
  selector: 'app-dynamic-evidence',
  templateUrl: './dynamic-evidence.component.html',
  styleUrls: ['./dynamic-evidence.component.css']
})
export class DynamicEvidenceComponent implements OnInit, OnDestroy {

  private componentRef: ComponentRef<{}>
 

  @ViewChild('container' , {read: ViewContainerRef , static:true})
  container: ViewContainerRef
  
  @Input('evid')
  evidences:Evidences;

  @Input('mappings')
  mappings:any;

  @Output() _childToParent = new EventEmitter<any>();

  evis:Array<Evidence> = [];

  
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  sendToParent(name:any){
    console.log("Init result: "+name);
    this._childToParent.emit(name);
  }

  childToParent(name:any){
    this.evis = name;
    console.log("Final  result: "+this.evis);
  }

  getComponentType(typeName:TypeInput){
    var indx = TypeInput[typeName].valueOf(); 
    console.log('typename: '+indx);
    if(!typeName){
      return UnknowQuestionComponent;
    }
    let type = this.mappings[indx];
    return type || UnknowQuestionComponent;
  }

  ngOnInit() {
    this.initMapping();
    this.initComponent();
  }

  ngOnDestroy(): void {
    this.destroyComponent();
  }

  initMapping(){
    this.mappings = {
      'input-color': InputComponent,
      'input-date': DatepickerComponent,
      'input-datetime-local': InputComponent,
      'input-email': InputComponent,
      'input-month': InputComponent,
      'input-number': InputComponent,
      'input-password': InputComponent,
      'input-search': InputComponent,
      'input-tel': InputComponent,
      'input-text': InputComponent,
      'input-time': InputComponent,
      'input-url': InputComponent,
      'input-week': InputComponent,
      'radio': InputRadioComponent,
      'select': InputSelectComponent,
      'text': SimpleTextComponent,
      'rich-text': RichTextComponent,
      'boolean': InputBooleanComponent
    }
  }

  initComponent(){
  //  console.log('evidences: '+this.evidences);
    let componentType = this.getComponentType(this.evidences.typeInput)
  //  console.log('componentType: '+componentType);
    let factory = this.componentFactoryResolver.resolveComponentFactory(componentType);
    this.container.clear();
    this.componentRef = this.container.createComponent(factory);
    let instance = <DynamicEvidence>this.componentRef.instance;
   
    instance.evidences = this.evidences;
    
    instance.init();
    
  }

  destroyComponent(){
    if (this.componentRef) {
      this.componentRef.destroy();
      this.componentRef = null;
    }
  }


}
