import React from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import RentSection from '@/components/guest/RentSection';

const HomeGuest: React.FC = () => {
    return (
        <GuestLayout>
            <RentSection />
        </GuestLayout>
    );
};

export default HomeGuest;
