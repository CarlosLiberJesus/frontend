import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ISpinner } from 'src/modules/elements/html/spinner/spinner';
import { SpinnerModel } from './spinner.model';

@Component({
  selector: 'app-bootstrap-documentation-html-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationSpinnerComponent {
  spinner!: ISpinner;
  srcCode!: string;

  constructor(public spinnerModel: SpinnerModel) {
    this.spinnerModel.startForms();
    this.getSpinner();
  }

  getSpinner() {
    this.spinner = {
      name: 'spinner',

      placeholder: {
        text: this.spinnerModel.getValue('text') + '',
      },
    };

    if (
      this.spinnerModel.getValue('style') === 'spinner-grow' ||
      this.spinnerModel.getValue('style') === 'spinner-border'
    ) {
      this.spinner.style = {
        css: [
          'me-5',
          this.spinnerModel.getValue('color')
            ? 'text-' + this.spinnerModel.getValue('color')
            : '',
          this.spinnerModel.getValue('style')
            ? '' + this.spinnerModel.getValue('style')
            : '',
          this.spinnerModel.getSizeOptions().valuesList[
            +(this.spinnerModel.getValue('size') ?? 0)
          ],
        ].filter(Boolean),
      };
    }
    if (this.spinnerModel.getValue('style') === 'animation') {
      this.spinner.animation = {
        text: '...',
        css: [
          'animate__animated animate__lightSpeedInLeft animate__faster animate__infinite',
        ],
      };
    }
    if (this.spinnerModel.getValue('style') === 'icon') {
      this.spinner.animation = {
        icon: {
          library: 'bi',
          value: 'bi-arrow-clockwise',
          css: ['fs-2x'],
        },
        css: [
          'animate__animated animate__rotateOut animate__normal animate__infinite',
        ],
      };
    }
    this.srcCode = '\nISpinner = ' + JSON.stringify(this.spinner, null, 2);
  }

  onChange(): void {
    this.getSpinner();
  }
}
