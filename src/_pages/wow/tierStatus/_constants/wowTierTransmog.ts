export enum EWowCollectionStatus {
  COMPLETE = 'O',
  NOT_FIND = 'X',
  UPGRADABLE = 'U',
  CHANGEABLE = 'C',
}

export enum EWowRaidType {
  RAID_FINDER = 'RAID_FINDER',
  NORMAL = 'NORMAL',
  HEROIC = 'HEROIC',
  MYTHIC = 'MYTHIC',
}

export enum EWowTransmogPartType {
  HEAD = 'head',
  SHOULDERS = 'shoulders',
  BACK = 'back',
  CHEST = 'chest',
  WRIST = 'wrist',
  HANDS = 'hands',
  WAIST = 'waist',
  LEGS = 'legs',
  FEET = 'feet',
}

export const itemTransPartTypeOptions = [
  {
    label: "머리",
    value: EWowTransmogPartType.HEAD,
  },
  {
    label: "어깨",
    value: EWowTransmogPartType.SHOULDERS,
  },
  {
    label: "등",
    value: EWowTransmogPartType.BACK,
  },
  {
    label: "가슴",
    value: EWowTransmogPartType.CHEST,
  },
  {
    label: "손목",
    value: EWowTransmogPartType.WRIST,
  },
  {
    label: "손",
    value: EWowTransmogPartType.HANDS,
  },
  {
    label: "허리",
    value: EWowTransmogPartType.WAIST,
  },
  {
    label: "다리",
    value: EWowTransmogPartType.LEGS,
  },
  {
    label: "발",
    value: EWowTransmogPartType.FEET,
  },
];

export const collectionStatusOptions = [
  {
    label: "완료",
    value: EWowCollectionStatus.COMPLETE,
  },
  {
    label: "변환 가능",
    value: EWowCollectionStatus.CHANGEABLE,
  },
  {
    label: "업글 가능",
    value: EWowCollectionStatus.UPGRADABLE,
  },
  {
    label: "미획득",
    value: EWowCollectionStatus.NOT_FIND,
  },
];

export enum EWowTierTransmogUpdateRequestFields {
  collectionStatus = 'collectionStatus',
}