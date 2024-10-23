import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export function useUsageData() {
  const { data, error, isLoading } = useSWR('/api/pricing/usage', fetcher)

  return {
    data,
    isLoading,
    error
  }
}