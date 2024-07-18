export interface IApiResponse<T> {
  success: boolean;
  code: number;
  url: string;
  message?: string;
  exception?: {
    message: string;
    file?: string;
    line?: number;
    errors?: string[];
  };
  data?: T;
}

export interface IPagination {
  page: number;
  perPage: number;
  total: number;
}
