
import 'react-native-paper';

declare module 'react-native-paper' {
    // This extends the MD3Colors interface
    // which is used by MD3 themes.
    interface MD3Colors {
        textSecondary: string;
    }
}