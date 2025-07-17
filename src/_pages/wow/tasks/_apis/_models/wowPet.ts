export interface IWowPetResponse {
  pets: {
    species: {
      id: number;
      name: string;
    }
    level: number;
    quality: {
      type: string; // POOR / COMMON / UNCOMMON / RARE
      name: string; // 하급 / 일반 / 고급 / 희귀
    }
    stats: {
      health: number;
      power: number;
      speed: number;
    }
    is_favorite: boolean;
  }[];
}

export interface IWowPetInfoResponse {
  pets: {
    id: number;
    name: string;
  }[];
}

export interface IWowPet {
  id: number;
  name: string;
  collected: {
    level: number;
    qualityName: string;
    isFavorite: boolean;
  }[];
}