import { ScrollArea, Skeleton } from "@mantine/core";

export function DataTableSkeleton({
  columnCount = 1,
  rowCount = 10,
  searchableColumnCount = 0,
  filterableColumnCount = 0,
  showViewOptions = false,
}) {
  return (
    <div className="flex flex-1 flex-col space-y-3 overflow-auto">
      {searchableColumnCount > 0 || filterableColumnCount > 0 ? (
        <div className="flex w-full items-center justify-between space-x-2 overflow-auto p-1">
          <div className="flex flex-1 items-center space-y-4 space-x-2">
            {searchableColumnCount > 0
              ? Array.from({ length: searchableColumnCount }).map((_, i) => (
                  <Skeleton key={i} height={20} />
                ))
              : null}
            {filterableColumnCount > 0
              ? Array.from({ length: filterableColumnCount }).map((_, i) => (
                  <Skeleton key={i} height={10} />
                ))
              : null}
          </div>
          {showViewOptions ? <Skeleton height={50} /> : null}
        </div>
      ) : null}

      <div className="relative">
        <div className="h-full overflow-auto rounded-md border border-gray-300">
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                {Array.from({ length: columnCount }).map((_, j) => (
                  <th key={j} style={{ width: 120, padding: "8px" }}>
                    <Skeleton height={40} width="100%" />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: rowCount }).map((_, i) => (
                <tr key={i}>
                  {Array.from({ length: columnCount }).map((_, j) => (
                    <td key={j} style={{ width: 120, padding: "8px" }}>
                      <Skeleton height={40} width="100%" />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-end gap-4 overflow-auto px-2 py-1 pb-10 sm:flex-row sm:gap-8">
        <Skeleton height={40} width={80} /> <Skeleton height={40} width={120} />
      </div>
    </div>
  );
}
