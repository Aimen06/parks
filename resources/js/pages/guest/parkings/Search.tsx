import React from 'react';
import GuestLayout from '@/layouts/guest/GuestLayout';
import SearchSection from '@/components/guest/parking/SearchSection';

const HomeGuest: React.FC = () => {
    return (
        <GuestLayout>
            <SearchSection />
        </GuestLayout>
    );
};

export default HomeGuest;
