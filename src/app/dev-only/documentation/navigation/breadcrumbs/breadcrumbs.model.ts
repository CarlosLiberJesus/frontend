import { FormGroup, FormControl } from '@angular/forms';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';

export class BreadcrumbsModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      style: new FormControl('', []),
    });
  }
  getControl(controlName: string): FormControl {
    return this.formGroup.get(controlName) as FormControl;
  }
  getValue(controlName: string): string {
    return this.getControl(controlName).value;
  }

  getStyleOptions(): IRadioList {
    return {
      name: 'options',
      css: [
        'form-check-inline',
        'form-check-ancap',
        'form-check-white',
        'gap-2',
      ],
      radio: [
        {
          text: 'Barra',
          value: '',
        },
        {
          text: 'Linha',
          value: 'breadcrumb-line',
        },
        {
          text: 'Ponto',
          value: 'breadcrumb-dot',
        },
        {
          text: 'Sem Separador',
          value: 'breadcrumb-separatorless',
        },
      ],
    };
  }
}
