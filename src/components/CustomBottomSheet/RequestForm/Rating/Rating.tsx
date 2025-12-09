import {View, Text, StyleSheet} from "react-native";
import Icon from "../../../Icon/Icon";
import {Button} from "react-native-paper";

const rating = [5, 4, 3, 2, 1]

export default function Rating() {
    return <View>
        <View style={styles.heading}>
            <Icon name="close" size={14}/>
            <Text>Rating</Text>
            <Button mode="text">Save</Button>
        </View>
        <View style={styles.body}>
            {
                rating.map((item, ratingIndex) => {
                    const starCount = Array(item).fill(1);
                    return (
                        <View key={`rating_${ratingIndex}`} style={styles.ratingRow}>
                            {starCount.map((_, starIndex) => (
                                <Icon
                                    key={`star_${ratingIndex}_${starIndex}`}
                                    color="#FFCC00"
                                    name="starFilled"
                                    size={20}
                                />
                            ))}
                        </View>
                    );
                })
            }

        </View>
    </View>
}

const styles = StyleSheet.create({
    heading: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 16,
    },
    ratingRow:{
      display: "flex",
      flexDirection: "row",
       columnGap: 8
    },
    body: {
        paddingHorizontal: 16,
        rowGap: 17
    }
})