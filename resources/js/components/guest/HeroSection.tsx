import React, { useEffect, useRef } from 'react';
import hero from '../../../assets/videos/hero-video.mp4';


const HeroSection: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (video) {
            video.playbackRate = 1;
        }
    }, []);

    return (
        <section className="w-full h-screen relative overflow-hidden">
            {/* Vidéo en arrière-plan */}
            <video
                ref={videoRef}
                autoPlay
                muted
                loop
                playsInline
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
            >
                <source src={hero} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

            {/* Contenu */}
            <div className="relative z-20 flex flex-col justify-center items-center h-full text-white text-center px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 font-title">Parks</h1>
                <p className="text-lg mb-8 font-medium">Votre nouvelle manière de réserver une place de parking</p>
                <button className="relative inline-block px-4 py-2 font-medium group cursor-pointer">
                    <span className="absolute inset-0 w-full h-full transition duration-200 ease-out transform translate-x-1 translate-y-1 bg-[#E72162] group-hover:-translate-x-0 group-hover:-translate-y-0"></span>
                    <span className="absolute inset-0 w-full h-full bg-white border-2 border-black group-hover:bg-black transition-colors duration-300"></span>
                    <span className="relative text-black group-hover:text-white font-medium">Trouver ma place de parking</span>
                </button>
            </div>
        </section>
    );
};

export default HeroSection;
