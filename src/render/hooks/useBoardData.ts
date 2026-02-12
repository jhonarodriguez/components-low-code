import { useCallback, useEffect, useState } from "react";
import { DataFetcher } from "../../core/data/interfaces/DataFetcher";
import { FetchParams } from "../../core/data/interfaces/FetchParams";

export function useBoardData(
  fetcher: DataFetcher,
  params: FetchParams
) {
  const [data, setData] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetcher.fetch(params);
      console.log("🚀 ~ useBoardData ~ result:", result)
      setData(result.result);
      setTotalCount(result.totalCount);
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Unknown error'));
    } finally {
      setLoading(false);
    }
  }, [fetcher, params]);
  
  useEffect(() => {
    load();
  }, [load]);
  
  return { data, totalCount, loading, error, reload: load };
}