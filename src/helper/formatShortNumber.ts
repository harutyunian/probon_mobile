export function formatShortNumberIntl(value: number, locale: string = 'en-US'): string {
    return new Intl.NumberFormat(locale, {
        notation: 'compact',
        compactDisplay: 'short',
        maximumFractionDigits: 2,
    }).format(value);
}
