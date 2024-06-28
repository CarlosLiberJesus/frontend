import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
} from '@angular/core';
import { AnimationsModel } from './animations.model';
import { IButton } from 'src/modules/elements/html/button/button';

@Component({
  selector: 'app-bootstrap-documentation-intro-animations',
  templateUrl: './animations.component.html',
  styleUrls: ['./animations.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationAnimationsComponent {
  srcCode!: string;
  clear = false;

  constructor(
    public animationsModel: AnimationsModel,
    private cdr: ChangeDetectorRef
  ) {
    this.animationsModel.startForms();
  }

  getCss(): string {
    let classes = '';

    if (this.animationsModel.getValue('animationControl')) {
      classes +=
        'animate__animated animate__' +
        this.animationsModel.getValue('animationControl');
      classes +=
        ' animate__' +
        this.animationsModel.getSpeedOptions().valuesList[
          +this.animationsModel.getValue('speed')
        ];

      if (this.animationsModel.getValue('delay') !== 0) {
        classes +=
          ' animate__delay-' +
          this.animationsModel.getDelayOptions().valuesList[
            +this.animationsModel.getValue('delay')
          ];
      }
      if (this.animationsModel.getValue('repetitions') !== 0) {
        if (this.animationsModel.getValue('repetitions') === 3) {
          classes += ' animate__infinite';
        } else {
          classes +=
            ' animate__repeat-' +
            this.animationsModel.getRepetitionsOptions().valuesList[
              +this.animationsModel.getValue('repetitions')
            ];
        }
      }
    }

    if (this.clear) {
      classes = '';
    }

    this.srcCode =
      '\n<span class="' +
      classes +
      '">' +
      this.animationsModel.getValue('text') +
      '</span>';
    return classes;
  }

  onChanged() {
    this.clear = false;
    this.getCss();
  }

  getCloseIcon(): IButton {
    return {
      css: [
        'p-1',
        'border-3 border rounded-circle',
        'position-absolute',
        'top-0 start-100',
        'bg-gray-500',
        'bg-hover-gray-500',
      ],
      iconFirst: {
        library: 'bi',
        value: 'bi-x',
        css: ['fs-2', 'text-white', 'text-hover-primary'],
      },
    };
  }

  close(): void {
    this.clear = true;
    this.getCss();
  }
}
