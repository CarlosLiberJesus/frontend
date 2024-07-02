import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';
import { ISelect } from 'src/modules/elements/forms/select/select';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';

export class CarouselModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      tabOne: new FormControl('Conteúdo na aba exibida', []),
      tabTwo: new FormControl('Alternar seu conteúdo na aba exibida', []),
      tabThree: new FormControl('Apenas preencha ng-template', []),
      title: new FormControl('Título', []),
      style: new FormControl('default', []),
      options: new FormArray([], []),
      colorControl: new FormControl('primary', []),
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
      name: 'text' + name,
      type: EInputType.TEXT,
      autoReturn: true,
      placeholder: placeholder,
      cssInputContainer: ['mb-3', 'form-floating'],
    };
  }

  getStylesOptions(): ISelect {
    return {
      name: 'style',
      css: ['floating'],
      cssOption: ['text-dark'],
      placeholder: 'Estilos',
      option: [
        {
          text: 'Padrão',
          value: 'default',
        },
        {
          text: 'Pontos',
          value: 'dots',
        },
        {
          text: 'Indicadores',
          value: 'indicators',
        },
      ],
    };
  }

  getOptions(): ICheckBoxList {
    const options: ICheckBoxList = {
      name: 'options',
      css: [
        'mb-3',
        'me-5',
        'form-check-inline',
        'form-check-ancap',
        'form-check-white',
        'gap-2',
      ],
      checkbox: [
        {
          text: 'Definir Temporizador de 3s',
          value: 'timer',
        },
        /*
        TODO: Implement position in carousel-custom ??
        {
          text: this.bootstrapService.getTranslation(
            'DOCUMENTATION.NAVIGATION.CAROUSEL.MODEL.OPTIONS.POSITION'
          ),
          value: 'position',
        },
        */
      ],
    };
    if (this.getValue('style') === 'default') {
      options.checkbox.push(
        {
          text: 'Legendas',
          value: 'captions',
        },
        {
          text: 'Indicadores',
          value: 'indicators',
        }
      );
    } else {
      options.checkbox.push({
        text: 'Cores',
        value: 'colors',
      });
    }
    return options;
  }

  getColorOptions(): ISelect {
    return {
      name: 'colors',
      cssOption: ['text-dark'],
      placeholder: 'Cores',
      css: ['icon-check', 'unselect', 'floating', 'min-w-150px'],
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
          text: 'Alerta',
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
}
