export interface IUpdateResponse {
  spreadsheetId: string;
  updatedRange: string;
  updatedRows: number;
  updatedColumns: number;
  updatedCells: number;
}

export interface IUpdateListResponse {
  spreadsheetId: string;
  totalUpdatedRows: number;
  totalUpdatedColumns: number;
  totalUpdatedCells: number;
  totalUpdatedSheets: number;
  responses: IUpdateResponse[];
}