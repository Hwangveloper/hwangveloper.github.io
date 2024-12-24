import { create } from 'zustand';
import { IProject } from '../_apis/_models/project';

interface ProjectState {
  projectList: IProject[];
}

const useProjectStore = create<ProjectState>((set, get) => ({
  projectList: [],
}));

export default useProjectStore;