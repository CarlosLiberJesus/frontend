import { IIcon } from '../../base/icon/icon';

export interface IAlert {
  title: string;
  text: string;
  icon?: IIcon;
  css?: string[];
  titleCss?: string[];
  titleContainerCss?: string[];
}
