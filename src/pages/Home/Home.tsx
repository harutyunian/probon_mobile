import {ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Event from '../../components/Event/Event';
import {MainCard} from "../../components/MainCard/MainCard";
import SearchInfoBottomSheet from "../../components/SearchInfoBottomSheet/SearchInfoBottomSheet";
import {FlashList} from "@shopify/flash-list";
import ListHeader from "./ListHeader/ListHeader";


const fillPkg = Array.from({length: 1000}, (_, index) => index);


export function Home() {

    return (<View style={styles.container}>
                <FlashList
                    numColumns={2}
                    ListHeaderComponent={ListHeader}
                    data={fillPkg}
                    estimatedItemSize={250}
                    contentContainerStyle={styles.listContentContainer}
                    renderItem={({item}) => <MainCard/>}
                />
            <SearchInfoBottomSheet/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    listContentContainer: {
        // paddingHorizontal: 16,
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    card: {
        flexBasis: '48%',
        marginBottom: 16,
    }
});