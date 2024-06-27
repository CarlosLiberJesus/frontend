import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FontsModel } from './fonts.model';

@Component({
  selector: 'app-bootstrap-documentation-intro-fonts',
  templateUrl: './fonts.component.html',
  styleUrls: ['./fonts.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationFontsComponent {
  srcCode!: string;
  underline!: string;

  constructor(public fontsModel: FontsModel) {
    this.fontsModel.startForms();
  }

  getCss(): string {
    let classes = 'bg-secondary';
    if (this.fontsModel.getValue('underline')) {
      classes += ' position-relative ';
      classes +=
        ' ' +
        this.fontsModel.getUnderlineDistance().valuesList[
          +this.fontsModel.getValue('underlineDistance')
        ];
    }

    if (
      this.fontsModel.getValue('fontSize') ||
      this.fontsModel.getValue('fontSize') === 0
    ) {
      const value =
        this.fontsModel.getFontSizeOptions().valuesList[
          +this.fontsModel.getValue('fontSize')
        ];
      if (value !== 'default') {
        classes += ' ' + value;
      }
    }
    if (this.fontsModel.getValue('lineHeight') !== 'default') {
      classes += ' ' + this.fontsModel.getValue('lineHeight');
    }
    if (this.fontsModel.getValue('spacing') !== 'default') {
      classes += ' ' + this.fontsModel.getValue('spacing');
    }
    if (this.fontsModel.getValue('italic') !== 'default') {
      classes += ' ' + this.fontsModel.getValue('italic');
    }

    if (
      this.fontsModel.getControl('screen').value === true &&
      this.fontsModel.getValue('align') !== 'default'
    ) {
      classes += ' text-';
      if (this.fontsModel.getValue('resolution') !== null) {
        classes += this.fontsModel.getValue('resolution') + '-';
      }
      classes += this.fontsModel.getValue('align');
    } else if (this.fontsModel.getValue('align') !== 'default') {
      classes += ' text-' + this.fontsModel.getValue('align');
    }

    if (this.fontsModel.getValue('underline')) {
      this.underline =
        'd-inline-block position-absolute bottom-0 end-0 start-0 rounded';
      this.underline += ' bg-' + this.fontsModel.getValue('colors');
      this.underline +=
        ' ' +
        this.fontsModel.getUnderlineHeight().valuesList[
          +this.fontsModel.getValue('underlineHeight')
        ];
    }

    this.srcCode =
      '\n<span class="' +
      classes +
      '">\n  ' +
      this.fontsModel.getValue('text') +
      (this.fontsModel.getValue('underline')
        ? '\n  <span class="' + this.underline + '"></span>\n'
        : '') +
      '</span>';
    return classes;
  }

  onChanged() {
    this.getCss();
  }
}
