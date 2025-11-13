import React from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import AuthLayout from '@/layouts/AuthLayout';
import ResultSearch, { type PageProps } from '@/components/guest/parking/ResultSearch';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

const City: React.FC = () => {
    // Utiliser usePage() ICI dans le composant principal
    const { auth, searchedCity, parkings } = usePage<SharedData & PageProps>().props;

    const cityName = searchedCity || (parkings && parkings.data.length > 0 ? parkings.data[0].city : 'Ville inconnue');

    return (
        <ResultSearch />
    );
};

// Le layout doit recevoir les props nécessaires via page.props
City.layout = (page: React.ReactElement & { props: SharedData & PageProps }) => {
    const { auth, searchedCity, parkings } = page.props;

    const cityName = searchedCity || (parkings && parkings.data.length > 0 ? parkings.data[0].city : 'Ville inconnue');
    const title = `Parkings à ${cityName}`;

    if (auth.user) {
        return <AuthLayout title={title}>{page}</AuthLayout>;
    }

    return <GuestLayout>{page}</GuestLayout>;
};

export default City;
