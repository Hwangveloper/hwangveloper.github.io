export interface IWowToyResponse {
  toys: {
    toy: IWowToy;
  }[];
}

export interface IWowToyInfoResponse {
  toys: IWowToy[];
}

export interface IWowToy {
  id: number;
  name: string;
  is_collected?: boolean;
}