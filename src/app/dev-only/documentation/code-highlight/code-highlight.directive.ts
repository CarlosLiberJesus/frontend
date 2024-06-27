import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

import 'prismjs';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let Prism: any;

@Directive({
  selector: '[appHighlightCode]',
})
export class CodeHighlightDirective implements OnChanges {
  @Input() srcCode!: string;
  @Input() language!: string; // TODO ?: Prism add type-script support

  constructor(private elementRef: ElementRef) {}

  ngOnChanges(): void {
    this.refresh();
  }

  refresh() {
    this.elementRef.nativeElement.innerHTML = Prism.highlight(
      this.srcCode,
      Prism.languages.javascript,
      'javascript'
      //this.language !== 'language-js' ? Prism.languages.html : Prism.languages.javascript,
      //this.language !== 'language-js' ? 'html' :'javascript'
    );
  }
}
