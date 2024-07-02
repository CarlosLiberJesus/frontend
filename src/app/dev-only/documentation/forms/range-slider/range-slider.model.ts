import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';

export class RangeSliderModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      slider: new FormControl(5, []),
      placeholderText: new FormControl('Selecionado', []),
      labelText: new FormControl('Adicionar título', []),
      msgText: new FormControl(
        'Mensagem importante que você deseja exibir',
        []
      ),
      optionsControl: new FormArray([], []),
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
        'me-5',
        'form-check-inline',
        'form-check-white',
        'form-check-ancap',
        'gap-3',
      ],
      checkbox: [
        {
          text: 'Mostrar etiqueta',
          value: 'label',
        },
        {
          text: 'Mostrar mensagem',
          value: 'message',
        },
        {
          text: 'Desactivar',
          value: 'disabled',
        },
      ],
    };
  }
}
