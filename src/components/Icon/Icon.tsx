import React, {useEffect, useState} from 'react';
import {SvgProps, SvgXml} from 'react-native-svg';

import clock from '../../../assets/icons/clock.svg';
import phone from '../../../assets/icons/phone.svg';
import tag from '../../../assets/icons/tag.svg';
import sun from '../../../assets/icons/sun.svg';
import coin from '../../../assets/icons/coin.svg';
import fire from '../../../assets/icons/fire.svg';
import star from '../../../assets/icons/star.svg';
import tree from '../../../assets/icons/tree.svg';
import home from '../../../assets/icons/home.svg';
import heart from '../../../assets/icons/heart.svg';
import sprout from '../../../assets/icons/sprout.svg';
import profile from '../../../assets/icons/profile.svg';
import percent from '../../../assets/icons/percent.svg';
import priceTag from '../../../assets/icons/priceTag.svg';
import umbrella from '../../../assets/icons/umbrella.svg';
import snowflake from '../../../assets/icons/snowflake.svg';
import starFilled from '../../../assets/icons/starFilled.svg';
import locationIcon from '../../../assets/icons/locationIcon.svg';
import infinityIcon from '../../../assets/icons/infinityIcon.svg';
import closedUmbrella from '../../../assets/icons/closedUmbrella.svg';
import profileApproved from '../../../assets/icons/profileApproved.svg';


const iconMap = {
    tag,
    coin,
    sun,
    star,
    fire,
    home,
    tree,
    clock,
    heart,
    phone,
    sprout,
    profile,
    percent,
    umbrella,
    priceTag,
    snowflake,
    starFilled,
    locationIcon,
    closedUmbrella,
    profileApproved,
    infinity: infinityIcon
};

export type IconType = keyof typeof iconMap;

interface IconProps extends SvgProps {
    name?: IconType; // Use for local icons
    src?: string; // Use for remote SVG URL
    size?: number;
    svgXmlString?: string;
}

const Icon = ({svgXmlString, name, src, size = 24, ...props}: IconProps) => {
    const [remoteSvg, setRemoteSvg] = useState<string | null>(null);

    useEffect(() => {
        let isMounted = true;

        const fetchAndCleanSvg = async () => {
            try {
                if (!src) return;

                const res = await fetch(src);
                const rawSvg = await res.text();

                // Replace hardcoded fills with currentColor to allow color override
                const cleanedSvg = rawSvg.replaceAll(/fill=".*?"/g, 'fill="currentColor"');

                if (isMounted) {
                    setRemoteSvg(cleanedSvg);
                }
            } catch (err) {
                console.warn(`Failed to fetch remote SVG from ${src}:`, err);
                if (isMounted) {
                    setRemoteSvg(null);
                }
            }
        };

        fetchAndCleanSvg();

        return () => {
            isMounted = false;
        };
    }, [src]);

    if (src && remoteSvg) {
        return (
            <SvgXml
                xml={remoteSvg}
                width={size}
                height={size}
                {...props}
            />
        );
    }
    if (svgXmlString) {
        return <SvgXml xml={svgXmlString} width={size} height={size} {...props} />;
    }

    if (name && iconMap[name]) {
        const LocalIcon = iconMap[name];
        return <LocalIcon width={size} height={size} {...props} />;
    }

    return null;
};

export default Icon;