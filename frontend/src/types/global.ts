export interface IApiResponse<T = {}> {
  success: boolean;
  data: T;
  message: string;
}

export interface IErrorResponse {
  message: string;
}
