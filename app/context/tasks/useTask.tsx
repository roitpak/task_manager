import {useContext} from 'react';
import {TaskProviderValue} from './TaskProviderValue';
import { TaskContext } from './TaskContext';

export const useTask = (): TaskProviderValue => {
  const taskContext = useContext(TaskContext);
  if (!taskContext) {
    throw new Error('Missing user context, user may be not logged');
  }
  return taskContext;
};
