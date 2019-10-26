import {Component, ElementRef, ViewChild, Input} from '@angular/core';

@Component({
  selector: 'app-scripthack',
  templateUrl: './scripthack.component.html',
  styleUrls: ['./scripthack.component.css']
})
export class ScripthackComponent {

  @Input()
  src: string;

  @Input()
  type: string;

  // @ts-ignore
  @ViewChild('script') script: ElementRef;

  convertToScript() {
    // tslint:disable-next-line:prefer-const
    let element = this.script.nativeElement;
    // tslint:disable-next-line:prefer-const
    let script = document.createElement('script');
    script.type = this.type ? this.type : 'text/javascript';
    if (this.src) {
      script.src = this.src;
    }
    if (element.innerHTML) {
      script.innerHTML = element.innerHTML;
    }
    // tslint:disable-next-line:prefer-const
    let parent = element.parentElement;
    parent.parentElement.replaceChild(script, parent);
  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.convertToScript();
  }
}
