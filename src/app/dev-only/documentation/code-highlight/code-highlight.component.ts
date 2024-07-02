import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'app-bootstrap-documentation-code-highlight',
  templateUrl: './code-highlight.component.html',
  styleUrls: ['./code-highlight.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeHighlightComponent {
  @Input() srcCode!: string;
  @Input() language!: string;
  copyText = 'Copiar';

  constructor(private cdr: ChangeDetectorRef) {}

  getLanguage(): string {
    if (this.language) {
      return 'language-' + this.language;
    }
    return 'language-typescript';
  }

  copy() {
    this.copyText = 'Copiado!';
    setTimeout(() => {
      this.copyText = 'Copiar';
      this.cdr.detectChanges();
    }, 1500);
  }
}
