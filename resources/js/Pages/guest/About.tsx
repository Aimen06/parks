import React from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import AboutSection from '@/components/guest/AboutSection';

const  About: React.FC = () => {
    return (
        <AboutSection />
    );
};

About.layout = (page: React.ReactElement) => <GuestLayout>{page}</GuestLayout>;

export default About;
