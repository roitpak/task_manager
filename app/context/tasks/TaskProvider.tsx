import React, { FC, PropsWithChildren, useEffect, useState } from 'react';
import { TaskContext } from './TaskContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from './TaskProviderValue';


export const TaskProvider: FC<PropsWithChildren> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    getTask();
  }, []);

  const getTask = async () => {
    setLoading(true);
    try {
      const task = await AsyncStorage.getItem('TASK_KEY_');
      const jsonTask = task != null ? JSON.parse(task) : undefined;
      setTasks(jsonTask);
      setLoading(false);
    } catch (e) {
      setLoading(false);
      // saving error
    }
    setLoading(false);
  };

  // TODO Delete feature 

  const updateTask = async (newTask: Task) => {
    let tempTask = tasks;
    if (tempTask) {
      const index = tempTask.findIndex(task => task.id === newTask.id);
      if (index !== -1) {
        tempTask[index] = newTask;
      } else {
        tempTask.unshift(newTask);
      }
    } else {
      tempTask = [newTask];
    }
    setTasks([]);
    setLoading(true);
    await AsyncStorage.setItem('TASK_KEY_', JSON.stringify(tempTask));
    setTimeout(() => {
      //used this for immutable
      setTasks(tempTask);
      setLoading(false);
    }, 500)
  };

  const deleteTask = async (taskToDelete: Task) => {
    let tempTask = tasks;
    if (tempTask) {
      tempTask = tempTask.filter(task => task.id !== taskToDelete.id);
    }
    setTasks([]);
    setLoading(true);
    await AsyncStorage.setItem('TASK_KEY_', JSON.stringify(tempTask));
    setTimeout(() => {
      //used this for immutable
      setTasks(tempTask);
      setLoading(false);
    }, 500)
  };

  const refresh = async () => {
    setTasks([]);
    setLoading(true);
    await getTask();
    setLoading(false);
  };
  
  return (
    <TaskContext.Provider
      value={{
        tasks,
        updateTask,
        deleteTask,
        loading,
        refresh,
      }}>
      {children}
    </TaskContext.Provider>
  );
};
