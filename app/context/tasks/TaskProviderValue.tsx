
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const TASK_KEY = 'task1';

export interface TaskProviderValue {
  tasks?: Task[];
  updateTask: (task: Task) => void;
  deleteTask: (task: Task) => void;
  loading: boolean;
  refresh: () => void;
}
