import { Dayjs } from 'dayjs';
import { EDataState, ETaskCategory, ETaskStatus } from '../../_constants/homeOutline';
import { ICommonPeriod } from '../../../../common/_models/common';

export interface IHomeOutlineParams {
  ignoreDelete: boolean;
}

export interface IHomeOutlineResponse {
  rowIndex: number;
  id: string;
  category: string;
  name: string;
  period: string;
  maxPeriod: string;
  baseDatetime: string;
  lastDoneDatetime: string;
  isDelete: string;
}

export interface IHomeOutline {
  rowIndex: number;
  id: string;
  taskStatus: ETaskStatus;
  category: ETaskCategory;
  name: string;
  period: ICommonPeriod;
  maxPeriod: ICommonPeriod;
  baseDatetime?: Dayjs;
  lastDoneDatetime?: Dayjs;

  isChecked: boolean;
  dataState: EDataState;
}

export interface IHomeOutlineUpdateRequest {
  rowIndex?: number;
  id?: string;
  category: string;
  name: string;
  periodCount: number;
  periodUnit: string;
  maxPeriodCount: number;
  maxPeriodUnit: string;
  lastDoneDatetime?: Dayjs;
  baseDatetime?: Dayjs;
}

export interface IHomeOutlineCheckUpdateRequest {
  rowIndex: number;
  isChecked: boolean;
  nextBaseDatetime?: Dayjs;
}