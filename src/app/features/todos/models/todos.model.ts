export interface Todo {
  id: string;
  user: string;
  title: string;
  description: string;
  completed: boolean;
}

export enum TodoFilterStatus {
  All,
  Completed,
  InCompleted
}
