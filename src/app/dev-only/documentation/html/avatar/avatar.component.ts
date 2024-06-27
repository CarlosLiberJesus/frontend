import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { IBadge } from 'src/modules/elements/html/badge/badge';
import { EPosition } from 'src/modules/elements/elements';
import { IRadioList } from 'src/modules/elements/forms/radio/radio';
import { IAvatar } from 'src/modules/elements/base/avatar/avatar';
import { AvatarModel } from './avatar.model';

@Component({
  selector: 'app-bootstrap-documentation-html-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DocumentationAvatarComponent implements OnInit {
  srcCode!: string;
  avatar!: IAvatar;

  typeOptions!: IRadioList;
  labelOptions!: IRadioList;
  styleOptions!: IRadioList;

  constructor(public avatarModel: AvatarModel) {
    this.avatarModel.startForms();
  }

  ngOnInit(): void {
    this.typeOptions = this.avatarModel.getTypeOptions();
    this.labelOptions = this.avatarModel.getLabelOptions();
    this.styleOptions = this.avatarModel.getStylesOptions();
    this.getAvatar();
  }

  getAvatar() {
    const avatar: IAvatar = {};
    if (this.avatarModel.getValue('type') === 'img') {
      avatar.img = 'assets/media/avatars/blank.png';
      //avatar.base64 = "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";
    }
    if (this.avatarModel.getValue('type') === 'text') {
      avatar.label = 'GC';
      switch (this.avatarModel.getValue('label')) {
        case 'one':
          avatar.labelCss = [
            'fs-2',
            'fw-semibold',
            'bg-info',
            'text-inverse-danger',
          ];
          break;
        case 'two':
          avatar.labelCss = [
            'fs-7',
            'fw-semibold',
            'bg-success',
            'text-danger',
          ];
          break;
        case 'three':
          avatar.labelCss = [
            'fs-2tx',
            'fw-semibold',
            'bg-primary',
            'text-warning',
          ];
          break;
      }
    }

    avatar.css = [
      'symbol-' +
        this.avatarModel.getSizeOptions().valuesList[
          +this.avatarModel.getValue('size')
        ],
    ];
    if (this.avatarModel.getValue('ratio')) {
      avatar?.css?.push('symbol-2by3');
    }
    if (this.avatarModel.getValue('styles') !== 'symbol-rounded') {
      avatar?.css?.push(this.avatarModel.getValue('styles'));
    }
    if (this.avatarModel.getValue('badge')) {
      avatar.badge = this.setBadge();
    }
    this.avatar = avatar;
    this.srcCode = '\nIAvatar = ' + JSON.stringify(avatar, null, 2);
  }

  setBadge(): IBadge {
    return {
      text: '+9',
      css: ['badge-light-primary', 'badge-circle'],
      position: this.getPosition(this.avatarModel.getValue('position')),
    };
  }

  getPosition(pos: string): EPosition | undefined {
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

  onChange() {
    this.getAvatar();
  }
}
