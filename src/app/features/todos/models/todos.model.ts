export interface Todo {
  id: string;
  userId: string;
  title: string;
  description: string;
  completed: boolean;
}

export enum TodoFilterStatus {
  All,
  Completed,
  InCompleted
}
