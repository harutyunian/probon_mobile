import {Dimensions, ScrollView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import Event from '../../components/Event/Event';
import {MainCard} from "../../components/MainCard/MainCard";
import SearchInfoBottomSheet from "../../components/SearchInfoBottomSheet/SearchInfoBottomSheet";
import {FlashList} from "@shopify/flash-list";
import ListHeader from "./ListHeader/ListHeader";
import {useMemo} from "react";


const fillPkg = Array.from({length: 1000}, (_, index) => index);


export function Home() {

    const numOfPkgColumns = useMemo(()=>{
        const width = Dimensions.get("window").width;
        return Math.floor(width / 180);
    },[])


    return (<View style={styles.container}>
                <FlashList
                    numColumns={numOfPkgColumns}
                    ListHeaderComponent={ListHeader}
                    data={fillPkg}
                    estimatedItemSize={250}
                    renderItem={({item}) => <MainCard/>}
                />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
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