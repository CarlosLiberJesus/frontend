import { FormControl, FormGroup } from '@angular/forms';
import { ISelect } from 'src/modules/elements/forms/select/select';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';

export class AlertsModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      title: new FormControl('Este é um alerta', []),
      text: new FormControl(
        'O componente de alerta pode ser usado para destacar certas partes da sua página para maior visibilidade do conteúdo.',
        []
      ),
      color: new FormControl(null, []),
      alert: new FormControl(null, []),
    });
  }

  getControl(controlName: string): FormControl {
    return this.formGroup.get(controlName) as FormControl;
  }
  getValue(controlName: string): string {
    return this.getControl(controlName).value;
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

  getColorOptions(): ISelect {
    return {
      name: 'color-option',
      cssOption: ['text-dark'],
      placeholder: 'Cores',
      css: ['mb-5', 'floating'],
      option: [
        {
          text: 'Primário',
          value: 'primary',
          color: 'bg-primary',
        },
        {
          text: 'Secundário',
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
          text: 'Escuro',
          value: 'dark',
          color: 'bg-dark',
        },
      ],
    };
  }

  getAlertOptions(): IRadioList {
    return {
      name: 'alert-options',
      css: [
        'form-check-inline',
        'form-check-white',
        'gap-2',
        'form-check-ancap',
      ],
      radio: [
        {
          text: 'Sólido',
          value: 'solid',
        },
        {
          text: 'Claro',
          value: 'light',
        },
        {
          text: 'Fechar',
          value: 'dismissible',
        },
      ],
    };
  }
}
