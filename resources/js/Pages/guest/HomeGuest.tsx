import React from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import HeroSection from '@/components/guest/HeroSection';

const HomeGuest: React.FC = () => {
    return (
        <HeroSection />
    );
};

// === AJOUTER CECI ===
HomeGuest.layout = (page: React.ReactElement) => <GuestLayout>{page}</GuestLayout>;
// ====================

export default HomeGuest;
