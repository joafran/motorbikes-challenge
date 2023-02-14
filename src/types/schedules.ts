export enum SCHEDULE_STATUS_ENUM {
  REQUESTED = "requested",
  NOT_REQUESTED = "not_requested",
}

export interface ISchedule {
  id: string;
  motorbikes: number;
  time: string;
  available: boolean;
}
