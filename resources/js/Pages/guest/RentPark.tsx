import React from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import RentSection from '@/components/guest/RentSection';

const HomeGuest: React.FC = () => {
    return (
        <RentSection />
    );
};

HomeGuest.layout = (page: React.ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default HomeGuest;
