export type tracks = Array<{
    login: string,
    tracks: {
      trackId: number,
      startTime: number,
      endTime: number,
      duration: number,
      track: string
    }[]
  }>;

export type userTracks = {
    login: string,
    tracks: {
      trackId: number,
      startTime: number,
      endTime: number,
      duration: number,
      track: string
    }[]
  };

export type track = {
    trackId: number,
    startTime: number,
    endTime: number,
    duration: number,
    track: string
};

export type journal = Array<{
    name: string,
    trackId: number,
    track: string,
    duration: number,
    startTime: string,
    endTime: string,
  }>