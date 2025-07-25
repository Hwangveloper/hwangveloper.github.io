export enum EWowTaskCategory {
  ACHIEVEMENT = 'ACHIEVEMENT',
  MOUNT = 'MOUNT',
  TOY = 'TOY',
  PET = 'PET',
  TRANSMOG = 'TRANSMOG',
  PROFESSION = 'PROFESSION',
}

export enum IWowTaskSaveRequestFields {
  charId = 'charId',
  category = 'category',
  frequency = 'frequency',
  type = 'type',
  idOrName = 'idOrName',
  description = "description",
  reference = "reference",
}

export const taskCategoryOptions = [
  {
    label: "업적",
    value: EWowTaskCategory.ACHIEVEMENT,
  },
  {
    label: "탈것",
    value: EWowTaskCategory.MOUNT,
  },
  {
    label: "장난감",
    value: EWowTaskCategory.TOY,
  },
  {
    label: "애완동물",
    value: EWowTaskCategory.PET,
  },
  {
    label: "형상",
    value: EWowTaskCategory.TRANSMOG,
  },
  {
    label: "전문기술",
    value: EWowTaskCategory.PROFESSION,
  },
];