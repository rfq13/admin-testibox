import QueryUrl, { QueryUrlOptions } from "./QueryUrl";
import { useMemo, useRef, useState } from "react";
import queryString from "query-string";

export type UseUrlQueryOptions = {} & QueryUrlOptions;

function useUrlQuery(_options?: UseUrlQueryOptions) {
  const { ...queryUrlOptions } = { ..._options };

  const refQueryUrl = useRef(new QueryUrl(queryUrlOptions));
  const queryUrl = refQueryUrl.current;
  const [filtered, setFiltered] = useState(
    queryUrl.filtered.toArrayStringify()
  );
  const [sorted, setSorted] = useState(queryUrl.sorted.toArrayStringify());
  const [localQuery, setLocalQuery] = useState(queryUrl.query.get());

  const strLocalQuery = JSON.stringify(localQuery);

  const getStringQuery = useMemo(() => {
    return function getStringQuery(url?: string) {
      const strQuery = queryString.stringify({
        filtered,
        sorted,
        ...localQuery,
      });

      if (!url) {
        return strQuery;
      }
      return [url, strQuery].join("");
    };
  }, [filtered, sorted, strLocalQuery]);

  const extraSetter = useMemo(() => {
    return {
      transformUrl(keys: string) {
        return getStringQuery(keys);
      },
      transformKey(keys: string | any[]) {
        if (Array.isArray(keys)) {
          return [...keys, getStringQuery()];
        }
        return [keys, getStringQuery()];
      },
      setFiltered(id: string, val: any) {
        queryUrl.filtered.setQuery(id, val);
        setFiltered(queryUrl.filtered.toArrayStringify());
      },
      setSorted(id: string, val: any) {
        queryUrl.sorted.setQuery(id, val);
        setSorted(queryUrl.sorted.toArrayStringify());
      },
      setQuery(id: string, val: any) {
        queryUrl.query.setQuery(id, val);
        setLocalQuery(queryUrl.query.get());
      },
      getQueryById(id: string) {
        return queryUrl.query.find(id);
      },
      getFilteredById(id: string) {
        return queryUrl.filtered.find(id);
      },
      getSortedById(id: string) {
        return queryUrl.sorted.find(id);
      },
    };
  }, [filtered, sorted, strLocalQuery]);

  return {
    ...extraSetter,
  };
}
export default useUrlQuery;
