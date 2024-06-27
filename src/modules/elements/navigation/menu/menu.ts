import { IIcon } from '../../base/icon/icon';
import { EEvent } from '../../elements';
import { IBadge } from '../../html/badge/badge';
import { IButton } from '../../html/button/button';

export interface IMenu {
  name: string;
  items: IMenuItem[];
  cssMenuClass?: string[];
  autoReturn?: boolean;
}

export interface IMenuItem {
  title?: string;
  slug?: string;
  fragment?: string;
  cssMenuItemClass?: string[];
  cssMenuItemLinkClass?: string[];
  cssMenuItemTitleClass?: string[];
  event?: EEvent;
  opened?: boolean;
  items?: IMenuItem[];
  iconFirst?: IIcon;
  iconLast?: IIcon;
  badge?: IBadge;
  button?: IButton;
  cssSubMenuClass?: string[];
}

export interface IMenuClickEvent {
  menu: number;
  subMenu?: number;
  subSubMenu?: number;
}
