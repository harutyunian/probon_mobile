import type { ComponentType, ReactNode } from 'react';

type AnyProviderArrayConfig = [ComponentType<any>, any?];
type initialComponentType =  ComponentType<{ children: ReactNode }>;

const buildProvidersTree = (
    providerConfigs: AnyProviderArrayConfig[]
): initialComponentType => {

    const initialComponent:initialComponentType = ({ children }) => <>{children}</>;

    return providerConfigs.reduceRight(
        (AccumulatedComponent, [Provider, props]) => {
            return ({ children }) => (
                <AccumulatedComponent>
                    <Provider {...(props ? { ...props, children: children } : { children: children })} />
                </AccumulatedComponent>
            );
        },
        initialComponent
    );
};

export default buildProvidersTree;