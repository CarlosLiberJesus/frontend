export interface IAppBreadcrumb {
  title: string;
  items?: IAppBreadcrumbItem[];
}

export interface IAppBreadcrumbItem {
  label: string;
  link?: string;
}
