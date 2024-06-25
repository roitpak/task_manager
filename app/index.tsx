import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import MainNavigator from './navigation/MainNavigator';
import { TaskProvider } from './context/tasks/TaskProvider';

const Stack = createNativeStackNavigator();

export default function Index() {

  return (
    <PaperProvider>
      <TaskProvider>
        <MainNavigator />
      </TaskProvider>
    </PaperProvider>
  );
}
