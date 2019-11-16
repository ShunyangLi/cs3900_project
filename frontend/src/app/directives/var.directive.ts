import {Directive, Input} from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[var]',
  exportAs: 'var'
})
export class VarDirective {
  @Input() var: any;
  constructor() { }

}
