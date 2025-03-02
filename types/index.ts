export type ID = string;

export interface Column {
  uuid: ID;
  title: string;
  tasks: Task[];
}

export interface Task {
  uuid: ID;
  title: string;
  createdAt: Date;
}
