import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useLimitsData() {
  const { data, error, isLoading } = useSWR("/api/pricing/limits", fetcher);

  return {
    data,
    isLoading,
    error,
  };
}
