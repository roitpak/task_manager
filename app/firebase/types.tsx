
export const USERS_COLLECTION  = 'users';
export const USERS_ID_KEY = 'users_id_key';
export const TASKS_COLLECTION = 'tasks';

/**
 * @deprecated Ignore this file
 */
export interface Task {
    id?: string;
    title: string;
    description: string;
    completed: boolean;
  }

export interface User{
    id? : string;
}