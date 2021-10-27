export class ResponseObject<T> {
  success: boolean;
  message: string;
  data: T;

  constructor(response: ResponseObject<T>) {
    this.success = response.success;
    this.message = response.message;
    this.data = response.data;
  }
}
