import { FormGroup, FormControl } from '@angular/forms';
import { IRangeSlider } from 'src/modules/elements/forms/range-slider/range-slider';
import { ISelect } from 'src/modules/elements/forms/select/select';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';

export class SpinnerModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      text: new FormControl('Carregando...', []),
      color: new FormControl(null, []),
      style: new FormControl('spinner-border', []),
      size: new FormControl(
        this.getSizeOptions().valuesList.findIndex(
          (elem: string) => elem === 'h-30px w-30px'
        ),
        []
      ),
    });
  }

  getControl(controlName: string): FormControl {
    return this.formGroup.get(controlName) as FormControl;
  }
  getValue(controlName: string): number | string | undefined {
    return this.getControl(controlName).value ?? undefined;
  }

  getInputText(): IInput {
    return {
      name: 'text',
      type: EInputType.TEXT,
      autoReturn: true,
      placeholder: 'Texto a ser usado',
      cssInputContainer: ['mb-3', 'form-floating'],
    };
  }

  getColorsOptions(): ISelect {
    return {
      name: 'spinner-colors',
      cssOption: ['text-dark'],
      placeholder: 'Cor do spinner',
      css: [],
      option: [
        {
          text: 'Branco',
          value: 'white',
          color: 'bg-white',
        },
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
  getStyleOptions(): ISelect {
    return {
      name: 'spinner-style',
      cssOption: ['text-dark'],
      placeholder: 'Estilos',
      css: ['floating'],
      option: [
        {
          text: 'Roda',
          value: 'spinner-border',
        },
        {
          text: 'Crescer',
          value: 'spinner-grow',
        },
        {
          text: 'Animação',
          value: 'animation',
        },
        {
          text: 'Ícon',
          value: 'icon',
        },
      ],
    };
  }

  getSizeOptions(): IRangeSlider {
    return {
      name: 'spinner-size',
      placeholder: 'Tamanho',
      css: ['mb-5'],
      valuesList: [
        'h-10px w-10px',
        'h-20px w-20px',
        'h-30px w-30px',
        'h-40px w-40px',
        'h-50px w-50px',
      ],
    };
  }
}
