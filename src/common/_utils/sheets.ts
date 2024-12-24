export function fnConvertTableData<T> (data: string[][]) {
  if (data.length === 0) return undefined;

  const columnNames = data[0];

  return data.filter((_, idx) => idx > 0).map((row, idx) => {
    let rowData = { rowIndex: idx };
    columnNames.forEach((column, colIndex) => {
      rowData = {
        ...rowData,
        [column]: row.find((_, cellColIndex) => colIndex === cellColIndex),
      };
    });

    return rowData;
  }) as T[];
}