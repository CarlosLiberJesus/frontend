import { IIcon } from '../../base/icon/icon';
import { IErrorMessages } from '../../elements';

export interface IToggle {
  name: string;
  text?: string;
  antiText?: string;
  css?: string[];
  autoReturn?: boolean;
  size?: string[];
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
