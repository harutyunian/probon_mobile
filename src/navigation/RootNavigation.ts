
import { createNavigationContainerRef } from '@react-navigation/native';

export const navigationRef = createNavigationContainerRef();

export function navigate(name: string, params?: any) {
    if (navigationRef.isReady()) {
        // todo: petqa  veranayel es ktore
        //@ts-ignore
        navigationRef.navigate(name, params);
    }
}
