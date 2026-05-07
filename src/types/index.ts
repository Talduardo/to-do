export type TaskStatus = 'pending' | 'progress' | 'done';

export interface List {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: number;
  listId: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}

export interface CreateListDTO {
  name: string;
}

export interface CreateTaskDTO {
  title: string;
  description?: string;
  status?: TaskStatus;
}

export interface UpdateTaskDTO {
  title?: string;
  description?: string;
  status?: TaskStatus;
}
