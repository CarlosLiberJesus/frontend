import { FormControl } from '@angular/forms';
import { IIcon } from '../../base/icon/icon';
import { IInput } from '../input/input';
import { IErrorMessages } from '../../elements';
import { IAvatar } from '../../base/avatar/avatar';

export interface ISelect {
  name: string;
  placeholder?: string;
  autoReturn?: boolean;
  css?: string[];
  option: IOption[];
  cssOption?: string[];
  cssPane?: string[];
  iconToggle?: IIcon;
  iconChecked?: IIcon;
  search?: {
    control: FormControl;
    input: IInput;
    css?: string[];
  };
  label?: {
    text: string;
    css?: string[];
    extra?: string;
    cssExtra?: string[];
    icon?: IIcon;
  };
  message?: {
    text: string;
    css?: string[];
  };
  errors?: IErrorMessages;
}

export interface IOption {
  value: string;
  text: string;
  color?: string;
  icon?: IIcon;
  avatar?: IAvatar;
  css?: string[];
}
