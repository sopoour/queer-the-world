export type ApiResponse<T> = {
  data: T;
  error: string | null;
  isLoading?: boolean;
};

export type Options = {
  method: "GET" | "POST" | "PUT" | "DELETE";
  body?: any;
  headers?: Record<string, string>;
};
