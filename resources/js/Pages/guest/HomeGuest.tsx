import React from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import HeroSection from '@/components/guest/HeroSection';

const HomeGuest: React.FC = () => {
    return (
        <GuestLayout>
            <HeroSection />
        </GuestLayout>
    );
};

export default HomeGuest;
