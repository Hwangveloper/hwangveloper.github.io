export interface IWowMountResponse {
  mounts: {
    mount: IWowMount;
  }[];
}

export interface IWowMountInfoResponse {
  mounts: IWowMount[];
}

export interface IWowMount {
  id: number;
  name: string;
  is_collected?: boolean;
}