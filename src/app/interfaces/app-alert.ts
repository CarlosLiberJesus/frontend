export interface IAppAlert {
  code: number;
  title: string;
  message: string;
  exception?: {
    message: string;
    file?: string;
    line?: number;
    errors?: string[];
  };
  autoClose?: number;
}
