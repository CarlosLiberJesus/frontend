import { FormGroup, FormControl } from '@angular/forms';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';
import { IRangeSlider } from 'src/modules/elements/forms/range-slider/range-slider';
import { ISelect } from 'src/modules/elements/forms/select/select';
import { IToggle } from 'src/modules/elements/forms/toggle/toggle';

export class FontsModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      text: new FormControl('Imagine o Texto', []),
      fontSize: new FormControl(
        this.getFontSizeOptions().valuesList.findIndex(
          (elem: string) => elem === 'default'
        ),
        []
      ),
      fontFamily: new FormControl('roboto', []),
      lineHeight: new FormControl('default', []),
      spacing: new FormControl('default', []),
      italic: new FormControl('default', []),
      align: new FormControl('default', []),
      screen: new FormControl(false, []),
      resolution: new FormControl(null, []),
      underline: new FormControl(false, []),
      colors: new FormControl('dark', []),
      underlineHeight: new FormControl(
        this.getUnderlineHeight().valuesList.findIndex(
          (elem: string) => elem === 'h-1px'
        ),
        []
      ),
      underlineDistance: new FormControl(
        this.getUnderlineDistance().valuesList.findIndex(
          (elem: string) => elem === 'pb-0'
        ),
        []
      ),
    });
  }

  getControl(controlName: string): FormControl {
    return this.formGroup.get(controlName) as FormControl;
  }
  getValue(controlName: string): string | number {
    return this.getControl(controlName).value;
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

  getFontSizeOptions(): IRangeSlider {
    return {
      name: 'fontSizes',
      placeholder: 'Tamanho',
      css: ['mb-5'],
      valuesList: [
        'fs-10',
        'fs-9',
        'fs-8',
        'fs-sm',
        'fs-7',
        'fs-base',
        'default',
        'fs-6',
        'fs-lg',
        'fs-5',
        'fs-xl',
        'fs-4',
        'fs-3',
        'fs-2',
        'fs-1',
        'fs-2x',
        'fs-2qx',
        'fs-2hx',
        'fs-2tx',
        'fs-3x',
        'fs-3qx',
        'fs-3hx',
        'fs-3tx',
        'fs-4x',
        'fs-4qx',
        'fs-4hx',
        'fs-4tx',
        'fs-5x',
        'fs-5qx',
        'fs-5hx',
        'fs-5tx',
        'fs-6x',
        'fs-6qx',
        'fs-6hx',
        'fs-6tx',
        'fs-7x',
        'fs-7qx',
        'fs-7hx',
        'fs-7tx',
        'fs-fluid',
      ],
    };
  }

  getFontFamilytOptions(): ISelect {
    return {
      name: 'fontFamily',
      cssOption: ['text-dark'],
      placeholder: 'Familia de Fonte',
      css: ['mb-5', 'floating'],
      option: [
        {
          text: 'Roboto Slab',
          value: 'roboto',
        },
        {
          text: 'Droid Serif',
          value: 'droid',
        },
        {
          text: 'Kaushan Script',
          value: 'kaushan',
        },
        {
          text: 'Montserrat',
          value: 'montserrat',
        },
      ],
    };
  }

  getLineHeightOptions(): ISelect {
    return {
      name: 'lineHeights',
      cssOption: ['text-dark'],
      placeholder: 'Altura da Linha',
      css: ['mb-5', 'floating'],
      option: [
        {
          text: 'Extra-Pequeno',
          value: 'lh-1',
        },
        {
          text: 'Pequeno',
          value: 'lh-sm',
        },
        {
          text: 'Padrão',
          value: 'default',
        },
        {
          text: 'Grande',
          value: 'lh-lg',
        },
        {
          text: 'Extra-Grande',
          value: 'lh-xl',
        },
        {
          text: 'Maior',
          value: 'lh-xxl',
        },
      ],
    };
  }

  getSpacingOptions(): ISelect {
    return {
      name: 'spacings',
      cssOption: ['text-dark'],
      placeholder: 'Espaçamento entre Letras',
      css: ['mb-5', 'floating'],
      option: [
        {
          text: 'Padrão',
          value: 'default',
        },
        {
          text: '+1',
          value: 'ls-1',
        },
        {
          text: '+2',
          value: 'ls-2',
        },
        {
          text: '+3',
          value: 'ls-3',
        },
        {
          text: '+4',
          value: 'ls-4',
        },
        {
          text: '-1',
          value: 'ls-n1',
        },
        {
          text: '-2',
          value: 'ls-n2',
        },
        {
          text: '-3',
          value: 'ls-n3',
        },
        {
          text: '-4',
          value: 'ls-n4',
        },
        {
          text: '-5',
          value: 'ls-n5',
        },
      ],
    };
  }

  getItalicOptions(): ISelect {
    return {
      name: 'italic',
      cssOption: ['text-dark'],
      placeholder: 'Itálico|Negrito',
      css: ['mb-5', 'floating'],
      option: [
        {
          text: 'Padrão',
          value: 'default',
        },
        {
          text: 'Negrito',
          value: 'fw-bold',
        },
        {
          text: 'Mais Negrito',
          value: 'fw-bolder',
        },
        {
          text: 'Semi-Negrito',
          value: 'fw-semibold',
        },
        {
          text: 'Fino',
          value: 'fw-light',
        },
        {
          text: 'Mais Fino',
          value: 'fw-lighter',
        },
        {
          text: 'Itálico',
          value: 'fst-italic',
        },
      ],
    };
  }

  getAlignOptions(): ISelect {
    return {
      name: 'align',
      cssOption: ['text-dark'],
      placeholder: 'Alinhamento',
      css: ['mb-5', 'floating'],
      option: [
        {
          text: 'Padrão',
          value: 'default',
        },
        {
          text: 'Esquerda',
          value: 'start',
        },
        {
          text: 'Centro',
          value: 'center',
        },
        {
          text: 'Direita',
          value: 'end',
        },
        {
          text: 'Justificado',
          value: 'justify',
        },
      ],
    };
  }

  getToggle(): IToggle {
    return {
      name: 'screen',
      css: [
        'gap-2',
        'form-check-primary',
        'no-border',
        'form-check-solid-white',
      ],
    };
  }

  getResolutionOptions(): ISelect {
    return {
      name: 'resolution',
      cssOption: ['text-dark'],
      placeholder: 'Ponto de Interrupção',
      css: ['mb-5', 'floating'],
      option: [
        {
          text: 'Em XXL',
          value: 'xxl',
        },
        {
          text: 'XL e acima',
          value: 'xl',
        },
        {
          text: 'MD e acima',
          value: 'md',
        },
        {
          text: 'SM e acima',
          value: 'sm',
        },
        {
          text: 'XS e acima',
          value: 'xs',
        },
      ],
    };
  }

  getUnderline(): IToggle {
    return {
      name: 'underline',
      css: [
        'gap-2',
        'form-check-primary',
        'no-border',
        'form-check-solid-white',
      ],
    };
  }

  getArrayColors(): ISelect {
    return {
      name: 'colors',
      cssOption: ['text-dark'],
      placeholder: '',
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
        {
          text: 'GC',
          value: 'gc',
          color: 'bg-gc',
        },
      ],
    };
  }

  getUnderlineHeight(): IRangeSlider {
    return {
      name: 'underlineHeight',
      placeholder: 'Altura',
      css: ['mb-5'],
      valuesList: [
        'h-1px',
        'h-2px',
        'h-3px',
        'h-4px',
        'h-5px',
        'h-6px',
        'h-7px',
        'h-8px',
        'h-9px',
        'h-10px',
      ],
    };
  }

  getUnderlineDistance(): IRangeSlider {
    return {
      name: 'distance',
      placeholder: 'Distância',
      css: ['mb-5'],
      valuesList: [
        'pb-0',
        'pb-1',
        'pb-2',
        'pb-3',
        'pb-4',
        'pb-5',
        'pb-6',
        'pb-7',
        'pb-8',
        'pb-9',
        'pb-10',
      ],
    };
  }
}
