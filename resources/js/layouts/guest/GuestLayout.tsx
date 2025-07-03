import React, { ReactNode } from 'react';
import Header from '../../components/guest/Header';
import Footer from '../../components/guest/Footer';

interface GuestLayoutProps {
    children: ReactNode;
}

const GuestLayout: React.FC<GuestLayoutProps> = ({ children }) => {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
};

export default GuestLayout;
