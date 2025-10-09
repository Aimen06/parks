import React from 'react';
import facebook from '../../../assets/images/facebook-logo.svg';
import instagram from '../../../assets/images/instagram-logo.svg';
import x from '../../../assets/images/x-logo.svg';
import { Link } from '@inertiajs/react';



const Footer: React.FC = () => {
    return (
        <footer className="flex bg-[#E72162] justify-between items-center
               text-white p-4 font-medium">
            <div className="mb-4 flex space-x-4">
                <div className="h-[20px]">
                    <img className="h-full" src={ facebook } alt="Logo" />
                </div>
                <div className="h-[20px]">
                    <img className="h-full" src={ x } alt="Logo" />
                </div>
                <div className="h-[20px]">
                    <img className="h-full" src={ instagram } alt="Logo" />
                </div>
            </div>
                <nav className="flex justify-between gap-y-2">
                    <ul className="flex space-x-4 text-sm  flex-wrap items-center">
                        <li><Link href="/confidentiality">Confidentialité</Link></li>
                        <li><Link href="/sitemap">Plan du site</Link></li>
                        <li><Link href="/terms">CGU</Link></li>
                        <li><Link href="/about">Info sur l'entreprise</Link></li>
                    </ul>
                </nav>
            <p className="text-center text-xs mt-4">&copy; {new Date().getFullYear()} Park&Chill, Inc.</p>
        </footer>
    );
};

export default Footer;
