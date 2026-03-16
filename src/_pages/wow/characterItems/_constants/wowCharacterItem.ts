export enum EWowCharItemDataType {
  ITEM_LEVEL = 'ITEM_LEVEL',
  ITEM_TYPE = 'ITEM_TYPE',
}

export enum EWowItemType {
  ADVENTURER = '모험가',
  STAGER = '노련가',
  CHAMPION = '챔피언',
  HERO = '영웅',
  MYTHIC = '신화',
  ETC = '제작/기타',
}

export enum EWowItemPartType {
  UNDEFINED = 'undefined',

  TWO_HAND_WEAPON1 = 'thWeapon1',
  TWO_HAND_WEAPON2 = 'thWeapon2',
  ONE_HAND_WEAPON1 = 'ohWeapon1',
  ONE_HAND_WEAPON2 = 'ohWeapon2',
  ONE_HAND_WEAPON3 = 'ohWeapon3',
  ONE_HAND_WEAPON4 = 'ohWeapon4',

  HEAD = 'head',
  NECK = 'neck',
  SHOULDERS = 'shoulders',
  BACK = 'back',
  CHEST = 'chest',
  WRIST = 'wrist',
  HANDS = 'hands',
  WAIST = 'waist',
  LEGS = 'legs',
  FEET = 'feet',
  RING1 = 'ring1',
  RING2 = 'ring2',
  TRINKET1 = 'trinket1',
  TRINKET2 = 'trinket2',
}

export enum EWowCharItemUpdateRequestFields {
  part = 'part',
  level = 'level',
  type = 'type',
}

export enum EWowCharWeaponUpdateRequestFields {
  thWeapon1Level = 'thWeapon1Level',
  thWeapon1Type = 'thWeapon1Type',
  thWeapon2Level = 'thWeapon2Level',
  thWeapon2Type = 'thWeapon2Type',
  ohWeapon1Level = 'ohWeapon1Level',
  ohWeapon1Type = 'ohWeapon1Type',
  ohWeapon2Level = 'ohWeapon2Level',
  ohWeapon2Type = 'ohWeapon2Type',
  ohWeapon3Level = 'ohWeapon3Level',
  ohWeapon3Type = 'ohWeapon3Type',
  ohWeapon4Level = 'ohWeapon4Level',
  ohWeapon4Type = 'ohWeapon4Type',
}

export const itemTypeOptions = [
  {
    label: "모험가",
    value: EWowItemType.ADVENTURER,
  },
  {
    label: "노련가",
    value: EWowItemType.STAGER,
  },
  {
    label: "챔피언",
    value: EWowItemType.CHAMPION,
  },
  {
    label: "영웅",
    value: EWowItemType.HERO,
  },
  {
    label: "신화",
    value: EWowItemType.MYTHIC,
  },
  {
    label: "제작/기타",
    value: EWowItemType.ETC,
  },
];

export const itemPartTypeOptions = [
  {
    label: "무기",
    value: EWowItemPartType.UNDEFINED,
  },
  {
    label: "양손무기1",
    value: EWowItemPartType.TWO_HAND_WEAPON1,
  },
  {
    label: "양손무기2",
    value: EWowItemPartType.TWO_HAND_WEAPON2,
  },
  {
    label: "한손무기1",
    value: EWowItemPartType.ONE_HAND_WEAPON1,
  },
  {
    label: "보조무기1",
    value: EWowItemPartType.ONE_HAND_WEAPON2,
  },
  {
    label: "한손무기2",
    value: EWowItemPartType.ONE_HAND_WEAPON3,
  },
  {
    label: "보조무기2",
    value: EWowItemPartType.ONE_HAND_WEAPON4,
  },
  {
    label: "머리",
    value: EWowItemPartType.HEAD,
  },
  {
    label: "목",
    value: EWowItemPartType.NECK,
  },
  {
    label: "어깨",
    value: EWowItemPartType.SHOULDERS,
  },
  {
    label: "등",
    value: EWowItemPartType.BACK,
  },
  {
    label: "가슴",
    value: EWowItemPartType.CHEST,
  },
  {
    label: "손목",
    value: EWowItemPartType.WRIST,
  },
  {
    label: "손",
    value: EWowItemPartType.HANDS,
  },
  {
    label: "허리",
    value: EWowItemPartType.WAIST,
  },
  {
    label: "다리",
    value: EWowItemPartType.LEGS,
  },
  {
    label: "발",
    value: EWowItemPartType.FEET,
  },
  {
    label: "반지1",
    value: EWowItemPartType.RING1,
  },
  {
    label: "반지2",
    value: EWowItemPartType.RING2,
  },
  {
    label: "장신구1",
    value: EWowItemPartType.TRINKET1,
  },
  {
    label: "장신구2",
    value: EWowItemPartType.TRINKET2,
  },
];