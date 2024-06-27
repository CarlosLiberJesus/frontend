import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';
import { IInput, EInputType } from 'src/modules/elements/forms/input/input';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';
import { ISelect } from 'src/modules/elements/forms/select/select';

export class InputModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      fakeInput: new FormControl(null, []),
      inputOptions: new FormArray([new FormControl('label', [])], []),
      color: new FormControl(null, []),
      placeholderText: new FormControl('Etiqueta', []),
      labelText: new FormControl('Título de Etiqueta', []),
      msgText: new FormControl(
        'Mensagem importante que você deseja exibir',
        []
      ),
      extraText: new FormControl('Adicione também uma mensagem extra', []),
      inputType: new FormControl(EInputType.TEXT, []),
      position: new FormControl('end', []),
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

  getOptions(): ICheckBoxList {
    const options: ICheckBoxList = {
      name: 'check-box',
      css: [
        'mb-3',
        'me-5',
        'gap-2',
        'form-check-primary',
        'form-check-white',
        'form-check-inline',
      ],
      checkbox: [
        {
          text: 'Desabilitado',
          value: 'disabled',
        },
        {
          text: 'Sólido',
          value: 'solid',
        },
        {
          text: 'Mostrar Etiqueta',
          value: 'label',
        },
        {
          text: 'Mostrar Mensagem',
          value: 'message',
        },
        {
          text: 'Floating',
          value: 'form-floating',
        },
      ],
    };
    if (this.getValue('inputType') === 'password') {
      options.checkbox.push({
        text: EInputType.PASSWORD,
        value: 'show-password',
      });
    } else {
      options.checkbox.push(
        {
          text: 'Mostrar Ícon',
          value: 'icon',
        },
        {
          text: 'Ativar Erros',
          value: 'error',
        }
      );
    }
    return options;
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

  getInputType(): IRadioList {
    return {
      name: 'radio',
      css: ['mb-3', 'gap-2', 'form-check-primary', 'form-check-white'],
      radio: [
        {
          text: EInputType.TEXT,
          value: 'text',
        },
        {
          text: EInputType.PASSWORD,
          value: 'password',
        },
      ],
    };
  }

  getColorsOptions(): ISelect {
    return {
      name: 'bullet-colors',
      placeholder: 'Cores',
      css: ['floating', 'unselect', 'mb-3'],
      cssOption: ['text-dark'],
      option: [
        {
          text: 'Branco',
          value: 'white',
          color: 'bg-white',
        },
        {
          text: 'Primária',
          value: 'primary',
          color: 'bg-primary',
        },
        {
          text: 'Secundária',
          value: 'secondary',
          color: 'bg-secondary',
        },
        {
          text: 'Sucesso',
          value: 'success',
          color: 'bg-success',
        },
        {
          text: 'Informação',
          value: 'info',
          color: 'bg-info',
        },
        {
          text: 'Aviso',
          value: 'warning',
          color: 'bg-warning',
        },
        {
          text: 'Perigo',
          value: 'danger',
          color: 'bg-danger',
        },
        {
          text: 'Claro',
          value: 'light',
          color: 'bg-light',
        },
        {
          text: 'Escuro',
          value: 'dark',
          color: 'bg-dark',
        },
      ],
    };
  }

  getPositionOptions(): ISelect {
    return {
      name: 'position',
      placeholder: 'Posição do Ícon',
      css: ['floating'],
      cssOption: ['text-dark'],
      option: [
        {
          text: 'Inicio',
          value: 'start',
        },
        {
          text: 'Fim',
          value: 'end',
        },
      ],
    };
  }
}
