import React from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import SearchSection from '@/components/guest/parking/SearchSection';

const HomeGuest: React.FC = () => {
    return (
        <GuestLayout>
            <SearchSection />
        </GuestLayout>
    );
};

export default HomeGuest;
