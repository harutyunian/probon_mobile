import {Dimensions, StyleSheet, View} from 'react-native';
import {MainCard} from "../../components/MainCard/MainCard";
import {FlashList} from "@shopify/flash-list";
import ListHeader from "./ListHeader/ListHeader";
import {useMemo, useRef} from "react";
import {useScrollToTop} from "@react-navigation/native";


const fillPkg = Array.from({length: 1000}, (_, index) => index);


export function Home() {

    const ref = useRef(null);
    useScrollToTop(ref);


    const numOfPkgColumns = useMemo(() => {
        const width = Dimensions.get("window").width;
        return Math.floor(width / 180);
    }, [])


    return (<View style={styles.container}>
            <FlashList
                ref={ref}
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
        paddingHorizontal: 10,
    }
});