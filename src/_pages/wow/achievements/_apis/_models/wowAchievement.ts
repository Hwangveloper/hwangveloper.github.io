
export interface IWowAchievementParams {
  realm: string;
  charName: string;
  achievementId?: number;
}

export interface IWowAchievementResponse {
  id: number;
  achievement: {
    key: {
      href: string;
    }
    name: string;
    id: number;
  }
  criteria: {
    id: number;
    is_completed: boolean;
  }
  complete_timestamp: number;
}

export interface IWowAchievement {
  id: number;
  link: string;
  name: string;
  isCompleted: boolean;
}