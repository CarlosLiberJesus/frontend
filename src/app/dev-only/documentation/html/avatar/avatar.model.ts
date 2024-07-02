import { FormControl, FormGroup } from '@angular/forms';
import { IRangeSlider } from 'src/modules/elements/forms/range-slider/range-slider';
import { IToggle } from 'src/modules/elements/forms/toggle/toggle';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';
import { ISelect } from 'src/modules/elements/forms/select/select';

export class AvatarModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      type: new FormControl('img', []),
      size: new FormControl(
        this.getSizeOptions().valuesList.findIndex(
          (elem: string) => elem === '50px'
        ),
        []
      ),
      ratio: new FormControl(false, []),
      badge: new FormControl(false, []),
      label: new FormControl('one', []),
      styles: new FormControl('symbol-rounded', []),
      position: new FormControl('topRight', []),
    });
  }

  getControl(controlName: string): FormControl {
    return this.formGroup.get(controlName) as FormControl;
  }
  getValue(controlName: string): string {
    return this.getControl(controlName).value;
  }

  getSizeOptions(): IRangeSlider {
    return {
      name: 'size',
      placeholder: 'Tamanho do Avatar',
      css: ['mb-5'],
      valuesList: [
        '20px',
        '25px',
        '30px',
        '35px',
        '40px',
        '45px',
        '50px',
        '55px',
        '60px',
        '65px',
        '70px',
        '75px',
        '90px',
        '100px',
        '125px',
        '150px',
        '160px',
        '175px',
        '200px',
      ],
    };
  }

  getRatioOption(): IToggle {
    return {
      name: 'ratio',
      text: 'Definir Proporção',
      css: [
        'gap-2',
        'form-check-ancap',
        'no-border',
        'form-check-solid-white',
        'mb-3',
      ],
      size: ['h-30px', 'w-50px'],
    };
  }

  getBadgeOption(): IToggle {
    return {
      name: 'badge',
      text: 'Mostrar Distintivo',
      css: [
        'gap-2',
        'form-check-ancap',
        'no-border',
        'form-check-solid-white',
        'mb-3',
      ],
      size: ['h-30px', 'w-50px'],
    };
  }

  getTypeOptions(): IRadioList {
    return {
      name: 'type',
      css: [
        'mb-2',
        'gap-2',
        'form-check-white',
        'form-check-ancap',
        'form-check-inline',
      ],
      radio: [
        {
          text: 'Imagem',
          value: 'img',
        },
        {
          text: 'Texto',
          value: 'text',
        },
      ],
    };
  }

  getLabelOptions(): IRadioList {
    return {
      name: 'label',
      css: [
        'mb-2',
        'gap-2',
        'form-check-white',
        'form-check-ancap',
        'form-check-inline',
      ],
      radio: [
        {
          text: 'Exemplo 1',
          value: 'one',
        },
        {
          text: 'Exemplo 2',
          value: 'two',
        },
        {
          text: 'Exemplo 3',
          value: 'three',
        },
      ],
    };
  }

  getStylesOptions(): IRadioList {
    return {
      name: 'styles',
      css: [
        'mb-2',
        'gap-2',
        'form-check-white',
        'form-check-ancap',
        'form-check-inline',
      ],
      radio: [
        {
          text: 'Arredondado',
          value: 'symbol-rounded',
        },
        {
          text: 'Círculo',
          value: 'symbol-circle',
        },
        {
          text: 'Quadrado',
          value: 'symbol-square',
        },
      ],
    };
  }

  getBadgeOptions(): ISelect {
    return {
      name: 'position',
      cssOption: ['text-dark'],
      placeholder: 'Posição do Distintivo',
      css: ['floating'],
      option: [
        {
          text: 'Topo Esquerda',
          value: 'topLeft',
        },
        {
          text: 'Topo Direita',
          value: 'topRight',
        },
        {
          text: 'Fundo Esquerda',
          value: 'bottomLeft',
        },
        {
          text: 'Fundo Direita',
          value: 'bottomRight',
        },
      ],
    };
  }
}
