import { Pressable, StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { Task } from "../context/tasks/TaskProviderValue";
import { sizes } from "../constants/Sizes";
import { Colors } from "../constants/Colors";
import { truncateString } from "../helpers/functions";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { CREATE_TASKS_SCREEN, TASKS_SCREEN } from "../navigation/screens";

interface Props {
    item: Task;
}


export default function TaskComponent({ item }: Props) {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const onGoToTaskScreen = () => {
        navigation.navigate(CREATE_TASKS_SCREEN, { item });
    };

    return (
        <Pressable onPress={onGoToTaskScreen} style={[styles.container, item.completed ? styles.completedBG : styles.normalBG]}>
            <View style={styles.textContainer}>
                {item?.completed && <View style={styles.completedContainer}>
                    <Text style={styles.completedText}>Completed</Text>
                    <View>
                        <Avatar.Image style={styles.completed} size={20} source={require('../assets/check.png')} />
                    </View>
                </View>}
                <Text style={styles.title}>{truncateString(item.title, 50)}</Text>
                <Text style={styles.description}>{truncateString(item.description, 100)}</Text>
            </View>
            <View style={styles.closeButton}>
                <Avatar.Image style={styles.closeBackground} size={30} source={require('../assets/down.png')} />
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: sizes.large,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: sizes.border_radius * 3,
        marginTop: sizes.small,
    },
    normalBG: {
        backgroundColor: Colors.white,
    },
    completedBG: {
        backgroundColor: Colors.completedBg,
    },
    title: {
        fontSize: sizes.text.h1,
        color: Colors.black,
        fontWeight: '300',
        lineHeight: sizes.text.h1,
        marginBottom: sizes.extra_small,
        verticalAlign: 'middle',
    },
    description: {
        verticalAlign: 'auto',
        fontSize: sizes.text.h2,
        color: Colors.black,
        fontWeight: '300',
    },
    closeBackground: {
        backgroundColor: Colors.textHighlight,
        paddingTop: 2,
    },
    textContainer: {
        width: '90%',
    },
    closeButton: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        alignSelf: 'flex-start',
        elevation: 5,
        transform: [{ rotate: '270deg' }]
    },
    completedContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    completedText: {
        fontSize: sizes.text.h2,
        fontWeight: '300',
        marginRight: sizes.small,
    },
    completed: {
        backgroundColor: Colors.complete,
    },
})
