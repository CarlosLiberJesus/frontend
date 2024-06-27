import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeHighlightComponent } from './code-highlight.component';
import { CodeHighlightDirective } from './code-highlight.directive';
import { ClipboardModule } from 'ngx-clipboard';

@NgModule({
  declarations: [CodeHighlightComponent, CodeHighlightDirective],
  imports: [CommonModule, ClipboardModule],
  exports: [CodeHighlightComponent],
})
export class CodeHighlightModule {}
