
export interface IWowAchievementParams {
  realm: string;
  charName: string;
}

export interface IWowAchievementInfoParams {
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
  criteria: IWowAchievementCriteriaResponse;
  complete_timestamp: number;
}

export interface IWowAchievementInfoResponse {
  id: number;
  name: string;
  description: string;
  criteria: IWowAchievementCriteriaResponse;
}

export interface IWowAchievementCriteriaResponse {
  id: number;
  amount?: number;
  description?: string;
  is_completed?: boolean;
  child_criteria?: IWowAchievementCriteriaResponse[];
}

export interface IWowAchievement {
  id: number;
  link: string;
  name: string;
  criteria: IWowAchievementCriteria;
}

export interface IWowAchievementCriteria {
  id: number;
  amount?: number;
  description?: string;
  isCompleted?: boolean;
  childCriteria?: IWowAchievementCriteria[];
}

export interface IWowAchievementInfo {
  id: number;
  name: string;
  description: string;
  criteria: IWowAchievementCriteria;
}