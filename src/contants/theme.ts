import {MD3LightTheme as DefaultTheme} from 'react-native-paper';

export const paperTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: '#5E4DED',
        textSecondary: "#74717A"
    },
    components: {
        TextInput: {
            contentStyle:{
              borderRadius: 16,
            },
            style:{
                borderRadius: 16,
            },
            outlineStyle:{
                borderRadius: 16,
            }
        }
    }
};