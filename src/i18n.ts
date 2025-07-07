import * as Localization from 'expo-localization';
import { I18n, Scope } from 'i18n-js';

import en from './translations/en.json';
import es from './translations/es.json';

// --- Recursive TypeScript Utility for Deep Keys ---
// This utility type will take a nested object and create a union of all possible
// dot-notation paths to its properties.
type DeepKeyOf<T> = T extends object
    ? {
        [K in keyof T]-?: K extends string
            ? `${K}` | `${K}.${DeepKeyOf<T[K]>}`
            : never;
    }[keyof T]
    : '';

// --- i18n Setup ---
const i18n = new I18n();

i18n.translations = {
    en,
    es,
};

i18n.locale = Localization.getLocales()[0].languageCode || 'en';
i18n.defaultLocale = 'en';

// Use our new utility to create a type with all nested keys
export type TranslationKey = DeepKeyOf<typeof en>;

/**
 * Translates an i18n key.
 * @param key The i18n key.
 * @returns The translated string.
 */
export const t = (key: TranslationKey) => i18n.t(key as Scope);

export default i18n;
