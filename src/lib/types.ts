export type ServerResponse<T = null> = {
  isError: boolean;
  message: string;
  data: T;
};
