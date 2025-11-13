import React from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import AuthLayout from '@/layouts/AuthLayout';
import SearchSection from '@/components/guest/parking/SearchSection';

import { SharedData } from '@/types';


const SearchPage: React.FC = () => {
    return (
        <SearchSection />
    );
};


SearchPage.layout = (page: React.ReactElement) => {
    // 'page.props' contient les props de la page
    const { auth } = page.props as SharedData;

    if (auth.user) {
        return <AuthLayout title="Rechercher un parking">{page}</AuthLayout>;
    }

    return <GuestLayout>{page}</GuestLayout>;
};

export default SearchPage;
