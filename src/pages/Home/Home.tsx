import {Text, View} from 'react-native';
import {Button} from 'react-native-paper'
import i18n, {t} from "../../i18n";
import React, {useState} from "react";
import Icon from "../../components/Icon/Icon";



export function Home() {
    const [locale, setLocale] = useState(i18n.locale);

    const changeLocale = (newLocale: string) => {
        i18n.locale = newLocale;
        setLocale(newLocale);
    };

    return <View>
        <Text>{t('welcome')} Home page {locale}</Text>
        <Icon name={'star'} size={16} />;
        <Button mode="contained" onPress={() => changeLocale('es')}>Spanish </Button>
        <Button mode="contained" onPress={() => changeLocale('en')}>English </Button>
    </View>
}