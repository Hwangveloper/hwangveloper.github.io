import { create } from 'zustand';
import { IWowAchievement } from '../_apis/_models/wowAchievement';
import { IWowTask } from '../_apis/_models/wowTask';

interface WowTaskState {
  taskList: IWowTask[];
  achievementList: IWowAchievement[];
}

const useWowTaskStore = create<WowTaskState>((set, get) => ({
  taskList: [],
  achievementList: [],
}));

export default useWowTaskStore;