import { ECommonTimeUnit } from "../_constants/common";
import { ICommonPeriod } from "../_models/common";

export const convertToCommonPeriod = (period?: string) => {
  if (!period) return;

  let unit = ECommonTimeUnit.DAY;
  const regex = /[0-9]*/;
  if (period.includes(ECommonTimeUnit.WEEK)) {
    unit = ECommonTimeUnit.WEEK;
  } else if (period.includes(ECommonTimeUnit.MONTH)) {
    unit = ECommonTimeUnit.MONTH;
  } else if (period.includes(ECommonTimeUnit.YEAR)) {
    unit = ECommonTimeUnit.YEAR;
  }
  const periodCountMatch = period.match(regex);
  let periodCount = 0;
  if (periodCountMatch && periodCountMatch.length >= 1) {
    periodCount = Number(periodCountMatch[0]);
  }
  return {
    unit,
    period: periodCount,
  } as ICommonPeriod;
}

export const convertFromCommonPeriod = (period?: ICommonPeriod) => {
  if (!period) return '';

  let unitStr = ECommonTimeUnit.DAY;
  if (period.unit === ECommonTimeUnit.WEEK) {
    unitStr = ECommonTimeUnit.WEEK;
  } else if (period.unit === ECommonTimeUnit.MONTH) {
    unitStr = ECommonTimeUnit.MONTH;
  } else if (period.unit === ECommonTimeUnit.YEAR) {
    unitStr = ECommonTimeUnit.YEAR;
  }

  return `${period.period}${unitStr}`;
}

export const isEmpty = (value?: any) => {
  if (value === null || value === undefined) return true;

  if (typeof value === "string" && value === '') return true;

  return false;
}