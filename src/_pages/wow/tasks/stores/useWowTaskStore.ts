import { create } from 'zustand';
import { IWowAchievement } from '../_apis/_models/wowAchievement';
import { IWowTask } from '../_apis/_models/wowTask';
import { IWowMount } from '../_apis/_models/wowMount';
import { IWowPet } from '../_apis/_models/wowPet';
import { IWowToy } from '../_apis/_models/wowToy';

interface WowTaskState {
  taskList: IWowTask[];
  achievementList: IWowAchievement[];
  mountList: IWowMount[];
  petList: IWowPet[];
  toyList: IWowToy[];
}

const useWowTaskStore = create<WowTaskState>((set, get) => ({
  taskList: [],
  achievementList: [],
  mountList: [],
  petList: [],
  toyList: [],
}));

export default useWowTaskStore;