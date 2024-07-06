export interface ScheduleFormValues {
  scheduleFrequency: string;
  category: string;
  title: string;
  type: string;
}

interface Data {
  email?: string;
  subject?: string;
  userName?: string;
  menu?: string;
  userId?: string;
  title?: string;
  type?: string;
  category?: string;
}

export interface Allreminders {
  _id: string;
  name: string;
  priority: number;
  nextRunAt: Date | null;
  type: "normal" | "single";
  lockedAt?: Date | null;
  lastFinishedAt?: Date;
  failedAt?: Date | null;
  failCount?: number | null;
  failReason?: string | null;
  repeatTimezone?: string | null;
  lastRunAt?: Date;
  repeatInterval?: string | number;
  data: Data;
  repeatAt?: string;
  disabled?: boolean;
  progress?: number | null;
  uniqueOpts?: {
    insertOnly: boolean;
  };
  lastModifiedBy?: string;
  fork?: boolean;
}
