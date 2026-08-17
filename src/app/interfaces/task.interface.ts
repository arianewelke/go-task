import { TaskStatus } from '../types/task-status';
import { IComment } from './comments.interface';

export interface ITask {
  id: string;
  name: string;
  description: string;
  comments: IComment[];
  status: TaskStatus;
}
