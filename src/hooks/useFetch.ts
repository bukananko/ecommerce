const useFetch = async <T>(
  url: string,
  options?: RequestInit
): Promise<ResponseApi<T>> => {
  const API_URL = import.meta.env.VITE_API_URL;

  const data = await fetch(API_URL + url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  }).then((r) => r.json());

  return data;
};

export default useFetch;
