import { IPopOver } from '../pop-over/pop-over';

export interface IIcon {
  name?: string;
  library: string;
  value: string;
  antiValue?: string;
  css?: string[];
  cssContainer?: string[];
  popOver?: IPopOver;
  imgAlt?: string;
}

export interface IIconFile {
  list:
    | {
        cathegory: string;
        elements: string[];
      }[]
    | undefined;
}
