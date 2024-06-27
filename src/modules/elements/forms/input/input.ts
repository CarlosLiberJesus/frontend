import { IIcon } from '../../base/icon/icon';
import { EPosition, IErrorMessages } from '../../elements';

export enum EInputType {
  TEXT = 'text',
  PASSWORD = 'password',
  EMAIL = 'email',
  RADIO = 'radio',
  CHECKBOX = 'checkbox',
}

export interface IInput {
  type: EInputType;
  name: string;
  autoReturn?: boolean;
  placeholder?: string;
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
  cssInputContainer?: string[];
  cssInput?: string[];
  errors?: IErrorMessages;
  icon?: {
    position: EPosition;
    icon: IIcon;
  };
}
