export interface GateResponse {
  status: boolean;
  message: string;
  code: number;
  data: ResponseData;
}

export interface ResponseData {
  total_pages: number;
  current_page: number;
  count: number;
  rows: RowsData;
}

export interface RowsData {
  count: number;
  rows: GateRow[];
}

export interface GateRow {
  id: number;
  IdCabang: number;
  NamaGerbang: string;
  NamaCabang: string;
}
