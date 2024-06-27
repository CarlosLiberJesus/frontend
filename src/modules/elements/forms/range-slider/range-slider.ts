import { IIcon } from '../../base/icon/icon';

export interface IRangeSlider {
  name: string;
  placeholder?: string;
  autoReturn?: boolean;
  css?: string[];
  cssContainer?: string[];
  cssPlaceholder?: string[];
  cssValue?: string[];
  valuesList: string[];
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
}
