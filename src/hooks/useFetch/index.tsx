import { useEffect, useState } from "react";

interface FetchOptions extends RequestInit {
  refreshInterval?: number;
}
export function useFetch(url: string, options: FetchOptions) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchFn = async () => {
      try {
        const response = await fetch(url, options);
        const json = await response.json();
        setData(json);
        setIsLoading(false);
      } catch (error) {
        setError(true);
        setIsLoading(false);
      }
    };
    if(options.refreshInterval) {
      // const intervalId = setInterval(fetchFn, options.refreshInterval);
      // return () => clearInterval(intervalId);
      const interval_fetchFn = () => {
        fetchFn();
        setTimeout(interval_fetchFn, options.refreshInterval);
      };
      interval_fetchFn();
    } else {
      fetchFn();
    }
  }, [url, options]);

  return { data, isLoading, error };
}


