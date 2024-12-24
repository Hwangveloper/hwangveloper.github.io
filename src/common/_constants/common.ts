export enum ECommonYN {
  Y = 'Y',
  N = 'N',
}

export const commonYNOptions = [
  {
    label: "Y",
    value: ECommonYN.Y,
  },
  {
    label: "N",
    value: ECommonYN.N,
  },
];

export enum ECommonTimeUnit {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

export enum ECommonText {
  ALL = 'ALL',
}

export const DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
export const DATE_FORMAT = 'YYYY-MM-DD';