import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ColorsModel } from './colors.model';

@Component({
  selector: 'app-bootstrap-documentation-intro-colors',
  templateUrl: './colors.component.html',
  styleUrls: ['./colors.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationColorsComponent {
  srcCode!: string;

  constructor(public colorsModel: ColorsModel) {
    this.colorsModel.startForms();
  }

  getCss(): string {
    let classes = 'p-5 ';
    if (this.colorsModel.getValue('colors')) {
      classes += `text-${this.colorsModel.getValue('colors')}`;
    }
    if (this.colorsModel.getValue('background')) {
      classes += ' bg-';
      if (this.colorsModel.getControl('light').value === true) {
        classes += 'light-';
      }
      classes += this.colorsModel.getValue('background');
    }
    if (
      (this.colorsModel.getValue('opacity') ||
        this.colorsModel.getValue('opacity') === 0) &&
      this.colorsModel.getControl('light').value === false
    ) {
      const selected = this.colorsModel.getValue('opacity');
      const value = this.colorsModel.getOpacity().valuesList[+selected];
      if (value !== '100') {
        classes += ' opacity-' + value;
      }
    }
    this.srcCode =
      '\n<span class="' +
      classes +
      '">' +
      this.colorsModel.getValue('text') +
      '</span>';
    return classes;
  }

  onChanged() {
    this.getCss();
  }
}
