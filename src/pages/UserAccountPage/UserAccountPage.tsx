import {ScrollView, StyleSheet, View} from "react-native";
import {Avatar, Text} from "react-native-paper";
import Icon from "../../components/Icon/Icon";
import UserAction, {IUserActionProps} from "./UserAction/UserAction";
import {useMemo} from "react";


interface IUserActions {
    actionGroupName: string;
    action: Array<IUserActionProps>;
}


export default function UserAccountPage() {


    const userActions = useMemo<Array<IUserActions>>(() => {
        return [
            {
                actionGroupName: "Settings",
                action: [
                    {
                        iconName: "credit_card",
                        name: "Payment",
                        onPress: function () {

                        }
                    },
                    {
                        iconName: "post_add",
                        name: "Passport Details",
                        onPress: function () {

                        }
                    },
                    {
                        iconName: "manage_search",
                        name: "Order History",
                        onPress: function () {

                        }
                    },
                    {
                        iconName: "key",
                        name: "Change password",
                        onPress: function () {

                        }
                    },
                    {
                        iconName: "language",
                        name: "Language & currency",
                        onPress: function () {
                        }

                    }
                ]
            },
            {
                actionGroupName: "Help center",
                action: [
                    {
                        iconName: "quiz",
                        name: "faq",
                        onPress: () => {
                        }
                    },
                    {
                        iconName: "support_agent",
                        name: "Live chat",
                        onPress: () => {
                        }
                    }
                ]
            }
        ]
    }, [])

    return <ScrollView style={styles.container}>
        <View style={styles.userInfoContainer}>
            <Avatar.Image size={74}
                          source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGAQzjFFFMdvtPLULdmZjD-guKK-mAeuedJg&s"}}/>
            {/*todo: we need to use avatar.text if no image*/}
            {/*<Avatar.Text size={74} label="XD" />*/}
            <View style={styles.nameContainer}>
                <Text style={styles.name}>Jon Malkovich</Text>
                <Text style={styles.email}>malkovich@gmail.com</Text>
            </View>
            <Icon name="leftArrow" size={24} color="#74717A"/>
        </View>
        <View>
            {
                userActions.map((actions) => {
                    const {actionGroupName, action} = actions;
                    return <View key={actionGroupName}>
                        <Text style={styles.actionGroupName}>{actionGroupName}</Text>
                        <View>
                            {
                                action.map((item) => {
                                    return <UserAction key={item.name} {...item}/>
                                })
                            }
                        </View>
                    </View>
                })
            }
        </View>
    </ScrollView>
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 24,
        width: '100%',
    },
    nameContainer: {
        display: "flex",
        justifyContent: "flex-start",
    },
    email: {
        fontSize: 14,
        color: "#74717A"
    },
    name: {
        fontSize: 16,
        fontWeight: "500"
    },
    userInfoContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
        paddingBottom: 32
    },
    actionGroupName: {
        fontSize: 20,
        fontWeight: "600",
        lineHeight: 52,
    }
})