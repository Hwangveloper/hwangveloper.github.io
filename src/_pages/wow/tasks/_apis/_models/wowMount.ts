export interface IWowMountInfoParams {
  mountId?: number;
}

export interface IWowCharMountResponse {
  mounts: {
    mount: IWowMount;
  }[];
}

export interface IWowMountResponse {
  mounts: IWowMount[];
}

export interface IWowMountInfoResponse {
  id: number;
  name: string;
  description: string;
  source?: {
    name: string;
  }
}

export interface IWowMount {
  id: number;
  name: string;
  is_collected?: boolean;
}

export interface IWowMountInfo {
  id: number;
  name: string;
  description: string;
  source: string;
}