import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { IInput, EInputType } from 'src/modules/elements/forms/input/input';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';

export class TextareaModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      fakeTextarea: new FormControl(null, []),
      placeholderText: new FormControl('Etiqueta', []),
      labelText: new FormControl('Adicionar título', []),
      msgText: new FormControl(
        'Mensagem importante que você deseja exibir',
        []
      ),
      textareaOptions: new FormArray([], []),
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
    return this.getFormArray(arrayName)?.controls?.map(
      control => control.value
    );
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
      name: 'check-box',
      css: ['mb-3', 'me-5', 'form-check-inline', 'form-check-white', 'gap-2'],
      cssContainer: ['force-inline-align', 'gap-1'],
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
          text: 'Activar erros',
          value: 'error',
        },
        {
          text: 'Desativar',
          value: 'disabled',
        },
        {
          text: 'Flutuante',
          value: 'form-floating',
        },
      ],
    };
  }
}
