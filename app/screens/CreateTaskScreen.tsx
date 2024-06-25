import { Alert, Pressable, StyleSheet, Text, View } from "react-native";
import { sizes } from "../constants/Sizes";
import { Colors } from "../constants/Colors";
import { Avatar, Button } from "react-native-paper";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { TextInput } from 'react-native-paper';
import { useState } from "react";
import { formatDate } from "../helpers/functions";
import { useTask } from "../context/tasks/useTask";
import { Dimensions } from "../helpers/Dimensions";

export default function CreateTaskScreen({ route }: any) {

  const [title, setTitle] = useState(route.params?.item?.title || '');
  const [description, setDescription] = useState(route.params?.item?.description || '');

  const { updateTask, deleteTask } = useTask();

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const onPressClose = () => {
    navigation.goBack();
  };

  const onPressSave = () => {
    updateTask({
      title: title,
      description: description,
      completed: route.params?.item?.completed || false,
      id: route.params?.item?.id || new Date().toISOString(),
    });
    navigation.goBack();
  };

  const onPressComplete = () => {
    updateTask({
      title: title,
      description: description,
      completed: true,
      id: route.params?.item?.id,
    });
    navigation.goBack();
  };

  const disableIfValueNotChanged = () => {
    if (title === route?.params?.item?.title && description === route?.params?.item?.description) {
      return true;
    }
    if (route?.params?.item === undefined) {
      // no intial value so can show save button
      return false;
    }
  };

  const onPressDelete = () => {
    Alert.alert(`Delete: ${route?.params?.item?.title}`, 'Are you sure you want to delete this task', [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Yes, Delete!',
        onPress: () => {
          deleteTask(route?.params?.item);
          navigation.goBack();
        },
      },
    ]);
  };

  return (
    <View
      style={styles.container}
    >
      <Pressable style={styles.closeButton} onPress={onPressClose}>
        <Avatar.Image style={styles.closeBackground} size={30} source={require('../assets/down.png')} />
      </Pressable>
      <TextInput
        style={styles.titleInput}
        label="Title"
        value={title}
        onChangeText={text => setTitle(text)}
        multiline
        mode="flat"
        selectionColor={Colors.white}
        underlineColor={Colors.textHighlight}
        activeUnderlineColor={Colors.textHighlight}
        textColor={Colors.white}
      />
      <TextInput
        style={styles.subtitleInput}
        label="Description"
        value={description}
        onChangeText={text => setDescription(text)}
        multiline
        mode="flat"
        selectionColor={Colors.white}
        underlineColor={Colors.textHighlight}
        activeUnderlineColor={Colors.textHighlight}
        textColor={Colors.white}
      />
      <Text style={styles.created}>Created</Text>
      <Text style={styles.createdDate}>{route.params?.item?.id ? formatDate(new Date(route.params?.item?.id)) : formatDate()}</Text>
      {route.params?.item && <Pressable style={styles.closeButton} onPress={onPressDelete}>
        <Avatar.Image style={styles.deleteBackground} size={60} source={require('../assets/delete.png')} />
      </Pressable>
      }
      <View style={styles.saveButtonContainer}>
        <Button
          style={styles.button}
          disabled={title.length === 0 || description.length === 0 || disableIfValueNotChanged()}
          icon="bookmark" mode="contained"
          onPress={onPressSave}
        >
          Save
        </Button>
        {route.params?.item && !route.params?.item?.completed &&
          <Button
            textColor={Colors.black}
            style={styles.buttonComplete}
            disabled={title.length === 0 || description.length === 0}
            icon="check" mode="contained"
            onPress={onPressComplete}
          >
            Complete
          </Button>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: sizes.large,
    backgroundColor: Colors.background,
  },
  closeButton: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginVertical: sizes.large,
  },
  closeBackground: {
    backgroundColor: Colors.textHighlight,
    paddingTop: 2,
  },
  deleteBackground: {
    backgroundColor: Colors.white,
  },
  titleInput: {
    backgroundColor: Colors.background,
    fontSize: sizes.text.h1,
    color: Colors.white,
    paddingVertical: sizes.small,
  },
  subtitleInput: {
    minHeight: 150,
    backgroundColor: Colors.background,
    fontSize: sizes.text.h2,
    color: Colors.white,
    paddingVertical: sizes.small,
    marginTop: sizes.large,
  },
  created: {
    color: Colors.white,
    marginTop: sizes.large,
  },
  createdDate: {
    color: Colors.white,
    marginVertical: sizes.small,
  },
  saveButtonContainer: {
    position: 'absolute',
    bottom: sizes.extra_large,
    left: 0,
    width: Dimensions.windowWidth,
    paddingHorizontal: sizes.large,
  },
  button: {
    backgroundColor: Colors.textHighlight,
    marginTop: sizes.small,
  },
  buttonComplete: {
    backgroundColor: Colors.complete,
    marginTop: sizes.small,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});