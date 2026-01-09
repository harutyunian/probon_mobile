import {ScrollView, StyleSheet, View} from "react-native";
import {Card, Divider, IconButton, Text, useTheme} from "react-native-paper";
import {useMemo, useCallback} from "react";
import {useAppSelector} from "../../../../hooks/redux";
import {useTabNavigation} from "react-native-paper-tabs";

const Row = ({label, value}: {label: string; value?: string | number | null}) => {
    if (value === undefined || value === null || value === "") return null;
    return (
        <View style={styles.row}>
            <Text variant="bodyMedium" style={styles.rowLabel}>{label}</Text>
            <Text variant="bodyMedium" style={styles.rowValue}>{value}</Text>
        </View>
    );
};

export default function Review() {
    const theme = useTheme();
    const goToTab = useTabNavigation();

    const {
        form: {
            requestTitle,
            passengers,
            dateRange,
            tourismType,
            toursEvent,
            priceRange,
            visaIncluded,
            propertyTypes,
            rating,
            meals,
            room,
            facilities,
            roomFacilitiesText,
            notes,
        }
    } = useAppSelector(state => state.createRequestForm);

    const passengerValue = useMemo(() => {
        if (!passengers) return "";
        const parts: string[] = [];
        if (passengers.adults) parts.push(`${passengers.adults} Adult${passengers.adults > 1 ? "s" : ""}`);
        if (passengers.children) parts.push(`${passengers.children} Child${passengers.children > 1 ? "ren" : ""}`);
        if (passengers.infants) parts.push(`${passengers.infants} Infant${passengers.infants > 1 ? "s" : ""}`);
        return parts.join(", ");
    }, [passengers]);

    const dateValue = useMemo(() => {
        if (!dateRange?.startDate) return "";
        const fmt = (d: string) => new Date(d).toLocaleDateString('en-US', {month: 'short', day: 'numeric'});
        if (dateRange.endDate) {
            return `${fmt(dateRange.startDate)} - ${fmt(dateRange.endDate)}`;
        }
        return fmt(dateRange.startDate);
    }, [dateRange]);

    const tourismValue = useMemo(() => {
        if (!tourismType) return "";
        return tourismType.type;
    }, [tourismType]);

    const priceValue = useMemo(() => {
        if (!priceRange) return "";
        return `$${priceRange.min}-$${priceRange.max}`;
    }, [priceRange]);

    const propertyTypeValue = useMemo(() => {
        if (!propertyTypes || propertyTypes.length === 0) return "";
        return propertyTypes.map(p => p.label).join(", ");
    }, [propertyTypes]);

    const ratingValue = useMemo(() => {
        if (!rating?.ratings || rating.ratings.length === 0) return "";
        const max = Math.max(...rating.ratings);
        return "★".repeat(max);
    }, [rating]);

    const mealsValue = useMemo(() => {
        if (!meals || meals.length === 0) return "";
        return meals.map(m => m.label).join(", ");
    }, [meals]);

    const roomValue = useMemo(() => {
        if (!room || !room.types || room.types.length === 0) return "";
        const types = room.types.map(t => t.label).join(", ");
        return `${types} • ${room.count}`;
    }, [room]);

    const facilitiesValue = useMemo(() => {
        if (!facilities || facilities.length === 0) return "";
        return facilities.map(f => f.label).join("  •  ");
    }, [facilities]);

    const handleEdit = useCallback((tabIndex: number) => () => goToTab(tabIndex), [goToTab]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text variant="titleMedium" style={styles.title}>{requestTitle || "Review request"}</Text>

            <Card style={styles.card}>
                <Card.Title title="Request" right={(props) => (
                    <IconButton {...props} icon="pencil" onPress={handleEdit(1)} />
                )}/>
                <Card.Content>
                    <Row label="Adults" value={passengers?.adults} />
                    <Row label="Children" value={passengers?.children} />
                    <Row label="Infants" value={passengers?.infants} />
                    <Row label="Dates" value={dateValue} />
                    <Row label="Tourism type" value={tourismValue} />
                    <Row label="Tours & events" value={toursEvent} />
                    <Row label="Price" value={priceValue} />
                    <Row label="Visa" value={visaIncluded ? "Included" : "Not included"} />
                </Card.Content>
            </Card>

            <Card style={styles.card}>
                <Card.Title title="Property" right={(props) => (
                    <IconButton {...props} icon="pencil" onPress={handleEdit(2)} />
                )}/>
                <Card.Content>
                    <Row label="Property type" value={propertyTypeValue} />
                    <Row label="Rating" value={ratingValue} />
                    <Row label="Room" value={roomValue} />
                    <Row label="Meals" value={mealsValue} />
                    <Row label="Facilities" value={facilitiesValue} />
                    <Row label="Room facilities" value={roomFacilitiesText} />
                    <Row label="Notes" value={notes} />
                </Card.Content>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingVertical: 20,
        rowGap: 16,
    },
    title: {
        marginBottom: 4,
        fontWeight: "700",
    },
    card: {
        borderRadius: 12,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 6,
    },
    rowLabel: {
        color: "#6B6B6B",
    },
    rowValue: {
        fontWeight: "600",
    },
});
