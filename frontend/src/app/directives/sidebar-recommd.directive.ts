import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appSidebarRecommd]'
})
export class SidebarRecommdDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
