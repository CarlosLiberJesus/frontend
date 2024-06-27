import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';
import { IInput, EInputType } from 'src/modules/elements/forms/input/input';
import { IMultiSelectOption } from 'src/modules/elements/forms/multi-select/multi-select';

export class MultiSelectModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      fakeMultiSelect: new FormArray([], []),
      selectOptions: new FormArray([], []),
      labelText: new FormControl('Adicionar Título', []),
      msgText: new FormControl(
        'Mensagem importante que você deseja exibir',
        []
      ),
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

  getSelectOptions(): ICheckBoxList {
    return {
      name: 'select-options',
      css: ['mb-3', 'me-5', 'form-check-inline', 'form-check-white', 'gap-2'],
      cssContainer: ['force-inline-align', 'gap-1'],
      checkbox: [
        {
          text: 'Mostrar Etiqueta',
          value: 'label',
        },
        {
          text: 'Mostrar Mensagem',
          value: 'message',
        },
        {
          text: 'Activar Erros',
          value: 'error',
        },
        {
          text: 'Desativado',
          value: 'disabled',
        },
        {
          text: 'Flutuante',
          value: 'floating',
        },
        {
          text: 'Pesquisar',
          value: 'search',
        },
        {
          text: 'Sem Margens',
          value: 'borderless',
        },
      ],
    };
  }

  getDefaultOptions(): IMultiSelectOption[] {
    return [
      {
        text: 'Opção 1',
        value: 'value1',
        cssLabel: ['text-dark'],
        cssInput: ['form-check-input'],
      },
      {
        text: 'Opção 2',
        value: 'value2',
        cssLabel: ['text-dark'],
        cssInput: ['form-check-input'],
      },
      {
        text: 'Opção 3',
        value: 'value3',
        cssLabel: ['text-dark'],
        cssInput: ['form-check-input'],
      },
      {
        text: 'Opção 4',
        value: 'value4',
        cssLabel: ['text-dark'],
        cssInput: ['form-check-input'],
      },
    ];
  }
}
