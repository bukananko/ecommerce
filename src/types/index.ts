export type ResponseApi<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type User = {
  id: string;
  username: string;
  picture: string | null;
  createdAt: Date;
  updatedAt: Date;
};
