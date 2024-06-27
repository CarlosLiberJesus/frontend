import { FormControl } from '@angular/forms';
import { IIcon } from '../../base/icon/icon';
import { IInput } from '../input/input';
import { IErrorMessages } from '../../elements';

export interface IMultiSelect {
  name: string;
  placeholder: string;
  uncheck?: boolean;
  autoReturn?: boolean;
  css?: string[];
  option: IMultiSelectOption[];
  cssOption?: string[];
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

export interface IMultiSelectOption {
  value: string;
  text: string;
  cssLabel?: string[];
  cssInput?: string[];
}
