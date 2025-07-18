export interface IWowToyInfoParams {
  toyId?: number;
}

export interface IWowCharToyResponse {
  toys: {
    toy: IWowToy;
  }[];
}

export interface IWowToyResponse {
  toys: IWowToy[];
}

export interface IWowToyInfoResponse {
  id: number;
  item: {
    name: string;
  }
  source: {
    name: string;
  }
  source_description: string;
}

export interface IWowToy {
  id: number;
  name: string;
  is_collected?: boolean;
}

export interface IWowToyInfo {
  id: number;
  name: string;
  description: string;
  source: string;
}