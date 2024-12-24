import { ECommonTimeUnit } from "../_constants/common";

export interface ICommonPeriod {
  unit: ECommonTimeUnit;
  period: number;
}

export interface ICommonOption {
  label: string;
  value: string;
}