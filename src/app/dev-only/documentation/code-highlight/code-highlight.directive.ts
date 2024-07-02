import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

import 'prismjs';

import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-markup'; // Test HTML
//import 'prismjs/components/prism-json';
/** TODO: importing this is not working as expected
 * they all ouput as js, and wanted to remove the left side quotes 
Prism.languages.json = {
	'property': {
		pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?=\s*:)/,
		lookbehind: true,
		greedy: true
	},
	'string': {
		pattern: /(^|[^\\])"(?:\\.|[^\\"\r\n])*"(?!\s*:)/,
		lookbehind: true,
		greedy: true
	},
	'comment': {
		pattern: /\/\/.*|\/\*[\s\S]*?(?:\*\/|$)/,
		greedy: true
	},
	'number': /-?\b\d+(?:\.\d+)?(?:e[+-]?\d+)?\b/i,
	'punctuation': /[{}[\],]/,
	'operator': /:/,
	'boolean': /\b(?:false|true)\b/,
	'null': {
		pattern: /\bnull\b/,
		alias: 'keyword'
	}
};
Prism.languages.webmanifest = Prism.languages.json;
*/

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
      Prism.languages.typescript,
      'typescript'
      //this.language !== 'language-js' ? Prism.languages.html : Prism.languages.javascript,
      //this.language !== 'language-js' ? 'html' :'javascript'
    );
  }
}
