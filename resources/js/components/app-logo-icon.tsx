import React, { ImgHTMLAttributes } from 'react';
import logo from '../../assets/images/logo-parks.png';

export default function AppLogoIcon(props: ImgHTMLAttributes<HTMLImageElement>) {
    return (
        <img
            src={logo}
            alt={props.alt ?? "Logo"}
            {...props}
        />
    );
}

