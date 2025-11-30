import {t} from "../i18n";


export const MAIN_ROUTES = {
    PUBLIC: {
        WISHLIST:{
            NAME: t('routes.public.wishlist'),
            KEY: "wishlist"
        },
        REQUESTS:{
            NAME: t('routes.public.requests'),
            KEY: "requests"
        },
        HOME: {
            NAME: t('routes.public.home'),
            KEY: 'home',
        },
        PROFILE: {
            NAME:  t('routes.public.profile'),
            KEY: 'profile',
        },

        DETAILS: {
            NAME:  t('routes.public.details'),
            KEY: 'details',
        }
    },
    PRIVATE: {

    }
}