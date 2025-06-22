import { create } from 'zustand';
import { IWowAchievement } from '../_apis/_models/wowAchievement';

interface WowAchievementState {
  achievementList: IWowAchievement[];
}

const useWowAchievementStore = create<WowAchievementState>((set, get) => ({
  achievementList: [],
}));

export default useWowAchievementStore;