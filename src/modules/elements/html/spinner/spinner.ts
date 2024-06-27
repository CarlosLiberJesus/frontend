import { IIcon } from '../../base/icon/icon';

export interface ISpinner {
  name?: string;
  cssContainer?: string[];
  style?: {
    css: string[];
  };
  placeholder?: {
    text: string;
    css?: string[];
  };
  animation?: {
    text?: string;
    icon?: IIcon;
    css?: string[];
  };
}
