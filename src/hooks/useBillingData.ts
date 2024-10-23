import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function useBillingData() {
  const { data, error, isLoading } = useSWR("/api/pricing/billing", fetcher);

  return {
    data,
    isLoading,
    error,
  };
}
