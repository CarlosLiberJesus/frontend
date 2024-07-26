export interface IUserLocation {
  distrito: {
    uuid: string;
    name: string;
    concelho: {
      uuid: string;
      name: string;
      freguesia: {
        uuid: string;
        name: string;
      };
    };
  };
}

export interface IFreguesias {
  freguesias: {
    uuid: string;
    name: string;
  }[];
}

export interface IConcelhos {
  concelhos: {
    uuid: string;
    name: string;
  }[];
}

export interface IDistritos {
  districtos: {
    uuid: string;
    name: string;
  }[];
}

export interface IUserLocationFile {
  all: {
    distritos: {
      uuid: string;
      name: string;
      concelhos: {
        uuid: string;
        name: string;
        freguesia: {
          uuid: string;
          name: string;
        }[];
      }[];
    }[];
  };
}
