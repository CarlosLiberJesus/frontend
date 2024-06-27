import { FormGroup, FormControl } from '@angular/forms';
import { ISelect } from 'src/modules/elements/forms/select/select';
import { IRangeSlider } from 'src/modules/elements/forms/range-slider/range-slider';

export class BulletsModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      color: new FormControl(null, []),
      style: new FormControl('', []),
      size: new FormControl(
        this.getSizeOptions().valuesList.findIndex(
          (elem: string) => elem === 'none'
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

  getColorsOptions(): ISelect {
    return {
      name: 'bullet-colors',
      cssOption: ['text-dark'],
      placeholder: 'Cores',
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
      name: 'bullet-styles',
      cssOption: ['text-dark'],
      placeholder: 'Estilos',
      css: [],
      option: [
        {
          text: 'Padrão',
          value: '',
        },
        {
          text: 'Pontilhado',
          value: 'bullet-dot',
        },
        {
          text: 'Vertical',
          value: 'bullet-vertical',
        },
        {
          text: 'Linha',
          value: 'bullet-line',
        },
      ],
    };
  }
  getSizeOptions(): IRangeSlider {
    return {
      name: 'bullets-size',
      placeholder: 'Tamanho',
      css: ['mb-5'],
      valuesList: ['none', 'h-15px w-25px', 'h-20px w-30px', 'h-30px w-50px'],
    };
  }
}
