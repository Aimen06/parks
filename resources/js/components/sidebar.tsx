import { type SharedData } from '@/types';
import { Link, router, usePage } from '@inertiajs/react';
import {
    HiChartPie,
    HiCalendar,
    HiOfficeBuilding,
    HiDocumentText,
    HiCreditCard,
    HiCog,
    HiArrowSmRight,
    HiMenu,
    HiX,
} from 'react-icons/hi';
import { createContext, useContext, useState, type ReactNode } from 'react';

// Context pour gérer l'état du sidebar
const SidebarContext = createContext<{
    isOpen: boolean;
    toggleSidebar: () => void;
    closeSidebar: () => void;
} | null>(null);

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <SidebarContext.Provider
            value={{
                isOpen,
                toggleSidebar: () => setIsOpen(!isOpen),
                closeSidebar: () => setIsOpen(false),
            }}
        >
            {children}
        </SidebarContext.Provider>
    );
}

function useSidebar() {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within SidebarProvider');
    }
    return context;
}

export function SidebarToggle() {
    const { toggleSidebar } = useSidebar();

    return (
        <button
            onClick={toggleSidebar}
            className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-label="Open sidebar"
        >
            <HiMenu className="h-6 w-6" />
        </button>
    );
}

export function AppSidebar() {
    const page = usePage();
    const { auth } = usePage<SharedData>().props;
    const { isOpen, closeSidebar } = useSidebar();

    const handleLogout = () => {
        router.post('/logout');
    };

    const handleClose = () => closeSidebar();

    const navItems = [
        {
            href: '/dashboard',
            icon: HiChartPie,
            label: 'Dashboard',
            active: page.url === '/dashboard',
        },
        // === MODIFICATION ICI ===
        {
            href: '/search', // Corrigé (pointe vers la page de recherche)
            icon: HiCalendar,
            label: 'Réserver un parking',
            active: page.url.startsWith('/search'), // Corrigé
        },
        // === FIN DE LA MODIFICATION ===
        {
            href: '/parkings',
            icon: HiOfficeBuilding,
            label: 'Gérer mes parkings',
            active: page.url.startsWith('/parkings'), // Modifié pour être plus simple
        },
        {
            href: '/invoices',
            icon: HiDocumentText,
            label: 'Mes factures',
            active: page.url.startsWith('/invoices'),
        },
        {
            href: '/payment-methods',
            icon: HiCreditCard,
            label: 'Mes Moyens de paiement',
            active: page.url.startsWith('/payment-methods'),
        },
    ];

    const settingsItems = [
        {
            href: '/settings',
            icon: HiCog,
            label: 'Paramètres du compte',
            active: page.url.startsWith('/settings'),
        },
    ];

    const SidebarContent = () => (
        <div className="flex h-full flex-col overflow-y-auto bg-white px-3 py-4 dark:bg-gray-800">
            {/* Navigation items */}
            <ul className="space-y-2">
                {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={handleClose}
                                className={`flex items-center rounded-lg p-2 text-base font-normal transition-colors ${
                                    item.active
                                        ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                                        : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                                }`}
                            >
                                <Icon className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                <span className="ml-3">{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>

            {/* Settings section */}
            <ul className="mt-4 space-y-2 border-t border-gray-200 pt-4 dark:border-gray-700">
                {settingsItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                onClick={handleClose}
                                className={`flex items-center rounded-lg p-2 text-base font-normal transition-colors ${
                                    item.active
                                        ? 'bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-white'
                                        : 'text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700'
                                }`}
                            >
                                <Icon className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                <span className="ml-3">{item.label}</span>
                            </Link>
                        </li>
                    );
                })}
                <li>
                    <button
                        onClick={handleLogout}
                        className="flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition-colors hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700"
                    >
                        <HiArrowSmRight className="h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                        <span className="ml-3">Déconnexion</span>
                    </button>
                </li>
            </ul>

            {/* User info at bottom */}
            <div className="mt-auto">
                <div className="mt-4 flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-purple-600 to-blue-500 text-sm font-semibold text-white">
                        {auth.user.firstname?.charAt(0).toUpperCase()}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <div className="truncate text-sm font-medium text-gray-900 dark:text-white">
                            {auth.user.firstname} {auth.user.lastname}
                        </div>
                        <div className="truncate text-xs text-gray-500 dark:text-gray-400">
                            {auth.user.email}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            {/* Desktop sidebar - fixed positioning below header */}
            <aside className="fixed left-0 top-[89px] z-40 hidden h-[calc(100vh-89px)] w-64 border-r border-gray-200 md:block dark:border-gray-700">
                <SidebarContent />
            </aside>

            {/* Mobile drawer overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 md:hidden"
                    onClick={handleClose}
                />
            )}

            {/* Mobile drawer */}
            <div
                className={`fixed left-0 top-0 z-50 h-screen w-64 transform overflow-y-auto bg-white transition-transform duration-300 ease-in-out md:hidden dark:bg-gray-800 ${
                    isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}
            >
                <div className="mb-4 flex items-center justify-between border-b border-gray-200 p-4 dark:border-gray-700">
                    <h5 className="text-lg font-semibold text-gray-900 dark:text-white">Menu</h5>
                    <button
                        onClick={handleClose}
                        className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
                    >
                        <HiX className="h-5 w-5" />
                    </button>
                </div>
                <SidebarContent />
            </div>
        </>
    );
}
