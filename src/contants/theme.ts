import {MD3LightTheme as DefaultTheme} from 'react-native-paper';
import {CalendarTheme} from "@marceloterreiro/flash-calendar";


export const paperTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#5E4DED',
        textSecondary: "#74717A"
    },
    components: {
        TextInput: {
            contentStyle: {
                borderRadius: 16,
            },
            style: {
                borderRadius: 16,
            },
            outlineStyle: {
                borderRadius: 16,
            }
        }
    }
};


const selectedRangeBackgroundColor = "#DFDBFB"
const separatorColor = "#000000"


const radius = (isStartOfRange: boolean, isEndOfRange: boolean): number => {
    return isStartOfRange || isEndOfRange ? 100 : 0
}

export const calendarTheme: CalendarTheme = {
    rowMonth: {
        content: {
            color: paperTheme.colors.primary,
            fontWeight: "600",
        }
    },
    rowWeek: {
        container: {
            paddingVertical: 8,
        }
    },
    itemDayContainer: {
        activeDayFiller: {
            backgroundColor: selectedRangeBackgroundColor,
        },
    },
    itemDay: {
        idle: () => ({
            container: {
                backgroundColor: "transparent",
            },
            content: {
                color: separatorColor,
            },
        }),
        today: () => ({
            container: {
                backgroundColor: "#FFFFFF",
                borderWidth: 1,
                borderColor: "#000000",
                borderStyle: "solid",
                borderRadius: 999,
            },
            content: {
                color: "#000000",
                fontWeight: "600",
            },
        }),
        disabled: () => ({
            container: {
                backgroundColor: "transparent",
            },
            content: {
                color: "#D0D0D0",
            },
        }),
    active: ({isStartOfRange, isEndOfRange}) => {
            const isMiddleDate = !isStartOfRange && !isEndOfRange;

            return {
                container: {
                    backgroundColor: isMiddleDate
                        ? selectedRangeBackgroundColor
                        : paperTheme.colors.primary,
                    //todo: es ktore to mna im jogelov heto petqa bzbzal
                    // borderBottomEndRadius: radius(isStartOfRange, isEndOfRange),
                    // borderBottomLeftRadius: radius(isStartOfRange, isEndOfRange),
                    // borderBottomRightRadius: radius(isStartOfRange, isEndOfRange),
                    // borderBottomStartRadius: radius(isStartOfRange, isEndOfRange),
                    // borderTopEndRadius: radius(isStartOfRange, isEndOfRange),
                    // borderTopLeftRadius: radius(isStartOfRange, isEndOfRange),
                    // borderTopRightRadius: radius(isStartOfRange, isEndOfRange),
                    // borderTopStartRadius: radius(isStartOfRange, isEndOfRange),
                    // ...((isStartOfRange || isEndOfRange) && {width: 35}),
                    // ...((isStartOfRange || isEndOfRange) && {height: 35}),
                    borderLeftColor: selectedRangeBackgroundColor,
                    borderRightColor: selectedRangeBackgroundColor,
                    borderStyle: "solid",
                },
                content: {
                    color: "#FFFFFF",
                    fontWeight: isMiddleDate ? "400" : "600",
                },
            };
        },
    }
}