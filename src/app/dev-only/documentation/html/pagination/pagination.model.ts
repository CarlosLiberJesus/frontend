import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { IInput, EInputType } from 'src/modules/elements/forms/input/input';
import { ISelect } from 'src/modules/elements/forms/select/select';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';

export class PaginationModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      page: new FormControl(1, []),
      perPage: new FormControl(10, []),
      total: new FormControl(100, []),
      style: new FormControl('square', []),
      options: new FormArray([], []),
    });
  }

  getControl(controlName: string): FormControl {
    return this.formGroup.get(controlName) as FormControl;
  }
  getFormArray(arrayName: string): FormArray {
    return this.formGroup.get(arrayName) as FormArray;
  }
  getValue(controlName: string): string {
    return this.getControl(controlName).value;
  }
  getFormArrayValue(arrayName: string): string[] {
    return this.getFormArray(arrayName).controls.map(control => control.value);
  }

  getInputText(name: string, placeholder: string): IInput {
    return {
      name: name,
      type: EInputType.TEXT,
      autoReturn: true,
      placeholder: placeholder,
      cssInputContainer: ['mb-3', 'form-floating'],
    };
  }

  getStylesOptions(): ISelect {
    return {
      name: 'style',
      css: ['floating', 'w-100'],
      cssOption: ['text-dark'],
      placeholder: 'Estilos',
      option: [
        {
          text: 'Quadrado',
          value: 'square',
        },
        {
          text: 'Círculo',
          value: 'pagination-circle',
        },
        {
          text: 'Quadrado Contornado',
          value: 'pagination-outline',
        },
        {
          text: 'Círculo Contornado',
          value: 'pagination-circle pagination-outline',
        },
      ],
    };
  }

  getOptions(): ICheckBoxList {
    return {
      name: 'options',
      css: [
        'mb-3',
        'me-5',
        'gap-2',
        'form-check-inline',
        'form-check-ancap',
        'form-check-white',
      ],
      checkbox: [
        {
          text: 'Mostrar extremos',
          value: 'extremes',
        },
        {
          text: 'Mostrar texto',
          value: 'text',
        },
        {
          text: 'Versão Curta',
          value: 'short',
        },
        {
          text: 'Sem Ícones',
          value: 'hide',
        },
      ],
    };
  }
}
