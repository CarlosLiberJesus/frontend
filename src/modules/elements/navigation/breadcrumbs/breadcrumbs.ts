export interface IBreadcrumbs {
  name: string;
  items: IBreadcrumb[];
  css?: string[];
}

export interface IBreadcrumb {
  title: string; // TEXTO A APARECER
  slug?: string; // Links
  fragment?: string; // #links
  cssItem?: string[];
  cssLink?: string[];
}
