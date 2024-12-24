import { ECommonTimeUnit } from "../../../common/_constants/common";

export enum ETaskCategory {
  NORMAL = 'NORMAL',
  GAME = 'GAME',
  PROJECT = 'PROJECT',
}

export enum ETaskStatus {
  TODO = 'TODO',
  DONOT = 'DONOT',
  DONE = 'DONE',
}

export enum EDataState {
  NONE = 'NONE',
  CREATED = 'CREATED',
  UPDATED = 'UPDATED',
  DELETED = 'DELETED',
}

export enum IHomeOutlineUpdateRequestFields {
  rowIndex = 'rowIndex',
  id = 'id',
  category = 'category',
  name = 'name',
  periodCount = 'periodCount',
  periodUnit = 'periodUnit',
  maxPeriodCount = 'maxPeriodCount',
  maxPeriodUnit = 'maxPeriodUnit',
  repeat = 'repeat',
}

export const taskCategoryOptions = [
  {
    label: "일반",
    value: ETaskCategory.NORMAL,
    color: "primary.main",
  },
  {
    label: "게임",
    value: ETaskCategory.GAME,
    color: "secondary.main",
  },
  {
    label: "프로젝트",
    value: ETaskCategory.PROJECT,
    color: "success.main",
  },
];

export const timeUnitOptions = [
  {
    label: "일",
    value: ECommonTimeUnit.DAY,
  },
  {
    label: "주",
    value: ECommonTimeUnit.WEEK,
  },
  {
    label: "개월",
    value: ECommonTimeUnit.MONTH,
  },
  {
    label: "년",
    value: ECommonTimeUnit.YEAR,
  },
];