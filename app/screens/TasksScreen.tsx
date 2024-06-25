import { FlatList, Pressable, RefreshControl, StatusBar, StyleSheet, Text, View } from "react-native";
import { Avatar } from "react-native-paper";
import { sizes } from "../constants/Sizes";
import { calculateCompletionPercentage, calculateCompletionStreak, formatDate, getTimedGreetings, getWeekdayName } from "../helpers/functions";
import { Dimensions } from "../helpers/Dimensions";
import { Colors } from "../constants/Colors";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { CREATE_TASKS_SCREEN } from "../navigation/screens";
import { NativeStackNavigationProp } from "react-native-screens/lib/typescript/native-stack/types";
import { useTask } from "../context/tasks/useTask";
import TaskComponent from "../components/TaskComponent";
import LottieView from 'lottie-react-native';

const ICON_SIZE = Dimensions.windowWidth * 0.2;

export default function TasksScreen() {

    const { tasks, loading, refresh } = useTask();
    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

    const onPressAdd = () => {
        navigation.navigate(CREATE_TASKS_SCREEN);
    };

    return (
        <View
            style={styles.container}
        >
            <FlatList
                refreshControl={
                    <RefreshControl tintColor={Colors.white} refreshing={loading} onRefresh={refresh} />
                }
                contentContainerStyle={styles.flatListContentContainer}
                refreshing={loading}
                extraData={tasks}
                style={styles.flatListContainer}
                data={tasks}
                renderItem={({ item }) => <TaskComponent item={item} />}
                ListHeaderComponent={
                    <>
                        <View style={styles.profileHeaderContainer}>
                            <Avatar.Image size={Dimensions.windowWidth * 0.2} source={require('../assets/man.png')} />
                            <View style={styles.streakContainer}>
                                <LottieView
                                    source={require("../assets/lottie/streak.json")}
                                    style={styles.streak}
                                    autoPlay
                                    loop
                                />
                                <Text style={styles.streakName}>{calculateCompletionStreak(tasks)}</Text>
                            </View>
                        </View>
                        <Text style={styles.timedGreetings}>{getTimedGreetings()}</Text>
                        <View style={styles.listHeader}>
                            <View style={styles.subHeader}>
                                <Text style={styles.header}>Todays {getWeekdayName()}</Text>
                                <Text style={styles.header2}>{formatDate()}</Text>
                            </View>
                            <View style={styles.subHeader2}>
                                <Text style={styles.header}>{calculateCompletionPercentage(tasks)}% done</Text>
                                <Text style={styles.header2}>Completed tasks</Text>
                            </View>
                        </View>
                        <Text style={styles.title}>Tasks</Text>
                        <View style={styles.line} />
                    </>
                }
            />
            <Pressable style={styles.addButton} onPress={onPressAdd}>
                <Avatar.Image style={styles.addAvatar} size={ICON_SIZE} source={require('../assets/plus.png')} />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.background,
    },
    flatListContainer: {
        padding: sizes.large,
    },
    flatListContentContainer: {
        paddingBottom: 150,
    },
    profileHeaderContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    timedGreetings: {
        marginTop: sizes.large,
        fontSize: Dimensions.windowWidth * 0.17,
        color: Colors.textHighlight,
        fontWeight: '200',
        lineHeight: Dimensions.windowWidth * 0.17
    },
    listHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: sizes.large,
    },
    subHeader: {
        alignItems: 'flex-start',
    },
    subHeader2: {
        alignItems: 'flex-end',
    },
    header: {
        color: Colors.white,
        fontSize: sizes.text.p2,
    },
    header2: {
        color: Colors.faded,
        fontSize: sizes.text.p2,
    },
    title: {
        fontSize: sizes.text.h1,
        color: Colors.white,
        marginTop: sizes.large,
        fontWeight: '300',
    },
    line: {
        borderWidth: 1,
        width: '100%',
        borderColor: Colors.faded,
        marginTop: sizes.medium,
        marginBottom: sizes.large,
    },
    addButton: {
        position: 'absolute',
        bottom: ICON_SIZE / 2.8,
        left: Dimensions.windowWidth / 2 - ICON_SIZE / 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    addAvatar: {
        backgroundColor: Colors.textHighlight,
    },
    streak: {
        height: 40,
        width: 40,
        marginHorizontal: -7,
    },
    streakContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    streakName: {
        fontSize: sizes.text.p1,
        color: Colors.textHighlight,
        paddingBottom: 10,
    }
});