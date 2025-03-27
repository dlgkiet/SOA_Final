export interface IApiResponse<T = {}> {
  success: boolean;
  data: T;
  message: string;
}

export interface IErrorResponse {
  message: string;
}

export interface ILoginData {
  id: number
  name: string | null
  email: string
  birthday: Date
}