import { RecordStatus } from './RecordStatus';

export interface IRecord {
  id: string;
  name: string;
  status: RecordStatus;
  appliedBy: Array<string>;
}
