import {View, Text, StyleSheet, StyleProp, ViewStyle} from 'react-native';
import {stickerType} from "../../types/sticker";
import {useMemo} from "react";
import {t} from "../../i18n";
import Icon, {IconType} from "../Icon/Icon";

export interface StickerProps {
    type: stickerType,
    containerStyle?: StyleProp<ViewStyle>;
}


export function Sticker(props: StickerProps) {
    const {type, containerStyle} = props;

    const stickerInfo = useMemo(() => {
        // textKey yete haves anenq es anyn kpoxenq heto imast el chka erevi sra vra tanjvel
        const stickerData: Record<stickerType, { backgroundColor: string, icon: IconType, textKey: any }> = {
            // --- Sales & Offers ---
            buyNowGetSale: {backgroundColor: '#FB4A53', icon: 'tag', textKey: 'components.badge.buyNowGetSale'},
            bigSale: {backgroundColor: '#6E5FEF', icon: 'percent', textKey: 'components.badge.bigSale'},
            hotSale: {backgroundColor: '#FB3640', icon: 'fire', textKey: 'components.badge.hotSale'},
            finalSale: {backgroundColor: '#FFCC00', icon: 'coin', textKey: 'components.badge.finalSale'},
            specialOffer: {backgroundColor: '#6E5FEF', icon: 'star', textKey: 'components.badge.specialOffer'},
            blackFriday: {backgroundColor: '#282533', icon: 'priceTag', textKey: 'components.badge.blackFriday'},

            // --- Seasonal ---
            seasonDeal: {backgroundColor: '#FFCC00', icon: 'umbrella', textKey: 'components.badge.seasonDeal'},
            newYearDeal: {backgroundColor: '#FB4A53', icon: 'tree', textKey: 'components.badge.newYearDeal'},
            summerSale: {backgroundColor: '#34C759', icon: 'sun', textKey: 'components.badge.summerSale'},
            autumnSale: {backgroundColor: '#FFDA46', icon: 'closedUmbrella', textKey: 'components.badge.autumnSale'},
            winterSale: {backgroundColor: '#7FCFFF', icon: 'snowflake', textKey: 'components.badge.winterSale'},
            springSale: {backgroundColor: '#FFCC00', icon: 'sprout', textKey: 'components.badge.springSale'},

            // --- Other ---
            forNewlyweds: {backgroundColor: '#AEA6F6', icon: 'heart', textKey: 'components.badge.forNewlyweds'},
            unforgettableMoments: {
                backgroundColor: '#CFCAFA',
                icon: 'infinity',
                textKey: 'components.badge.unforgettableMoments'
            },
            hitOfSales: {backgroundColor: '#FB3640', icon: 'fire', textKey: 'components.badge.hitOfSales'},
            uniqueOffer: {backgroundColor: '#34C759', icon: 'tag', textKey: 'components.badge.uniqueOffer'},
        };

        return stickerData[type]
    }, [])

    if (!stickerInfo) {
        return null
    }
    return <View style={[styles.container, {backgroundColor: stickerInfo.backgroundColor}, containerStyle]}>
        <Icon name={stickerInfo.icon} size={14} color='#000'/>
        <Text style={styles.text}>{t(stickerInfo.textKey)}</Text>
    </View>
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 16,
        alignSelf: 'flex-start',
        flexDirection: 'row',
        columnGap: 5,
        display: 'flex',
        alignItems: 'center',
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
    },
    text: {
        fontSize: 12,
        fontWeight: '500',
        lineHeight: 16,
        color: '#000',
    }
})