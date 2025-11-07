import Footer from '@/components/guest/Footer';
import Header from '@/components/guest/Header';
import { type ReactNode } from 'react';

interface GuestLayoutProps {
    children: ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
    return (
        <div>
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}
