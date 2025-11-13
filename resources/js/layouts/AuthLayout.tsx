import { AppSidebar, SidebarProvider, SidebarToggle } from '@/components/sidebar';
import { type SharedData } from '@/types';
import { usePage } from '@inertiajs/react';
import { type PropsWithChildren } from 'react';
import logoParks from '../../assets/images/logo-parks.png';
// === AJOUT DE L'IMPORT ===
import Footer from '@/components/guest/Footer';
// === FIN DE L'AJOUT ===

interface AuthLayoutProps extends PropsWithChildren {
    title?: string;
}

export default function AuthLayout({
                                       children,
                                       title,
                                   }: AuthLayoutProps) {
    const { auth } = usePage<SharedData>().props;

    return (
        <SidebarProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
                {/* Sidebar component - handles both mobile drawer and desktop sidebar */}
                <AppSidebar />

                {/* Top header - Full width fixed */}
                <header className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
                    <div className="flex items-center justify-between px-4 py-3 md:px-6">
                        {/* Left side - Logo and menu toggle */}
                        <div className="flex items-center gap-4">
                            {/* Mobile menu toggle button */}
                            <SidebarToggle />

                            {/* Logo Parks */}
                            <div className="flex items-center gap-2">
                                <img
                                    src={logoParks}
                                    alt="Parks Logo"
                                    className="h-14 w-auto md:h-16"
                                />
                            </div>
                        </div>

                        {/* Right side - User info */}
                        <div className="flex items-center gap-3">
                            <div className="hidden text-right md:block">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                    {auth.user.firstname} {auth.user.lastname}
                                </div>
                            </div>
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-500 text-sm font-semibold text-white">
                                {auth.user.firstname?.charAt(0).toUpperCase()}{auth.user.lastname?.charAt(0).toUpperCase()}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Main content area - offset by sidebar width on desktop and header height */}
                <div className="flex min-h-screen flex-col pt-[73px] md:ml-64">
                    {/* Page content */}
                    <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
                        <div className="p-6">{children}</div>
                    </main>
                    <Footer />
                </div>
            </div>

        </SidebarProvider>
    );
}
