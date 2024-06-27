import { ElementRef } from '@angular/core';
import { CodeHighlightDirective } from './code-highlight.directive';

describe('ShowCodeDirective', () => {
  it('should create an instance', () => {
    const directive = new CodeHighlightDirective({} as ElementRef);
    expect(directive).toBeTruthy();
  });
});
