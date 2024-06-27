import { FormGroup, FormControl } from '@angular/forms';
import { EInputType, IInput } from 'src/modules/elements/forms/input/input';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';
import { IRangeSlider } from 'src/modules/elements/forms/range-slider/range-slider';

export class AnimationsModel {
  formGroup!: FormGroup;

  startForms(): void {
    this.formGroup = new FormGroup({
      text: new FormControl('Imagine o Texto', []),
      animationControl: new FormControl(null, []),
      speed: new FormControl(0, []),
      delay: new FormControl(0, []),
      repetitions: new FormControl(0, []),
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

  getAnimationOptions(): {
    name: string;
    control: FormControl;
    options: IRadioList;
  }[] {
    return [
      {
        name: 'Buscadores de Atenção',
        control: this.getControl('animationControl') as FormControl,
        options: {
          name: 'attention-seekers',
          css: [
            'form-check-primary',
            'form-check-white',
            'form-check-default',
            'form-check-inline',
            'mb-2',
            'gap-2',
          ],
          radio: [
            { text: 'bounce', value: 'bounce' },
            { text: 'flash', value: 'flash' },
            { text: 'pulse', value: 'pulse' },
            { text: 'rubberBand', value: 'rubberBand' },
            { text: 'shakeX', value: 'shakeX' },
            { text: 'shakeY', value: 'shakeY' },
            { text: 'headShake', value: 'headShake' },
            { text: 'swing', value: 'swing' },
            { text: 'tada', value: 'tada' },
            { text: 'wobble', value: 'wobble' },
            { text: 'jello', value: 'jello' },
            { text: 'heartBeat', value: 'heartBeat' },
          ],
        },
      },
      {
        name: 'Flipadores',
        control: this.getControl('animationControl') as FormControl,
        options: {
          name: 'flippers',
          css: [
            'form-check-primary',
            'form-check-white',
            'form-check-default',
            'form-check-inline',
            'mb-2',
            'gap-2',
          ],
          radio: [
            { text: 'flip', value: 'flip' },
            { text: 'flipInX', value: 'flipInX' },
            { text: 'flipInY', value: 'flipInY' },
            { text: 'flipOutX', value: 'flipOutX' },
            { text: 'flipOutY', value: 'flipOutY' },
          ],
        },
      },
      {
        name: 'Velocidade da Luz',
        control: this.getControl('animationControl') as FormControl,
        options: {
          name: 'lightspeed',
          css: [
            'form-check-primary',
            'form-check-white',
            'form-check-default',
            'form-check-inline',
            'mb-2',
            'gap-2',
          ],
          radio: [
            { text: 'lightSpeedInRight', value: 'lightSpeedInRight' },
            { text: 'lightSpeedInLeft', value: 'lightSpeedInLeft' },
            { text: 'lightSpeedOutRight', value: 'lightSpeedOutRight' },
            { text: 'lightSpeedOutLeft', value: 'lightSpeedOutLeft' },
          ],
        },
      },
      {
        name: 'Especiais',
        control: this.getControl('animationControl') as FormControl,
        options: {
          name: 'specials',
          css: [
            'form-check-primary',
            'form-check-white',
            'form-check-default',
            'form-check-inline',
            'mb-2',
            'gap-2',
          ],
          radio: [
            { text: 'hinge', value: 'hinge' },
            { text: 'jackInTheBox', value: 'jackInTheBox' },
            { text: 'rollIn', value: 'rollIn' },
            { text: 'rollOut', value: 'rollOut' },
          ],
        },
      },
      {
        name: 'Entradas de Fundo',
        control: this.getControl('animationControl') as FormControl,
        options: {
          name: 'back-entrances',
          css: [
            'form-check-primary',
            'form-check-white',
            'form-check-default',
            'form-check-inline',
            'mb-2',
            'gap-2',
          ],
          radio: [
            { text: 'backInDown', value: 'backInDown' },
            { text: 'backInLeft', value: 'backInLeft' },
            { text: 'backInRight', value: 'backInRight' },
            { text: 'backInUp', value: 'backInUp' },
          ],
        },
      },
      {
        name: 'Saídas de Fundo',
        control: this.getControl('animationControl') as FormControl,
        options: {
          name: 'back-exits',
          css: [
            'form-check-primary',
            'form-check-white',
            'form-check-default',
            'form-check-inline',
            'mb-2',
            'gap-2',
          ],
          radio: [
            { text: 'backOutDown', value: 'backOutDown' },
            { text: 'backOutLeft', value: 'backOutLeft' },
            { text: 'backOutRight', value: 'backOutRight' },
            { text: 'backOutUp', value: 'backOutUp' },
          ],
        },
      },
      {
        name: 'Entradas Saltitantes',
        control: this.getControl('animationControl') as FormControl,
        options: {
          name: 'bouncing-entrances',
          css: [
            'form-check-primary',
            'form-check-white',
            'form-check-default',
            'form-check-inline',
            'mb-2',
            'gap-2',
          ],
          radio: [
            { text: 'bounceIn', value: 'bounceIn' },
            { text: 'bounceInDown', value: 'bounceInDown' },
            { text: 'bounceInLeft', value: 'bounceInLeft' },
            { text: 'bounceInRight', value: 'bounceInRight' },
            { text: 'bounceInUp', value: 'bounceInUp' },
          ],
        },
      },
      {
        name: 'Saídas Saltitantes',
        control: this.getControl('animationControl') as FormControl,
        options: {
          name: 'bouncing-exits',
          css: [
            'form-check-primary',
            'form-check-white',
            'form-check-default',
            'form-check-inline',
            'mb-2',
            'gap-2',
          ],
          radio: [
            { text: 'bounceOut', value: 'bounceOut' },
            { text: 'bounceOutDown', value: 'bounceOutDown' },
            { text: 'bounceOutLeft', value: 'bounceOutLeft' },
            { text: 'bounceOutRight', value: 'bounceOutRight' },
            { text: 'bounceOutUp', value: 'bounceOutUp' },
          ],
        },
      },
      {
        name: 'Entradas Desvanecendo',
        control: this.getControl('animationControl') as FormControl,
        options: {
          name: 'fading-entrances',
          css: [
            'form-check-primary',
            'form-check-white',
            'form-check-default',
            'form-check-inline',
            'mb-2',
            'gap-2',
          ],
          radio: [
            { text: 'fadeIn', value: 'fadeIn' },
            { text: 'fadeInDown', value: 'fadeInDown' },
            { text: 'fadeInDownBig', value: 'fadeInDownBig' },
            { text: 'fadeInLeft', value: 'fadeInLeft' },
            { text: 'fadeInLeftBig', value: 'fadeInLeftBig' },
            { text: 'fadeInRight', value: 'fadeInRight' },
            { text: 'fadeInRightBig', value: 'fadeInRightBig' },
            { text: 'fadeInUp', value: 'fadeInUp' },
            { text: 'fadeInUpBig', value: 'fadeInUpBig' },
            { text: 'fadeInTopLeft', value: 'fadeInTopLeft' },
            { text: 'fadeInTopRight', value: 'fadeInTopRight' },
            { text: 'fadeInBottomLeft', value: 'fadeInBottomLeft' },
            { text: 'fadeInBottomRight', value: 'fadeInBottomRight' },
          ],
        },
      },
      {
        name: 'Saídas Desvanecendo',
        control: this.getControl('animationControl') as FormControl,
        options: {
          name: 'fading-exits',
          css: [
            'form-check-primary',
            'form-check-white',
            'form-check-default',
            'form-check-inline',
            'mb-2',
            'gap-2',
          ],
          radio: [
            { text: 'fadeOut', value: 'fadeOut' },
            { text: 'fadeOutDown', value: 'fadeOutDown' },
            { text: 'fadeOutDownBig', value: 'fadeOutDownBig' },
            { text: 'fadeOutLeft', value: 'fadeOutLeft' },
            { text: 'fadeOutLeftBig', value: 'fadeOutLeftBig' },
            { text: 'fadeOutRight', value: 'fadeOutRight' },
            { text: 'fadeOutRightBig', value: 'fadeOutRightBig' },
            { text: 'fadeOutUp', value: 'fadeOutUp' },
            { text: 'fadeOutUpBig', value: 'fadeOutUpBig' },
            { text: 'fadeOutTopLeft', value: 'fadeOutTopLeft' },
            { text: 'fadeOutTopRight', value: 'fadeOutTopRight' },
            { text: 'fadeOutBottomRight', value: 'fadeOutBottomRight' },
            { text: 'fadeOutBottomLeft', value: 'fadeOutBottomLeft' },
          ],
        },
      },
      {
        name: 'Entradas Rotativas',
        control: this.getControl('animationControl') as FormControl,
        options: {
          name: 'rotating-entrances',
          css: [
            'form-check-primary',
            'form-check-white',
            'form-check-default',
            'form-check-inline',
            'mb-2',
            'gap-2',
          ],
          radio: [
            { text: 'rotateIn', value: 'rotateIn' },
            { text: 'rotateInDownLeft', value: 'rotateInDownLeft' },
            { text: 'rotateInDownRight', value: 'rotateInDownRight' },
            { text: 'rotateInUpLeft', value: 'rotateInUpLeft' },
            { text: 'rotateInUpRight', value: 'rotateInUpRight' },
          ],
        },
      },
      {
        name: 'Saídas Rotativas',
        control: this.getControl('animationControl') as FormControl,
        options: {
          name: 'rotating-exits',
          css: [
            'form-check-primary',
            'form-check-white',
            'form-check-default',
            'form-check-inline',
            'mb-2',
            'gap-2',
          ],
          radio: [
            { text: 'rotateOut', value: 'rotateOut' },
            { text: 'rotateOutDownLeft', value: 'rotateOutDownLeft' },
            { text: 'rotateOutDownRight', value: 'rotateOutDownRight' },
            { text: 'rotateOutUpLeft', value: 'rotateOutUpLeft' },
            { text: 'rotateOutUpRight', value: 'rotateOutUpRight' },
          ],
        },
      },
      {
        name: 'Entradas com Zoom',
        control: this.getControl('animationControl') as FormControl,
        options: {
          name: 'zooming-entrances',
          css: [
            'form-check-primary',
            'form-check-white',
            'form-check-default',
            'form-check-inline',
            'mb-2',
            'gap-2',
          ],
          radio: [
            { text: 'zoomIn', value: 'zoomIn' },
            { text: 'zoomInDown', value: 'zoomInDown' },
            { text: 'zoomInLeft', value: 'zoomInLeft' },
            { text: 'zoomInRight', value: 'zoomInRight' },
            { text: 'zoomInUp', value: 'zoomInUp' },
          ],
        },
      },
      {
        name: 'Saídas com Zoom',
        control: this.getControl('animationControl') as FormControl,
        options: {
          name: 'zooming-exits',
          css: [
            'form-check-primary',
            'form-check-white',
            'form-check-default',
            'form-check-inline',
            'mb-2',
            'gap-2',
          ],
          radio: [
            { text: 'zoomOut', value: 'zoomOut' },
            { text: 'zoomOutDown', value: 'zoomOutDown' },
            { text: 'zoomOutLeft', value: 'zoomOutLeft' },
            { text: 'zoomOutRight', value: 'zoomOutRight' },
            { text: 'zoomOutUp', value: 'zoomOutUp' },
          ],
        },
      },
      {
        name: 'Entradas Deslizantes',
        control: this.getControl('animationControl') as FormControl,
        options: {
          name: 'sliding-entrances',
          css: [
            'form-check-primary',
            'form-check-white',
            'form-check-default',
            'form-check-inline',
            'mb-2',
            'gap-2',
          ],
          radio: [
            { text: 'slideInDown', value: 'slideInDown' },
            { text: 'slideInLeft', value: 'slideInLeft' },
            { text: 'slideInRight', value: 'slideInRight' },
            { text: 'slideInUp', value: 'slideInUp' },
          ],
        },
      },
      {
        name: 'Saídas Deslizantes',
        control: this.getControl('animationControl') as FormControl,
        options: {
          name: 'sliding-exits',
          css: [
            'form-check-primary',
            'form-check-white',
            'form-check-default',
            'form-check-inline',
            'mb-2',
            'gap-2',
          ],
          radio: [
            { text: 'slideOutDown', value: 'slideOutDown' },
            { text: 'slideOutLeft', value: 'slideOutLeft' },
            { text: 'slideOutRight', value: 'slideOutRight' },
            { text: 'slideOutUp', value: 'slideOutUp' },
          ],
        },
      },
    ];
  }

  getSpeedOptions(): IRangeSlider {
    return {
      name: 'speed',
      placeholder: 'Velocidade',
      css: ['mb-5'],
      valuesList: ['faster', 'fast', 'normal', 'slow', 'slower'],
    };
  }

  getDelayOptions(): IRangeSlider {
    return {
      name: 'delay',
      placeholder: 'Atraso',
      css: ['mb-5'],
      valuesList: ['0s', '1s', '2s', '3s', '4s', '5s'],
    };
  }

  getRepetitionsOptions(): IRangeSlider {
    return {
      name: 'repetitions',
      placeholder: 'Repetições',
      css: ['mb-5'],
      valuesList: ['1', '2', '3', 'infinite'],
    };
  }
}
