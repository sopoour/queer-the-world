import { useState } from 'react';
import { ApiResponse, Options } from './types';

type UseLazyFetchOptions = {
  body?: any;
};

type UseLazyFetchResult<T> = {
  fetchData: (opts?: UseLazyFetchOptions) => Promise<void>;
} & ApiResponse<T>;

async function fetcher<T>(
  url: string,
  options: Options = { method: 'GET' },
  opts?: UseLazyFetchOptions
): Promise<T> {
  try {
    const response = await fetch(url, {
      method: options.method,
      headers: {
        ...(options.headers ?? {}),
        'Content-Type': 'application/json',
      },
      body: opts?.body
        ? JSON.stringify(opts.body)
        : options.body
        ? JSON.stringify(options.body)
        : undefined,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    throw new Error(error.message);
  }
}

function useFetch<T>(url: string, options: Options = { method: 'GET' }): UseLazyFetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchData = async (opts?: UseLazyFetchOptions) => {
    setIsLoading(true);
    try {
      const responseData = await fetcher<T>(url, options, opts);
      setData(responseData);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    fetchData,
    data,
    error,
    isLoading,
  };
}

export { useFetch, fetcher };
