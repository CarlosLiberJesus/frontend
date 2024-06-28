import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ButtonModel } from './button.model';
import { IButton } from 'src/modules/elements/html/button/button';
import { EPosition } from 'src/modules/elements/elements';
import { IIcon } from 'src/modules/elements/base/icon/icon';
import { IBadge } from 'src/modules/elements/html/badge/badge';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';
import { ICheckBoxList } from 'src/modules/elements/forms/check-box/check-box';

@Component({
  selector: 'app-bootstrap-documentation-html-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationButtonComponent implements OnInit {
  button!: IButton;
  srcCode!: string;

  effectOptions!: IRadioList;
  hoverEffectOptions!: IRadioList;
  extraOptions!: ICheckBoxList;

  constructor(public buttonModel: ButtonModel) {
    this.buttonModel.startForms();
  }

  ngOnInit(): void {
    this.effectOptions = this.buttonModel.getEffectsOption();
    this.hoverEffectOptions = this.buttonModel.getHoverEffectsOption();
    this.extraOptions = this.buttonModel.getExtrasOptions();
    this.createButton();
  }

  createButton() {
    const bgColor = this.getBackgroundColor();
    const textColor = this.getTextColor();
    const border = this.getBorder();

    const button: IButton = {
      text: this.buttonModel.getValue('text') ?? '',
      css: [
        bgColor !== '' ? bgColor : '',
        textColor !== '' ? textColor : '',
        this.buttonModel.getValue('effects') ?? '',
        border,
      ].filter(Boolean),
    };

    if (this.buttonModel.getValue('extras')) {
      const icons: string[] = this.buttonModel.getFormArrayValue('extras');
      icons.forEach((position: string) => {
        if (position === 'start') {
          button.iconFirst = this.setIcon();
          button.css?.push('d-flex');
        }
        if (position === 'end') {
          button.iconLast = this.setIcon();
          button.css?.push('d-flex');
        }
        if (position === 'badge') {
          button.css?.push('position-relative');
          button.badge = this.setBadge();
        }
        if (position === 'rotate') {
          if (button.iconFirst) {
            button.iconFirst.cssContainer = ['rotate'];
            button.iconFirst?.css?.push('rotate-360');
          }
          if (button.iconLast) {
            button.iconLast.cssContainer = ['rotate'];
            button.iconLast?.css?.push('rotate-360');
          }
        }
        if (position === 'spinner') {
          button.css?.push('d-flex');
          button.spinner = {
            name: 'spinner',
            style: {
              css: ['me-1', 'text-info', 'spinner-border', 'h-20px w-20px'],
            },
          };
        }
      });
    }

    this.srcCode = '\nIButton = ' + JSON.stringify(button, null, 2);
    this.button = button;
  }

  getBackgroundColor() {
    let bgColor = '';
    if (this.buttonModel.getValue('colorBackground')) {
      bgColor += 'btn-';
      if (
        this.buttonModel.getFormArrayValue('extras').includes('active') &&
        this.buttonModel.getValue('hoverEffects') === 'background'
      ) {
        bgColor += 'active-';
      }
      if (this.buttonModel.getValue('colorLight')) {
        bgColor += 'light-';
      }
      bgColor += this.buttonModel.getValue('colorBackground');
    }
    return bgColor;
  }

  getTextColor() {
    let textColor = '';
    if (this.buttonModel.getValue('colorText')) {
      textColor = 'btn-';
      if (
        this.buttonModel.getFormArrayValue('extras').includes('active') &&
        this.buttonModel.getValue('hoverEffects') === 'text'
      ) {
        textColor += 'active-';
      }
      textColor += 'color-' + this.buttonModel.getValue('colorText');
    }
    return textColor;
  }

  setBadge(): IBadge {
    return {
      text: '+9',
      css: ['badge-light-primary', 'badge-circle'],
      position: this.getPosition(this.buttonModel.getValue('badge')),
    };
  }

  setIcon(): IIcon {
    return {
      library: 'fa-regular',
      value: 'fa-face-grin-tears',
      css: [
        this.buttonModel.getValue('colorText')
          ? 'text-' + this.buttonModel.getValue('colorText')
          : '',
        'fs-1',
        'me-2',
      ].filter(Boolean),
    };
  }

  getBorder() {
    let border = '';
    if (this.buttonModel.getValue('border') === 'dashed') {
      border = 'btn-outline btn-outline-dashed';
      if (this.buttonModel.getValue('colorBackground')) {
        border +=
          ' btn-outline-' + this.buttonModel.getValue('colorBackground');
      }
    } else if (this.buttonModel.getValue('border') === 'solid') {
      border = 'btn-outline';
      if (this.buttonModel.getValue('colorBackground') !== 'null') {
        border +=
          ' btn-outline-' + this.buttonModel.getValue('colorBackground');
      }
    }
    return border;
  }

  getPosition(pos: string): EPosition | undefined {
    if (pos === 'inside') {
      return EPosition.INSIDE;
    }
    if (pos === 'topLeft') {
      return EPosition.TOPLEFT;
    }
    if (pos === 'topRight') {
      return EPosition.TOPRIGHT;
    }
    if (pos === 'bottomLeft') {
      return EPosition.BOTTOMLEFT;
    }
    if (pos === 'bottomRight') {
      return EPosition.BOTTOMRIGHT;
    }
    return undefined;
  }

  onChanged() {
    this.extraOptions = this.buttonModel.getExtrasOptions();
    this.createButton();
  }
}
