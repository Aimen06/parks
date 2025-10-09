import React from 'react';
import GuestLayout from '@/layouts/guest/GuestLayout';
import AboutSection from '@/components/guest/AboutSection';

const  About: React.FC = () => {
    return (
        <GuestLayout>
            <AboutSection />
        </GuestLayout>
    );
};

export default About;
