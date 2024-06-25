import { Text, View } from "react-native";
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { CREATE_TASKS_SCREEN, TASKS_SCREEN } from "./screens";
import TasksScreen from "../screens/TasksScreen";
import CreateTaskScreen from "../screens/CreateTaskScreen";
import { headerHidden } from "./navigationsoptions";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator
        screenOptions={headerHidden}
        initialRouteName={TASKS_SCREEN}>
          <Stack.Screen name={TASKS_SCREEN} component={TasksScreen} />
          <Stack.Screen name={CREATE_TASKS_SCREEN} component={CreateTaskScreen} />
        </Stack.Navigator>
    </NavigationContainer>
  );
}
