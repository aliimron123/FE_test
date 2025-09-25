export type TrafficTransactionType = {
  id: number;
  IdCabang: number;
  IdGerbang: number;
  Tanggal: string; // ISO date string
  Shift: number;
  IdGardu: number;
  Golongan: number;
  IdAsalGerbang: number;
  Tunai: number;
  DinasOpr: number;
  DinasMitra: number;
  DinasKary: number;
  eMandiri: number;
  eBri: number;
  eBni: number;
  eBca: number;
  eNobu: number;
  eDKI: number;
  eMega: number;
  eFlo: number;
};

export interface TrafficResponse {
  status: boolean;
  message: string;
  code: number;
  data: TrafficData;
}

export interface TrafficData {
  total_pages: number;
  current_page: number;
  count: number;
  rows: RowsData;
}

export interface RowsData {
  count: number;
  rows: TrafficRow[];
}

export interface TrafficRow {
  id: number;
  IdCabang: number;
  IdGerbang: number;
  Tanggal: string;
  Shift: number;
  IdGardu: number;
  Golongan: number;
  IdAsalGerbang: number;
  Tunai: number;
  DinasOpr: number;
  DinasMitra: number;
  DinasKary: number;
  eMandiri: number;
  eBri: number;
  eBni: number;
  eBca: number;
  eNobu: number;
  eDKI: number;
  eMega: number;
  eFlo: number;
}
