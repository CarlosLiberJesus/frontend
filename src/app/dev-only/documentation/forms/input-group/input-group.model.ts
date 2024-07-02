import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { IInput, EInputType } from 'src/modules/elements/forms/input/input';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';

export class InputGroupModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      labelText: new FormControl('Adicionar Título', []),
      msgText: new FormControl(
        'Mensagem importante que você deseja exibir',
        []
      ),
      optionsControl: new FormArray([], []),
      inputGroupText: new FormControl('@'),
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

  getOptions(): ICheckBoxList {
    return {
      name: 'options',
      css: [
        'mb-3',
        'gap-2',
        'me-5',
        'form-check-inline',
        'form-check-ancap',
        'form-check-white',
      ],
      checkbox: [
        {
          text: 'Mostrar Etiqueta',
          value: 'label',
        },
        {
          text: 'Mostrar Mensagem',
          value: 'message',
        },
      ],
    };
  }
}
