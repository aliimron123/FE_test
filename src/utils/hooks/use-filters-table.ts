"use client";

import { useCallback, useMemo } from "react";
import { useQueryState } from "nuqs";
import { searchParams } from "../lib/searchparams";

export function useFilterTable() {
  const [searchQuery, setSearchQuery] = useQueryState(
    "q",
    searchParams.q.withOptions({ shallow: false, throttleMs: 500 }).withDefault("")
  );

  const [categoriesFilter, setCategoriesFilter] = useQueryState(
    "categories",
    searchParams.categories.withOptions({ shallow: false }).withDefault("")
  );

  const [page, setPage] = useQueryState("page", searchParams.page.withDefault(1));

  const [selectedId, setSelectedId] = useQueryState(
    "Id",
    searchParams.id.withOptions({ shallow: true })
  );

  const [cabangId, setCabangId] = useQueryState(
    "cabangID",
    searchParams.cabangId.withOptions({ shallow: true })
  );

  const [date, setDate] = useQueryState("date", searchParams.date.withOptions({ shallow: true }));
  const resetFilters = useCallback(() => {
    setSearchQuery(null);
    setCategoriesFilter(null);
    setPage(1);
    setSelectedId(null);
    setCabangId(null);
    setDate(null);
  }, [setSearchQuery, setCategoriesFilter, setPage, setSelectedId, setCabangId, setDate]);

  const isAnyFilterActive = useMemo(() => {
    return !!searchQuery || !!categoriesFilter;
  }, [searchQuery, categoriesFilter]);

  return {
    searchQuery,
    setSearchQuery,
    page,
    setPage,
    resetFilters,
    isAnyFilterActive,
    categoriesFilter,
    setCategoriesFilter,
    selectedId,
    setSelectedId,
    cabangId,
    setCabangId,
    date,
    setDate,
  };
}
